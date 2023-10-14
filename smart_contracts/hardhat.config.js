// https://eth-sepolia.g.alchemy.com/v2/RliDHWbgSVuoiE_3SIigPFH4KE4b8SGN

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.9",
  networks :{
    sepolia:{
      url: 'https://eth-sepolia.g.alchemy.com/v2/RliDHWbgSVuoiE_3SIigPFH4KE4b8SGN',
      accounts: ['fb73b019d829c6573354ce61aaf0244b9a677115d148a5692adf90241fa0ea61']

    }

  }
};