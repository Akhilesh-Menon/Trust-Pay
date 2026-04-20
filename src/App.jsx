// 🚀 TrustPay+ FINAL PROFESSIONAL UI (Frontend Only + Firebase Ready)

import { useState } from "react";

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

  // 🔥 Fake Auth (will connect Firebase later)
  const handleSignup = () => {
    alert("User registered (connect Firebase next)");
    setPage("role");
  };

  const handleLogin = () => {
    alert("Login success (connect Firebase next)");
    setPage("role");
  };

  // HOME PAGE
  if (page === "home") {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <nav className="flex justify-between px-10 py-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-blue-500">TrustPay+</h1>
          <div className="flex gap-6">
            <button onClick={() => alert("Why TrustPay+: Prevents scams using verification")}>Why TrustPay+</button>
            <button onClick={() => alert("Pricing: Free for hackathon demo")}>Pricing</button>
            <button onClick={() => setPage("login")} className="bg-blue-600 px-4 py-2 rounded">Login</button>
            <button onClick={() => setPage("signup")} className="bg-purple-600 px-4 py-2 rounded">Sign Up</button>
          </div>
        </nav>

        <div className="flex flex-col items-center justify-center h-[80vh] text-center">
          <h2 className="text-5xl font-bold mb-4">Secure Freelance Payments</h2>
          <p className="text-gray-400 max-w-xl">
            TrustPay+ eliminates scam payment links and ensures safe transactions using verification and escrow.
          </p>
        </div>
      </div>
    );
  }

  // LOGIN
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

  // SIGNUP
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

  // ROLE SELECT
  if (page === "role") {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white">
        <h2 className="text-3xl mb-6">Choose Role</h2>
        <div className="flex gap-6">
          <button onClick={() => {setRole("client"); setPage("client")}} className="bg-blue-600 px-6 py-3 rounded">Hiring</button>
          <button onClick={() => {setRole("freelancer"); setPage("freelancer")}} className="bg-purple-600 px-6 py-3 rounded">Finding Work</button>
        </div>
      </div>
    );
  }

  // CLIENT DASHBOARD
  if (page === "client") {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-10">
        <h1 className="text-4xl mb-6">Client Dashboard</h1>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <input placeholder="Client Wallet" value={clientWallet} onChange={(e)=>setClientWallet(e.target.value)} className="p-3 bg-slate-800 rounded" />
          <input placeholder="Freelancer Wallet" value={freelancerWallet} onChange={(e)=>setFreelancerWallet(e.target.value)} className="p-3 bg-slate-800 rounded" />
          <input placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value)} className="p-3 bg-slate-800 rounded" />
          <div className="p-3 bg-slate-800 rounded">Status: {status}</div>
        </div>

        <button onClick={()=>setStatus("Escrow Created")} className="bg-blue-600 p-3 rounded w-full mb-3">Create Escrow</button>
        <button onClick={()=>setStatus("Payment Released")} className="bg-green-600 p-3 rounded w-full">Release Payment</button>
      </div>
    );
  }

  // FREELANCER DASHBOARD
  if (page === "freelancer") {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-10">
        <h1 className="text-4xl mb-6">Freelancer Dashboard</h1>

        <input placeholder="Your Wallet" className="p-3 bg-slate-800 rounded mb-4" />

        <div className="p-4 bg-slate-900 rounded mb-4">Payment Status: {status}</div>

        <input placeholder="Submit Work Link" value={workLink} onChange={(e)=>setWorkLink(e.target.value)} className="p-3 bg-slate-800 rounded mb-4" />

        <button onClick={()=>setStatus("Work Submitted")} className="bg-purple-600 p-3 rounded w-full">Submit Work</button>
      </div>
    );
  }
}
