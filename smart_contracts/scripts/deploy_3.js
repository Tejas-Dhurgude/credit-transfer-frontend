const main = async () => {
    const FileHashFactory= await hre.ethers.getContractFactory("FileHash");
    const FileHashContract = await FileHashFactory.deploy();
  
    await FileHashContract .deployed();
  
    console.log("Transactions address: ", FileHashContract .address);
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