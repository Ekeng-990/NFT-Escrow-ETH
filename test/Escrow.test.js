const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Escrow Contract", function () {
    let Escrow, escrow, EscrowFactory, escrowFactory;
    let owner, buyer, seller, arbiter;
    const depositAmount = ethers.utils.parseEther("1");

    beforeEach(async function () {
        [owner, buyer, seller, arbiter] = await ethers.getSigners();
        
        EscrowFactory = await ethers.getContractFactory("EscrowFactory");
        escrowFactory = await EscrowFactory.deploy();
        await escrowFactory.deployed();

        const tx = await escrowFactory.connect(buyer).createEscrow(seller.address, arbiter.address, { value: depositAmount });
        const receipt = await tx.wait();
        const escrowAddress = receipt.events[0].args.escrowAddress;
        
        Escrow = await ethers.getContractFactory("Escrow");
        escrow = await Escrow.attach(escrowAddress);
    });

    it("Should initialize with correct values", async function () {
        expect(await escrow.buyer()).to.equal(buyer.address);
        expect(await escrow.seller()).to.equal(seller.address);
        expect(await escrow.arbiter()).to.equal(arbiter.address);
        expect(await escrow.amount()).to.equal(depositAmount);
        expect(await escrow.isReleased()).to.equal(false);
    });

    it("Should allow buyer or arbiter to release funds", async function () {
        await escrow.connect(buyer).releaseFunds();
        expect(await escrow.isReleased()).to.equal(true);
    });

    it("Should allow seller or arbiter to refund buyer", async function () {
        await escrow.connect(seller).refundBuyer();
        expect(await escrow.isReleased()).to.equal(true);
    });

    it("Should prevent double release or refund", async function () {
        await escrow.connect(buyer).releaseFunds();
        await expect(escrow.connect(seller).refundBuyer()).to.be.revertedWith("Funds already released");
    });
});
