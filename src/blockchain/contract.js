import { ethers } from "ethers";
import abi from "./TrustPayABI.json";

export const getContract = async (contractAddress) => {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }

  if (!contractAddress || contractAddress === "") {
    throw new Error("Contract address not configured. Please add CONTRACT_ADDRESS to App.jsx");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    contractAddress,
    abi,
    signer
  );

  return contract;
};

export const getProvider = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }
  return new ethers.BrowserProvider(window.ethereum);
};

export { abi as TrustPayABI };