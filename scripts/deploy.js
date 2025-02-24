const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const EscrowFactory = await ethers.getContractFactory("EscrowFactory");
    const escrowFactory = await EscrowFactory.deploy();

    await escrowFactory.deployed();
    console.log("EscrowFactory deployed to:", escrowFactory.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
