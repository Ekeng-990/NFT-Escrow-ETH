import { ethers } from "ethers";
import EscrowABI from "../artifacts/contracts/Escrow.sol/Escrow.json";

const getContract = (contractAddress) => {
    if (!window.ethereum) throw new Error("MetaMask is not installed");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, EscrowABI.abi, signer);
};

export const releaseFunds = async (contractAddress) => {
    try {
        const contract = getContract(contractAddress);
        const tx = await contract.releaseFunds();
        await tx.wait();
        return { success: true, message: "Funds released successfully." };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const refundBuyer = async (contractAddress) => {
    try {
        const contract = getContract(contractAddress);
        const tx = await contract.refundBuyer();
        await tx.wait();
        return { success: true, message: "Buyer refunded successfully." };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const getEscrowDetails = async (contractAddress) => {
    try {
        const contract = getContract(contractAddress);
        const buyer = await contract.buyer();
        const seller = await contract.seller();
        const amount = await contract.amount();
        const isReleased = await contract.isReleased();
        
        return {
            buyer,
            seller,
            amount: ethers.utils.formatEther(amount),
            isReleased,
        };
    } catch (error) {
        return { success: false, message: error.message };
    }
};
