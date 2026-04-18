// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TrustPayEscrow {
    mapping(address => uint256) public escrowBalance;
    mapping(address => address) public freelancerClient;
    address public owner;

    event Deposited(address indexed client, address indexed freelancer, uint256 amount);
    event Released(address indexed client, address indexed freelancer, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    // Deposit funds into escrow for a freelancer
    function deposit(address freelancer) external payable {
        require(msg.value > 0, "Amount must be greater than 0");
        require(freelancer != address(0), "Invalid freelancer address");

        escrowBalance[freelancer] += msg.value;
        freelancerClient[freelancer] = msg.sender;

        emit Deposited(msg.sender, freelancer, msg.value);
    }

    // Release funds to freelancer
    function release(address freelancer) external {
        require(escrowBalance[freelancer] > 0, "No funds in escrow");
        require(freelancerClient[freelancer] == msg.sender, "Only client can release");

        uint256 amount = escrowBalance[freelancer];
        escrowBalance[freelancer] = 0;

        (bool success, ) = freelancer.call{value: amount}("");
        require(success, "Transfer failed");

        emit Released(msg.sender, freelancer, amount);
    }

    // Check escrow balance for a freelancer
    function getBalance(address freelancer) external view returns (uint256) {
        return escrowBalance[freelancer];
    }
}
