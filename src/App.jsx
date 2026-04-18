import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { ethers } from "ethers";
import { auth, db } from "./firebase";
import {
  WalletButton,
  LockPaymentButton,
  ReleasePaymentButton,
  StatusAlert,
  WalletCard,
  AmountCard,
  StatusBadge,
  TransactionLink,
} from "./components/BlockchainUI";
import { depositToEscrow, releaseFromEscrow, getEscrowBalance } from "./blockchain/blockchainActions";

export default function TrustPayApp() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [clientWallet, setClientWallet] = useState("");
  const [freelancerWallet, setFreelancerWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Pending");

  const [workLink, setWorkLink] = useState("");

  // MetaMask & Blockchain States
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isLoadingWallet, setIsLoadingWallet] = useState(false);
  const [isLoadingTx, setIsLoadingTx] = useState(false);
  const [txMessage, setTxMessage] = useState("");
  const [txHash, setTxHash] = useState("");
  const [escrowBalance, setEscrowBalance] = useState("0");

  // Smart Contract Config (Update after deployment)
  const CONTRACT_ADDRESS = ""; // Paste contract address from Remix
  const CONTRACT_ABI = []; // Paste ABI array from Remix

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setPage("role");
  }, []);

  // Connect MetaMask Wallet
  const connectWallet = async () => {
    setIsLoadingWallet(true);
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        alert("MetaMask not installed. Please install it first!");
        setIsLoadingWallet(false);
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const userAddress = accounts[0];
      setWalletAddress(userAddress);

      // Create provider and signer for blockchain calls
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethProvider);

      const ethSigner = await ethProvider.getSigner();
      setSigner(ethSigner);

      setTxMessage(`✓ Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`);
      setTimeout(() => setTxMessage(""), 3000);
    } catch (err) {
      alert("Failed to connect wallet: " + err.message);
    } finally {
      setIsLoadingWallet(false);
    }
  };

  // Lock Payment - Deposit to Escrow
  const lockPayment = async () => {
    if (!walletAddress) {
      setTxMessage("⚠️ Please connect MetaMask first!");
      return;
    }

    if (!freelancerWallet || !amount) {
      setTxMessage("⚠️ Please enter freelancer wallet and amount!");
      return;
    }

    if (!CONTRACT_ADDRESS) {
      setTxMessage("⚠️ Contract address not configured!");
      return;
    }

    setIsLoadingTx(true);
    setTxMessage("");

    try {
      const result = await depositToEscrow(CONTRACT_ADDRESS, freelancerWallet, amount);

      if (result.success) {
        setTxMessage(result.message);
        setTxHash(result.hash);
        setStatus("Escrow Created");
        setAmount("");
        
        // Check balance
        const balanceResult = await getEscrowBalance(CONTRACT_ADDRESS, freelancerWallet);
        if (balanceResult.success) {
          setEscrowBalance(balanceResult.balance);
        }
      } else {
        setTxMessage(`❌ Error: ${result.error}`);
      }
    } catch (err) {
      setTxMessage(`❌ Transaction failed: ${err.message}`);
    } finally {
      setIsLoadingTx(false);
    }
  };

  // Release Payment - Release from Escrow
  const releasePayment = async () => {
    if (!walletAddress) {
      setTxMessage("⚠️ Please connect MetaMask first!");
      return;
    }

    if (!freelancerWallet) {
      setTxMessage("⚠️ Please enter freelancer wallet address!");
      return;
    }

    if (!CONTRACT_ADDRESS) {
      setTxMessage("⚠️ Contract address not configured!");
      return;
    }

    setIsLoadingTx(true);
    setTxMessage("");

    try {
      const result = await releaseFromEscrow(CONTRACT_ADDRESS, freelancerWallet);

      if (result.success) {
        setTxMessage(result.message);
        setTxHash(result.hash);
        setStatus("Payment Released");
        setEscrowBalance("0");
      } else {
        setTxMessage(`❌ Error: ${result.error}`);
      }
    } catch (err) {
      setTxMessage(`❌ Transaction failed: ${err.message}`);
    } finally {
      setIsLoadingTx(false);
    }
  };

  const Navbar = () => (
    <nav className="flex justify-between items-center px-10 py-4 border-b border-slate-800 bg-slate-950 flex-wrap gap-4">
      <h1 className="text-xl font-bold text-blue-500">TrustPay+</h1>
      <div className="flex gap-4 items-center flex-wrap">
        <button 
          onClick={() => setPage("client")}
          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-800 transition"
          title="Client Dashboard"
        >
          <span>🏠</span>
          <span className="hidden sm:inline">Dashboard</span>
        </button>
        <button 
          onClick={() => setPage("freelancer")}
          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-800 transition"
          title="Freelancer Dashboard"
        >
          <span>💼</span>
          <span className="hidden sm:inline">Freelancer</span>
        </button>
        
        {/* Connect Wallet Button with Icon */}
        <WalletButton 
          walletAddress={walletAddress} 
          onConnect={connectWallet}
          isLoading={isLoadingWallet}
        />

        <button
          onClick={() => {
            localStorage.removeItem("user");
            setPage("home");
            setRole("");
            setWalletAddress("");
            setTxHash("");
            setTxMessage("");
          }}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded transition text-white"
          title="Logout"
        >
          <span>🚪</span>
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email,
        role: "",
        walletAddress: "",
        walletConnected: false,
        trustScore: 100,
        createdAt: new Date(),
      });

      localStorage.setItem("user", JSON.stringify(user));
      setPage("role");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(userCredential.user));
      setPage("role");
    } catch (err) {
      alert(err.message);
    }
  };

  const saveRoleAndGo = async (selectedRole) => {
    const user = auth.currentUser;
    await updateDoc(doc(db, "users", user.uid), { role: selectedRole });
    setRole(selectedRole);
    setPage(selectedRole);
  };

  if (page === "home") {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <nav className="flex justify-between px-10 py-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-blue-500">TrustPay+</h1>
          <div className="flex gap-6">
            <button onClick={() => alert("Prevents scams using verification")}>Why TrustPay+</button>
            <button onClick={() => alert("Free demo")}>Pricing</button>
            <button onClick={() => setPage("login")} className="bg-blue-600 px-4 py-2 rounded">Login</button>
            <button onClick={() => setPage("signup")} className="bg-purple-600 px-4 py-2 rounded">Sign Up</button>
          </div>
        </nav>

        <div className="flex flex-col items-center justify-center h-[80vh] text-center px-6">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Trust Freelance Payments Again
          </h2>
          <p className="text-gray-400 max-w-2xl mb-6">
            Verify payment links and prevent scams with blockchain-backed escrow.
          </p>
          <button onClick={() => setPage("signup")} className="bg-blue-600 px-6 py-3 rounded-xl">Get Started</button>
        </div>
      </div>
    );
  }

  if (page === "login") {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white">
        <h2 className="text-3xl mb-6">Login</h2>
        <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="p-3 mb-3 bg-slate-800 rounded" />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="p-3 mb-3 bg-slate-800 rounded" />
        <button onClick={handleLogin} className="bg-blue-600 px-6 py-2 rounded">Login</button>
      </div>
    );
  }

  if (page === "signup") {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white">
        <h2 className="text-3xl mb-6">Sign Up</h2>
        <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="p-3 mb-3 bg-slate-800 rounded" />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="p-3 mb-3 bg-slate-800 rounded" />
        <button onClick={handleSignup} className="bg-purple-600 px-6 py-2 rounded">Create Account</button>
      </div>
    );
  }

  if (page === "role") {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white">
        <h2 className="text-3xl mb-6">Choose Role</h2>
        <div className="flex gap-6">
          <button onClick={()=>saveRoleAndGo("client")} className="bg-blue-600 px-6 py-3 rounded">Hiring</button>
          <button onClick={()=>saveRoleAndGo("freelancer")} className="bg-purple-600 px-6 py-3 rounded">Finding Work</button>
        </div>
      </div>
    );
  }

  if (page === "client") {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <div className="p-10 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Client Dashboard</h1>
            <p className="text-gray-400">Manage and lock payments in escrow</p>
          </div>

          {/* Transaction Status */}
          {txMessage && (
            <StatusAlert 
              status={txMessage}
              type={txMessage.includes("❌") ? "error" : txMessage.includes("⚠️") ? "warning" : "success"}
              onClose={() => setTxMessage("")}
            />
          )}

          {/* Transaction Link */}
          {txHash && (
            <TransactionLink 
              hash={txHash}
              message={`View Transaction: ${txHash.slice(0, 10)}...`}
            />
          )}

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <WalletCard walletAddress={walletAddress} label="Your Wallet" />
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 flex items-center gap-3">
              <span className="text-2xl flex-shrink-0">💼</span>
              <div>
                <p className="text-xs text-gray-400 uppercase">Freelancer</p>
                <p className="font-mono text-sm">{freelancerWallet || "Enter wallet..."}</p>
              </div>
            </div>
            <AmountCard amount={amount} label="Amount" />
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 flex items-center gap-3">
              <div className="flex-1">
                <p className="text-xs text-gray-400 uppercase">Status</p>
                <StatusBadge status={status} />
              </div>
            </div>
          </div>

          {/* Escrow Balance */}
          {escrowBalance !== "0" && (
            <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 rounded-lg border border-blue-700">
              <p className="text-sm text-blue-300 mb-2">Escrow Balance</p>
              <p className="text-3xl font-bold">{escrowBalance} ETH</p>
            </div>
          )}

          {/* Payment Form */}
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 space-y-4">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>💼</span>
              Payment Details
            </h2>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Freelancer Wallet Address (0x...)</label>
              <input
                placeholder="0x..."
                value={freelancerWallet}
                onChange={(e) => setFreelancerWallet(e.target.value)}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded focus:border-blue-500 focus:outline-none text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Amount (in ETH, e.g., 0.5)</label>
              <input
                placeholder="0.5"
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded focus:border-blue-500 focus:outline-none text-white"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <LockPaymentButton
                onClick={lockPayment}
                isLoading={isLoadingTx}
                disabled={!walletAddress || !freelancerWallet || !amount}
              />
              <ReleasePaymentButton
                onClick={releasePayment}
                isLoading={isLoadingTx}
                disabled={!walletAddress || !freelancerWallet}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (page === "freelancer") {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <div className="p-10 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Freelancer Dashboard</h1>
            <p className="text-gray-400">View your escrow payments and submit work</p>
          </div>

          {/* Transaction Status */}
          {txMessage && (
            <StatusAlert 
              status={txMessage}
              type={txMessage.includes("❌") ? "error" : txMessage.includes("⚠️") ? "warning" : "success"}
              onClose={() => setTxMessage("")}
            />
          )}

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <WalletCard walletAddress={walletAddress} label="Your Wallet" />
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 flex items-center gap-3">
              <div className="flex-1">
                <p className="text-xs text-gray-400 uppercase">Payment Status</p>
                <StatusBadge status={status} />
              </div>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 flex items-center gap-3">
              <div className="flex-1">
                <p className="text-xs text-gray-400 uppercase">Payout</p>
                <p className="font-semibold text-lg">
                  {status === "Payment Released" ? "✓ Done" : "⏳ Pending"}
                </p>
              </div>
            </div>
          </div>

          {/* Work Submission */}
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 space-y-4">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>💼</span>
              Submit Work
            </h2>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Work Link (URL, GitHub, Drive, etc.)</label>
              <input
                placeholder="https://..."
                value={workLink}
                onChange={(e) => setWorkLink(e.target.value)}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded focus:border-purple-500 focus:outline-none text-white mb-4"
              />
            </div>

            <button
              onClick={() => {
                if (workLink) {
                  setStatus("Work Submitted");
                  setTxMessage("✓ Work submitted successfully!");
                  setWorkLink("");
                  setTimeout(() => setTxMessage(""), 3000);
                } else {
                  setTxMessage("⚠️ Please enter a work link!");
                }
              }}
              className="bg-purple-600 hover:bg-purple-700 p-3 rounded w-full font-semibold flex items-center justify-center gap-2 transition"
            >
              <span>💼</span>
              <span>Submit Work</span>
            </button>
          </div>

          {/* Info Box */}
          {status === "Payment Released" && (
            <div className="bg-green-900 border border-green-700 p-6 rounded-lg">
              <p className="text-green-200">
                ✓ Payment has been released! Check your wallet for the funds.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
