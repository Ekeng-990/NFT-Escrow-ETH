import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";

export default function EscrowDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [escrow, setEscrow] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!id) return;
        fetchEscrowDetails();
    }, [id]);

    const fetchEscrowDetails = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask to use this feature.");
            return;
        }
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const escrowABI = [
                "function buyer() view returns (address)",
                "function seller() view returns (address)",
                "function arbiter() view returns (address)",
                "function amount() view returns (uint256)",
                "function isReleased() view returns (bool)",
                "function releaseFunds() external",
                "function refundBuyer() external"
            ];

            const contract = new ethers.Contract(id, escrowABI, provider);
            const buyer = await contract.buyer();
            const seller = await contract.seller();
            const arbiter = await contract.arbiter();
            const amount = await contract.amount();
            const isReleased = await contract.isReleased();

            setEscrow({ buyer, seller, arbiter, amount, isReleased });
        } catch (error) {
            console.error(error);
        }
    };

    const handleAction = async (action) => {
        if (!window.ethereum) {
            alert("Please install MetaMask to use this feature.");
            return;
        }
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(id, [
                "function releaseFunds() external",
                "function refundBuyer() external"
            ], signer);

            const tx = action === "release" ? await contract.releaseFunds() : await contract.refundBuyer();
            await tx.wait();
            setMessage("Transaction successful!");
            fetchEscrowDetails();
        } catch (error) {
            console.error(error);
            setMessage("Transaction failed.");
        }
    };

    if (!escrow) return <p>Loading...</p>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold">Escrow Details</h1>
            <p>Buyer: {escrow.buyer}</p>
            <p>Seller: {escrow.seller}</p>
            <p>Arbiter: {escrow.arbiter}</p>
            <p>Amount: {ethers.utils.formatEther(escrow.amount)} ETH</p>
            <p>Status: {escrow.isReleased ? "Released" : "Pending"}</p>

            {!escrow.isReleased && (
                <div className="mt-4 flex space-x-4">
                    <button 
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        onClick={() => handleAction("release")}
                    >
                        Release Funds
                    </button>
                    <button 
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        onClick={() => handleAction("refund")}
                    >
                        Refund Buyer
                    </button>
                </div>
            )}

            {message && <p className="mt-4 text-blue-500">{message}</p>}
        </div>
    );
}
