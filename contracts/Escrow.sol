// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Escrow {
    address public buyer;
    address public seller;
    address public arbiter;
    uint256 public amount;
    bool public isReleased;

    constructor(address _buyer, address _seller, address _arbiter) payable {
        require(msg.value > 0, "Escrow must have funds");
        buyer = _buyer;
        seller = _seller;
        arbiter = _arbiter;
        amount = msg.value;
        isReleased = false;
    }

    modifier onlyInvolved() {
        require(msg.sender == buyer || msg.sender == seller || msg.sender == arbiter, "Not authorized");
        _;
    }

    function releaseFunds() external onlyInvolved {
        require(!isReleased, "Funds already released");
        require(msg.sender == buyer || msg.sender == arbiter, "Only buyer or arbiter can release funds");
        
        isReleased = true;
        payable(seller).transfer(amount);
    }

    function refundBuyer() external onlyInvolved {
        require(!isReleased, "Funds already released");
        require(msg.sender == seller || msg.sender == arbiter, "Only seller or arbiter can refund");
        
        isReleased = true;
        payable(buyer).transfer(amount);
    }
}
