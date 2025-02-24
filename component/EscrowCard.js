import React from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EscrowCard({ escrow }) {
    const router = useRouter();

    return (
        <Card className="shadow-lg hover:shadow-xl transition duration-300 ease-in-out border border-gray-300">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Escrow Transaction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-2">
                <p><strong className="text-gray-900">Buyer:</strong> {escrow.buyer}</p>
                <p><strong className="text-gray-900">Seller:</strong> {escrow.seller}</p>
                <p><strong className="text-gray-900">Amount:</strong> {ethers.utils.formatEther(escrow.amount)} ETH</p>
                <p><strong className="text-gray-900">Status:</strong> <span className={escrow.isReleased ? "text-green-500" : "text-yellow-500"}>{escrow.isReleased ? "Released" : "Pending"}</span></p>
                <button 
                    className="mt-4 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all"
                    onClick={() => router.push(`/escrow/${escrow.id}`)}
                >
                    View Details
                </button>
            </CardContent>
        </Card>
    );
}