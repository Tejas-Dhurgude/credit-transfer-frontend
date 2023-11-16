// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract InstituteandStudent{

    struct Student{
        string name;
        string uid;
        string password;
        address walletAddress;
        string [] instituteCode;
        uint credits;
    }
    
    struct Institutes{
        string code;
        string name;
        string password;
        address walletAddress ;
        string [] studentUIDs;
    }
    
    struct TransferRequest{
        string studentUID;
        string instituteCode;
        string otherinstituteCode;
        uint credits;
        bool hasStudentApproved;
        bool hasCollegeApproved;
        bool hasNADApproved;
    }

    Institutes[] i;
    Student[] s;
    TransferRequest[] t;
    

    //---------------


    function addStudentCredit(string memory _uid, uint _credits) public {
        for (uint j = 0; j < s.length; j++) {
            if (keccak256(abi.encodePacked(s[j].uid)) == keccak256(abi.encodePacked(_uid))) {
                s[j].credits += _credits;
                return;
            }
        }
    }

    function getStudentCredit(string memory _uid) public view returns (uint) {
        for (uint j = 0; j < s.length; j++) {
            if (keccak256(abi.encodePacked(s[j].uid)) == keccak256(abi.encodePacked(_uid))) {
                return s[j].credits;
            }
        }
        return uint(0);
    }

    function getStudentInfo(string memory _uid) public view returns (string memory, string memory, address, string[] memory, uint ) {
        for (uint j = 0; j < s.length; j++) {
            if (keccak256(abi.encodePacked(s[j].uid)) == keccak256(abi.encodePacked(_uid))) {
                return (s[j].name, s[j].password, s[j].walletAddress, s[j].instituteCode, s[j].credits);
            }
        }
        return ("", "", address(0), new string[](0), 0);
    }

    

    //----------------



    function getAllInstitutes () public view returns(Institutes[] memory){
        return i;
    }


    function addUniversity(string memory _name, string memory _code,string memory _password) public {
        for(uint j=0; j<i.length; j++){
            require(keccak256(abi.encodePacked(i[j].code)) != keccak256(abi.encodePacked(_code)), "University already exists");
        }
        i.push(Institutes( _code, _name,_password, msg.sender, new string[](0)));
    }

    function addStudent (string memory _name, string memory _uid,string memory _password) public {
        for (uint j=0;j<s.length;j++){
            require(keccak256(abi.encodePacked(s[j].uid))!=keccak256(abi.encodePacked(_uid)), "Student already exists");
        }
        s.push(Student(_name, _uid,_password, msg.sender, new string[](0), 0));
    }

    function enrollStudent(string memory _uid, string memory _code) public{
        for(uint j=0; j<i.length; j++){
            if(keccak256(abi.encodePacked(i[j].code)) == keccak256(abi.encodePacked(_code))){
                i[j].studentUIDs.push(_uid);
            }
        }
        for(uint j=0; j<s.length; j++){
            if(keccak256(abi.encodePacked(s[j].uid)) == keccak256(abi.encodePacked(_uid))){
                s[j].instituteCode.push(_code);
            }
        }

    }

    function getUniversity(string memory _code) public view returns(string memory, string memory, address,string[] memory){
        for(uint j=0; j<i.length; j++){
            if(keccak256(abi.encodePacked(i[j].code)) == keccak256(abi.encodePacked(_code))){
                return (i[j].code, i[j].name, i[j].walletAddress,i[j].studentUIDs);
            }
        }
        return ("", "", address(0),new string[](0));
    }
    function getStudentsinUniversity( string memory _code) public view returns(Student[] memory){

        for(uint j=0; j<i.length; j++){
            if(keccak256(abi.encodePacked(i[j].code)) == keccak256(abi.encodePacked(_code))){
                Student[] memory students = new Student[](i[j].studentUIDs.length);
                for(uint k=0; k<i[j].studentUIDs.length; k++){
                    for(uint l=0; l<s.length; l++){
                        if(keccak256(abi.encodePacked(s[l].uid)) == keccak256(abi.encodePacked(i[j].studentUIDs[k]))){
                            students[k] = s[l];
                        }
                    }
                }
                return students;
            }
        }
        Student[] memory stu = new Student[](0);
        return stu;


    }

    function getUniversityinStudent(string memory _uid) public view returns(Institutes[] memory){
        for(uint j=0; j<s.length; j++){
            if(keccak256(abi.encodePacked(s[j].uid)) == keccak256(abi.encodePacked(_uid))){
                Institutes[] memory institutes = new Institutes[](s[j].instituteCode.length);
                for(uint k=0; k<s[j].instituteCode.length; k++){
                    for(uint l=0; l<i.length; l++){
                        if(keccak256(abi.encodePacked(i[l].code)) == keccak256(abi.encodePacked(s[j].instituteCode[k]))){
                            institutes[k] = i[l];
                        }
                    }
                }
                return institutes;
            }
        }
        Institutes[] memory inst = new Institutes[](0);
        return inst;
    }

   

    function loginStudent (string memory _uid, string memory _password) public view returns (string memory, string memory, address, string[] memory){
        for(uint j=0; j<s.length; j++){
            if(keccak256(abi.encodePacked(s[j].uid)) == keccak256(abi.encodePacked(_uid))){
                if(keccak256(abi.encodePacked(s[j].password)) == keccak256(abi.encodePacked(_password))){
                    return (s[j].name, s[j].uid, s[j].walletAddress, s[j].instituteCode);
                }
            }
        }
        return ("", "", address(0),new string[](0));
    }

    function loginUniversity (string memory _code, string memory _password) public view returns (string memory, string memory, address, string[] memory){
        for(uint j=0; j<i.length; j++){
            if(keccak256(abi.encodePacked(i[j].code)) == keccak256(abi.encodePacked(_code))){
                if(keccak256(abi.encodePacked(i[j].password)) == keccak256(abi.encodePacked(_password))){
                    return (i[j].code, i[j].name, i[j].walletAddress, i[j].studentUIDs);
                }
            }
        }
        return ("", "", address(0),new string[](0));
    }


      function getStudentAddress(string memory _studentUID) internal view returns (address) {
        for (uint256 j = 0; j < s.length; j++) {
            if (keccak256(abi.encodePacked(s[j].uid)) == keccak256(abi.encodePacked(_studentUID))) {
                return s[j].walletAddress;
            }
        }
        return address(0);
    }


    function sendTransferRequest(
        string memory _studentUID,
        string memory _instituteCode,
        string memory _otherinstituteCode,
        uint _credits
    ) public {
        t.push(
            TransferRequest({
                studentUID: _studentUID,
                instituteCode: _instituteCode,
                otherinstituteCode: _otherinstituteCode,
                credits: _credits,
                hasStudentApproved: true,
                hasCollegeApproved: false,
                hasNADApproved: false
            })
        );
    }


    function getStudentCredits(string memory _studentUID) public view returns (uint) {
        for (uint256 j = 0; j < s.length; j++) {
            if (keccak256(abi.encodePacked(s[j].uid)) == keccak256(abi.encodePacked(_studentUID))) {
                return s[j].credits;
            }
        }
        return uint(0);
    }


    function getInsituteApproval(string memory _studentUID, string memory _instituteCode) public {
        for (uint256 j = 0; j < t.length; j++) {
            if (
                keccak256(abi.encodePacked(t[j].studentUID)) == keccak256(abi.encodePacked(_studentUID)) &&
                keccak256(abi.encodePacked(t[j].instituteCode)) == keccak256(abi.encodePacked(_instituteCode))
            ) {
                t[j].hasCollegeApproved = true;
            }
        }

    }

    function getNADApproval(string memory _studentUID) public {
        for (uint256 j = 0; j < t.length; j++) {
            if (keccak256(abi.encodePacked(t[j].studentUID)) == keccak256(abi.encodePacked(_studentUID))) {
                t[j].hasNADApproved = true;
            }
        }
    }


    function transferCredits(string memory _studentUID) public {
        for (uint256 j = 0; j < t.length; j++) {
            if (keccak256(abi.encodePacked(t[j].studentUID)) == keccak256(abi.encodePacked(_studentUID))) {
                if (t[j].hasCollegeApproved == true && t[j].hasNADApproved == true) {
                    for (uint256 k = 0; k < s.length; k++) {
                        if (keccak256(abi.encodePacked(s[k].uid)) == keccak256(abi.encodePacked(_studentUID))) {
                            s[k].credits -= t[j].credits;
                        }
                    }
                }
            }
        }
    }


    function getTransferReqeuests () public view returns(TransferRequest[] memory){
        return t;
    }

    function getRequestbyinstitueID (string memory _instituteCode) public view returns(TransferRequest[] memory){
        TransferRequest[] memory req = new TransferRequest[](t.length);
        uint count = 0;
        for(uint j=0; j<t.length; j++){
            if(keccak256(abi.encodePacked(t[j].instituteCode)) == keccak256(abi.encodePacked(_instituteCode))){
                req[count] = t[j];
                count++;
            }
        }
        return req;
    } 
  


   
    
}