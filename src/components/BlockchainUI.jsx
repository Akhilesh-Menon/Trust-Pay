import React from "react";

// Wallet Connection Button
export const WalletButton = ({ walletAddress, onConnect, isLoading }) => {
  if (walletAddress) {
    return (
      <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition font-semibold">
        <span>✓</span>
        <span className="hidden sm:inline">
          {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </span>
        <span className="sm:hidden">
          {walletAddress.slice(0, 4)}...
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={onConnect}
      disabled={isLoading}
      className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-500 px-4 py-2 rounded-lg transition font-semibold text-white"
    >
      {isLoading ? (
        <>
          <span className="animate-spin">⚙️</span>
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <span>💳</span>
          <span>Connect Wallet</span>
        </>
      )}
    </button>
  );
};

// Lock Payment Button (Deposit)
export const LockPaymentButton = ({
  onClick,
  isLoading,
  disabled,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 px-6 py-3 rounded-lg transition font-semibold text-white w-full ${className}`}
    >
      {isLoading ? (
        <>
          <span className="animate-spin">⚙️</span>
          <span>Processing...</span>
        </>
      ) : (
        <>
          <span>🔒</span>
          <span>Lock Payment (Deposit to Escrow)</span>
        </>
      )}
    </button>
  );
};

// Release Payment Button
export const ReleasePaymentButton = ({
  onClick,
  isLoading,
  disabled,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 px-6 py-3 rounded-lg transition font-semibold text-white w-full ${className}`}
    >
      {isLoading ? (
        <>
          <span className="animate-spin">⚙️</span>
          <span>Processing...</span>
        </>
      ) : (
        <>
          <span>🔓</span>
          <span>Release Payment</span>
        </>
      )}
    </button>
  );
};

// Status Alert Component
export const StatusAlert = ({ status, type = "info", onClose }) => {
  const bgColor = {
    success: "bg-green-100 border-green-400",
    error: "bg-red-100 border-red-400",
    info: "bg-blue-100 border-blue-400",
    warning: "bg-yellow-100 border-yellow-400",
  }[type];

  const textColor = {
    success: "text-green-800",
    error: "text-red-800",
    info: "text-blue-800",
    warning: "text-yellow-800",
  }[type];

  const emoji = {
    success: "✓",
    error: "❌",
    info: "ℹ️",
    warning: "⚠️",
  }[type];

  return (
    <div className={`border rounded-lg p-4 mb-4 flex items-start gap-3 ${bgColor}`}>
      <div className={`text-2xl ${textColor}`}>{emoji}</div>
      <div className="flex-1">
        <p className={`font-semibold ${textColor}`}>{status}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`text-sm ${textColor} hover:opacity-70 font-semibold`}
        >
          ✕
        </button>
      )}
    </div>
  );
};

// Wallet Display Card
export const WalletCard = ({ walletAddress, label = "Wallet" }) => {
  return (
    <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 flex items-center gap-3">
      <span className="text-2xl flex-shrink-0">💰</span>
      <div>
        <p className="text-xs text-gray-400 uppercase">{label}</p>
        <p className="font-mono text-sm">
          {walletAddress
            ? `${walletAddress.slice(0, 10)}...${walletAddress.slice(-8)}`
            : "Not Connected"}
        </p>
      </div>
    </div>
  );
};

// Amount Display Card
export const AmountCard = ({ amount, status, label = "Amount" }) => {
  return (
    <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 flex items-center gap-3">
      <span className="text-2xl flex-shrink-0">💵</span>
      <div>
        <p className="text-xs text-gray-400 uppercase">{label}</p>
        <p className="font-semibold text-lg">
          {amount ? `${amount} ETH` : "N/A"}
        </p>
      </div>
    </div>
  );
};

// Status Badge
export const StatusBadge = ({ status }) => {
  const statusColors = {
    "Pending": "bg-yellow-100 text-yellow-800",
    "Escrow Created": "bg-blue-100 text-blue-800",
    "Work Submitted": "bg-purple-100 text-purple-800",
    "Payment Released": "bg-green-100 text-green-800",
  };

  const color = statusColors[status] || "bg-gray-100 text-gray-800";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
      {status}
    </span>
  );
};

// Transaction Link
export const TransactionLink = ({ hash, message }) => {
  const sepoliaUrl = `https://sepolia.etherscan.io/tx/${hash}`;

  return (
    <a
      href={sepoliaUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-blue-500 hover:text-blue-700 font-semibold text-sm"
    >
      <span>➡️</span>
      <span>{message || "View Transaction"}</span>
    </a>
  );
};

// Loading Spinner
export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="animate-spin text-2xl">⚙️</span>
      <span>Loading...</span>
    </div>
  );
};
