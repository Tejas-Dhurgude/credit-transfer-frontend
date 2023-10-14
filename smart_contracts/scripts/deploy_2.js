const main = async () => {
    const StudentCreditSystemFactory = await hre.ethers.getContractFactory("StudentCreditSystem");
    const StudentCreditSystemContract = await StudentCreditSystemFactory.deploy();
  
    await StudentCreditSystemContract.deployed();
  
    console.log("Transactions address: ", StudentCreditSystemContract.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();