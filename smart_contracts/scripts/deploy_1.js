const main = async () => {
  const insituteAndStudentFactory = await hre.ethers.getContractFactory("InstituteandStudent");
  const institueAndStudentContract = await insituteAndStudentFactory.deploy();

  await institueAndStudentContract.deployed();

  console.log("Transactions address: ", institueAndStudentContract.address);
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