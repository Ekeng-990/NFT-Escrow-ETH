import React, { useState } from "react";
import { ethers } from "ethers";

export default function CreateEscrow() {
    const [seller, setSeller] = useState("");
    const [arbiter, setArbiter] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");

    const createEscrow = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask to use this feature.");
            return;
        }

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const escrowFactoryAddress = "YOUR_ESCROW_FACTORY_CONTRACT_ADDRESS";
            const escrowFactoryABI = [
                "function createEscrow(address _seller, address _arbiter) external payable"
            ];

            const contract = new ethers.Contract(escrowFactoryAddress, escrowFactoryABI, signer);
            const tx = await contract.createEscrow(seller, arbiter, { value: ethers.utils.parseEther(amount) });
            await tx.wait();
            setMessage("Escrow contract created successfully!");
        } catch (error) {
            console.error(error);
            setMessage("Error creating escrow contract.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold">Create a New Escrow</h1>
            <input 
                type="text" 
                placeholder="Seller Address" 
                value={seller} 
                onChange={(e) => setSeller(e.target.value)}
                className="mt-4 p-2 border rounded"
            />
            <input 
                type="text" 
                placeholder="Arbiter Address" 
                value={arbiter} 
                onChange={(e) => setArbiter(e.target.value)}
                className="mt-4 p-2 border rounded"
            />
            <input 
                type="text" 
                placeholder="Amount (ETH)" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                className="mt-4 p-2 border rounded"
            />
            <button 
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                onClick={createEscrow}
            >
                Create Escrow
            </button>
            {message && <p className="mt-4 text-blue-500">{message}</p>}
        </div>
    );
}