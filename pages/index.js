import React from "react";
import { useState } from "react";
import { ethers } from "ethers";

export default function Home() {
    const [walletAddress, setWalletAddress] = useState("");

    const connectWallet = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setWalletAddress(accounts[0]);
        } else {
            alert("Please install MetaMask to use this feature.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">Welcome to the NFT Escrow Marketplace</h1>
            <p className="mt-4 text-lg">Secure and transparent transactions with smart contracts.</p>
            
            {walletAddress ? (
                <p className="mt-4 text-green-500">Connected: {walletAddress}</p>
            ) : (
                <button 
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={connectWallet}
                >
                    Connect Wallet
                </button>
            )}
            
            <footer className="mt-10 text-gray-500">Created by Lucifer</footer>
        </div>
    );
}
