import { useState } from "react";

export default function TrustPayApp() {
  const [userRole, setUserRole] = useState("");
  const [page, setPage] = useState("dashboard");

  const [generatedLink, setGeneratedLink] = useState("");
  const [verifyInput, setVerifyInput] = useState("");
  const [verificationResult, setVerificationResult] = useState("");

  const [clientWallet, setClientWallet] = useState("");
  const [freelancerWallet, setFreelancerWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [workLink, setWorkLink] = useState("");

  const generatePaymentLink = () => {
    const randomId = Math.floor(Math.random() * 1000000);
    const link = `https://trustpay.app/pay/${randomId}`;
    setGeneratedLink(link);
    setPaymentStatus("Link Generated");
  };

  const verifyPaymentLink = () => {
    if (verifyInput === generatedLink && generatedLink !== "") {
      setVerificationResult("✅ Legit Payment");
    } else {
      setVerificationResult("❌ Scam Detected");
    }
  };

  const handleCreatePayment = () => {
    setPaymentStatus("Escrow Created");
    alert("Escrow payment created successfully!");
  };

  const handleSubmitWork = () => {
    setPaymentStatus("Work Submitted");
    alert("Work submitted successfully!");
  };

  const handleReleasePayment = () => {
    setPaymentStatus("Payment Released");
    alert("Funds released to freelancer wallet!");
  };

  // ROLE PAGE
  if (!userRole) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold text-blue-500 mb-4">
          TrustPay+
        </h1>
        <p className="text-gray-300 mb-8 text-lg">
          Choose your role to continue
        </p>

        <div className="flex gap-6">
          <button
            onClick={() => setUserRole("client")}
            className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-xl font-semibold"
          >
            I am Client
          </button>

          <button
            onClick={() => setUserRole("freelancer")}
            className="px-8 py-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-xl font-semibold"
          >
            I am Freelancer
          </button>
        </div>
      </div>
    );
  }

  // FREELANCER UI
  if (userRole === "freelancer") {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-10">
        <h1 className="text-4xl font-bold text-purple-500 mb-8">
          Freelancer Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-gray-400">My Wallet</p>
            <input
              type="text"
              placeholder="Enter Wallet Address"
              value={freelancerWallet}
              onChange={(e) => setFreelancerWallet(e.target.value)}
              className="w-full mt-2 p-2 rounded-xl bg-slate-800"
            />
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-gray-400">Payment Status</p>
            <p className="text-green-400 mt-2">{paymentStatus}</p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-gray-400">Verification</p>
            <p className="text-blue-400 mt-2">
              {verificationResult || "Pending"}
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-gray-400">Payout</p>
            <p className="text-yellow-400 mt-2">
              {paymentStatus === "Payment Released"
                ? "Completed"
                : "Awaiting"}
            </p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Submit Work
          </h2>

          <input
            type="text"
            placeholder="Paste GitHub / Drive / Figma link"
            value={workLink}
            onChange={(e) => setWorkLink(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800 mb-4"
          />

          <button
            onClick={handleSubmitWork}
            className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-xl font-semibold"
          >
            Submit Work
          </button>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            How it Works
          </h2>
          <p className="text-gray-300 leading-8">
            1. Verify the client payment link.<br />
            2. Start the project after verification.<br />
            3. Submit your work proof link.<br />
            4. Client approves and releases funds.<br />
            5. Payment reaches your wallet securely.
          </p>
        </div>
      </div>
    );
  }

  // CLIENT UI
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="flex justify-between items-center px-10 py-6 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-blue-500">TrustPay+</h1>

        <div className="flex gap-4">
          <button
            onClick={() => setPage("dashboard")}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700"
          >
            Dashboard
          </button>

          <button
            onClick={() => setPage("workflow")}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700"
          >
            Workflow
          </button>

          <button
            onClick={() => setPage("demo")}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700"
          >
            Live Demo
          </button>
        </div>
      </nav>

      <div className="p-10">
        {page === "dashboard" && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-10">
              <h2 className="text-4xl font-bold mb-4">
                Welcome to TrustPay+
              </h2>
              <p className="text-lg text-gray-100">
                Secure freelance payments with blockchain escrow protection.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-slate-900 rounded-2xl p-6">
                <p>Client Wallet</p>
                <input
                  type="text"
                  placeholder="Enter Wallet"
                  value={clientWallet}
                  onChange={(e) => setClientWallet(e.target.value)}
                  className="w-full mt-2 p-2 rounded-xl bg-slate-800"
                />
              </div>

              <div className="bg-slate-900 rounded-2xl p-6">
                <p>Freelancer Wallet</p>
                <input
                  type="text"
                  placeholder="Enter Wallet"
                  value={freelancerWallet}
                  onChange={(e) => setFreelancerWallet(e.target.value)}
                  className="w-full mt-2 p-2 rounded-xl bg-slate-800"
                />
              </div>

              <div className="bg-slate-900 rounded-2xl p-6">
                <p>Amount</p>
                <input
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full mt-2 p-2 rounded-xl bg-slate-800"
                />
              </div>

              <div className="bg-slate-900 rounded-2xl p-6">
                <p>Status</p>
                <p className="text-green-400 mt-2">
                  {paymentStatus}
                </p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">
                How it Works
              </h2>
              <p className="text-gray-300 leading-8">
                1. Add wallets and amount.<br />
                2. Create escrow payment.<br />
                3. Generate secure link.<br />
                4. Freelancer verifies and submits work.<br />
                5. Release funds securely.
              </p>
            </div>
          </div>
        )}

        {page === "workflow" && (
          <div className="bg-slate-900 rounded-3xl p-8 max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">
              Payment Workflow
            </h2>

            <button
              onClick={handleCreatePayment}
              className="w-full bg-blue-600 p-3 rounded-xl mb-4"
            >
              Create Escrow Payment
            </button>

            <button
              onClick={handleReleasePayment}
              className="w-full bg-red-600 p-3 rounded-xl"
            >
              Release Payment
            </button>
          </div>
        )}

        {page === "demo" && (
          <div className="bg-slate-900 rounded-3xl p-8 max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">
              Working Demo
            </h2>

            <button
              onClick={generatePaymentLink}
              className="w-full bg-green-600 p-3 rounded-xl mb-4"
            >
              Generate Payment Link
            </button>

            {generatedLink && (
              <p className="mb-4 text-blue-400 break-all">
                {generatedLink}
              </p>
            )}

            <input
              type="text"
              placeholder="Paste generated link"
              value={verifyInput}
              onChange={(e) => setVerifyInput(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-800 mb-4"
            />

            <button
              onClick={verifyPaymentLink}
              className="w-full bg-yellow-600 p-3 rounded-xl"
            >
              Verify Link
            </button>

            {verificationResult && (
              <p className="mt-4 font-bold">
                {verificationResult}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}