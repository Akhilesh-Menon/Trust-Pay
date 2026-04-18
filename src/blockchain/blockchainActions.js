import { getContract } from "./contract.js";
import { ethers } from "ethers";

export const depositToEscrow = async (contractAddress, freelancerWallet, amountInEth) => {
  try {
    const contract = await getContract(contractAddress);
    
    if (!freelancerWallet || !ethers.isAddress(freelancerWallet)) {
      throw new Error("Invalid freelancer wallet address");
    }

    if (amountInEth <= 0) {
      throw new Error("Amount must be greater than 0");
    }

    const amountInWei = ethers.parseEther(amountInEth.toString());
    
    const tx = await contract.deposit(freelancerWallet, {
      value: amountInWei,
      gasLimit: 300000,
    });

    const receipt = await tx.wait();
    
    return {
      success: true,
      hash: tx.hash,
      receipt,
      message: `✓ Payment locked! Tx: ${tx.hash.slice(0, 10)}...`,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || "Deposit failed",
    };
  }
};

export const releaseFromEscrow = async (contractAddress, freelancerWallet) => {
  try {
    const contract = await getContract(contractAddress);
    
    if (!freelancerWallet || !ethers.isAddress(freelancerWallet)) {
      throw new Error("Invalid freelancer wallet address");
    }

    const tx = await contract.release(freelancerWallet, {
      gasLimit: 300000,
    });

    const receipt = await tx.wait();
    
    return {
      success: true,
      hash: tx.hash,
      receipt,
      message: `✓ Payment released! Tx: ${tx.hash.slice(0, 10)}...`,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || "Release failed",
    };
  }
};

export const getEscrowBalance = async (contractAddress, freelancerWallet) => {
  try {
    const contract = await getContract(contractAddress);
    
    if (!freelancerWallet || !ethers.isAddress(freelancerWallet)) {
      throw new Error("Invalid freelancer wallet address");
    }

    const balance = await contract.getBalance(freelancerWallet);
    const balanceInEth = ethers.formatEther(balance);
    
    return {
      success: true,
      balance: balanceInEth,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || "Failed to get balance",
    };
  }
};
