// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract FileHash {
    struct File{
        string uid;
        string code;
        string filehash;
    }

    File[] f;

    function addFile(string memory _uid, string memory _code, string memory _filehash) public {
        f.push(File(_uid, _code, _filehash));
    }
    function getFiles() public view returns(File[] memory){
        return f;
    }
}