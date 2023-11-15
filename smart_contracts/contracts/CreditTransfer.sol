// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract CreditTransfer {
    struct TransferDetails {
        address studentABCId;
        address collegeId;
        address foreignCollegeId;
        bool hasStudentApproved;
        bool hasCollegeApproved;
        bool hasNADApproved;
        uint presentCredit;
    }

    TransferDetails[] public transferRequests;  
    TransferDetails[] public successTransfers;

    function sendTransferRequest(
        address studentABCId,
        address collegeId,
        address foreignCollegeId,
        uint credit
    ) public {
        transferRequests.push(
            TransferDetails({
                studentABCId: studentABCId,
                collegeId: collegeId,
                foreignCollegeId: foreignCollegeId,
                hasStudentApproved: true,
                hasCollegeApproved: false,
                hasNADApproved: false,
                presentCredit: credit
            })
        );
    }

    function pushTransferRequest( address _studentABCId , address _collegeId, address _foreignCollegeId, uint _credits) public {

        transferRequests.push(
            TransferDetails({
                studentABCId: _studentABCId ,
                collegeId: _collegeId,
                foreignCollegeId: _foreignCollegeId,
                hasStudentApproved: true,
                hasCollegeApproved: false,
                hasNADApproved: false,
                presentCredit: _credits
            })
        );
    }

    function foreignCollegeApproval(address studentId,uint requiredCredit) public {
        for (uint i = 0; i < transferRequests.length; i++) {
            if (transferRequests[i].studentABCId == studentId) {
                if (transferRequests[i].presentCredit >= requiredCredit) {
                    transferRequests[i].hasCollegeApproved = true;
                } else {
                    revert("Insufficient Credits: College Approval");
                }
            }
        }
    }

    function NADApproval(address studentId) public {
        for (uint i = 0; i < transferRequests.length; i++) {
            if (transferRequests[i].studentABCId == studentId) {
                if (transferRequests[i].hasCollegeApproved) {
                    transferRequests[i].hasNADApproved = true;
                }
                else{
                    revert("Foreign College UNiversity approval is pending");
                }
            }
        }
    }

    function doCreditTransfer(address studentId, uint requiredCredit) public {
        for (uint i = 0; i < transferRequests.length; i++) {
            if (transferRequests[i].studentABCId == studentId) {
                if (transferRequests[i].hasCollegeApproved && transferRequests[i].hasNADApproved) {
                    if (transferRequests[i].presentCredit >= requiredCredit) {
                        // Transfer credits
                        transferRequests[i].presentCredit -= requiredCredit;

                        // Move successful transfer to successTransfers array
                        successTransfers.push(transferRequests[i]);

                        // Remove the transfer from transferRequests array
                        removeTransferAtIndex(i);
                    } else {
                        revert("Insufficient Credits: Credit Transfer");
                    }
                } else {
                    revert("Approval Pending");
                }
            }
        }
    }

    function removeTransferAtIndex(uint index) internal {
        
        transferRequests[index] = transferRequests[transferRequests.length - 1];
        transferRequests.pop(); 
    }
}
