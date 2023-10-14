// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract InstituteandStudent{

    struct Student{
        string name;
        string uid;
        string password;
        address walletAddress;
        string [] instituteCode;
    }
    
    struct Institutes{
        string code;
        string name;
        string password;
        address walletAddress ;
        string [] studentUIDs;
    }

    Institutes[] i;
    Student[] s;

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
        s.push(Student(_name, _uid,_password, msg.sender, new string[](0)));

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

  


   
    
}