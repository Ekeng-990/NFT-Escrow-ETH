import React from "react";
import Link from "next/link";
import { useState } from "react";
import { ethers } from "ethers";

export default function Navbar() {
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
        <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-lg">
            <div className="text-xl font-bold">
                <Link href="/">
                    <span className="cursor-pointer">NFT Escrow Marketplace</span>
                </Link>
            </div>
            <div className="space-x-6">
                <Link href="/create" className="hover:text-gray-400">Create Escrow</Link>
                <Link href="/escrow" className="hover:text-gray-400">My Escrows</Link>
            </div>
            <div>
                {walletAddress ? (
                    <span className="bg-gray-700 px-4 py-2 rounded-lg">{walletAddress.substring(0, 6)}...{walletAddress.slice(-4)}</span>
                ) : (
                    <button 
                        className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
                        onClick={connectWallet}
                    >
                        Connect Wallet
                    </button>
                )}
            </div>
        </nav>
    );
}