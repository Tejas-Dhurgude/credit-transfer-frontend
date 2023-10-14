// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

contract StudentCreditSystem {

    struct Transaction {
        address to;
        uint value;
        bool executed;
        address[] approvals;
    }

    mapping(uint => mapping(address => bool)) public isConfirmedByInstitute;
    Transaction[] public transactions;

    event TransactionSubmitted(uint transactionId, address sender, address receiver, uint amount);
    event TransactionConfirmed(uint transactionId, address approver);
    event TransactionExecuted(uint transactionId);

    constructor() {}

    function submitTransaction(address _to, address[] memory _institutes) public payable {
        require(_to != address(0), "Invalid Receiver's Address");
        require(msg.value > 0, "Transfer Amount Must Be Greater Than 0");
        require(_institutes.length >= 2, "At least 2 institutes are required");

        uint transactionId = transactions.length;
        transactions.push(Transaction({
            to: _to,
            value: msg.value,
            executed: false,
            approvals: new address[](0)
        }));

        for (uint i = 0; i < _institutes.length; i++) {
            require(_institutes[i] != address(0), "Invalid Institute Address");
            isConfirmedByInstitute[transactionId][_institutes[i]] = false;
        }

        emit TransactionSubmitted(transactionId, msg.sender, _to, msg.value);
    }

    function confirmTransaction(uint _transactionId) public {
        require(_transactionId < transactions.length, "Invalid Transaction Id");
        Transaction storage transaction = transactions[_transactionId];
        require(!isConfirmedByInstitute[_transactionId][msg.sender], "Transaction Is Already Confirmed By The Institute");
        isConfirmedByInstitute[_transactionId][msg.sender] = true;
        transaction.approvals.push(msg.sender);
        emit TransactionConfirmed(_transactionId, msg.sender);

        if (isTransactionConfirmed(_transactionId)) {
            executeTransaction(_transactionId);
        }
    }

    function executeTransaction(uint _transactionId) public payable {
        require(_transactionId < transactions.length, "Invalid Transaction Id");
        Transaction storage transaction = transactions[_transactionId];
        require(!transaction.executed, "Transaction is already executed");
        (bool success, ) = transaction.to.call{value: transaction.value}("");
        require(success, "Transaction Execution Failed");
        transaction.executed = true;
        emit TransactionExecuted(_transactionId);
    }

    function isTransactionConfirmed(uint _transactionId) internal view returns (bool) {
        require(_transactionId < transactions.length, "Invalid Transaction Id");

        Transaction storage transaction = transactions[_transactionId];
        uint confirmationCount = 0;

        for (uint i = 0; i < transaction.approvals.length; i++) {
            if (isConfirmedByInstitute[_transactionId][transaction.approvals[i]]) {
                confirmationCount++;
            }
        }

        return confirmationCount >= 2;
    }
}

// 0x5817012960d1cC95bcf3DCCf5c316B713bd85D10
//  0x98AA449a6b159A16Fd3A8a9E380D593D07BF2779