// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Escrow.sol";

contract EscrowFactory {
    Escrow[] public escrows;

    event EscrowCreated(address escrowAddress, address buyer, address seller, address arbiter, uint256 amount);

    function createEscrow(address _seller, address _arbiter) external payable {
        require(msg.value > 0, "Must send funds to create escrow");
        Escrow newEscrow = new Escrow{value: msg.value}(msg.sender, _seller, _arbiter);
        escrows.push(newEscrow);
        emit EscrowCreated(address(newEscrow), msg.sender, _seller, _arbiter, msg.value);
    }

    function getEscrows() external view returns (Escrow[] memory) {
        return escrows;
    }
}
