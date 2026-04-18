# 🔐 Add Contract Address & ABI - Quick Guide

## 📌 Quick Steps

### Step 1: Deploy Contract (if not done)
- Go to https://remix.ethereum.org
- Create `TrustPayEscrow.sol` file
- Copy code from your project's `TrustPayEscrow.sol`
- Compile & Deploy to Sepolia testnet
- **COPY the contract address** (0x...)

### Step 2: Get Contract ABI

**Option A: From Remix (Recommended)**
1. In Remix, under "Deployed Contracts"
2. Click your contract name
3. Look for ABI button (copy icon)
4. Click to copy the full ABI

**Option B: Use Pre-configured ABI**
- The file `src/blockchain/TrustPayABI.json` is already complete
- Just add your CONTRACT_ADDRESS

---

## 🎯 Add to App.jsx

### Find This Section (Line ~30)
```javascript
const CONTRACT_ADDRESS = ""; // Paste contract address from Remix
const CONTRACT_ABI = []; // Paste ABI array from Remix
```

### Update Like This

#### For CONTRACT_ADDRESS:
```javascript
const CONTRACT_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc9e7595f12345";
```

#### For CONTRACT_ABI:

**IF you copied from Remix:** Paste the full ABI array:
```javascript
const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "freelancer",
        "type": "address"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  // ... more functions ...
];
```

**IF you want to use the pre-configured ABI:**
The ABI is already imported! Just keep:
```javascript
const CONTRACT_ABI = [];
```
And the app will use the ABI from `src/blockchain/TrustPayABI.json` automatically.

---

## ✅ Final Result Should Look Like

```javascript
export default function TrustPayApp() {
  // ... other states ...

  // Smart Contract Config
  const CONTRACT_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc9e7595f12345";
  const CONTRACT_ABI = [];  // Using pre-configured ABI from TrustPayABI.json

  // ... rest of code ...
}
```

---

## 🧪 Test It Works

1. Save the file
2. Check browser console (F12) - no errors?
3. Go to Client Dashboard
4. Click "Connect Wallet"
5. Enter freelancer wallet & amount
6. Click "Lock Payment"
7. Confirm in MetaMask
8. Should show transaction hash with Etherscan link ✓

---

## 📖 Where is What?

| Item | Location |
|------|----------|
| Contract Address | Remix deployment output |
| Contract ABI | Remix "ABI" button OR `src/blockchain/TrustPayABI.json` |
| Add Address/ABI | Line ~30 in `src/App.jsx` |
| Pre-configured ABI | `src/blockchain/TrustPayABI.json` |
| Blockchain Functions | `src/blockchain/blockchainActions.js` |
| Icon Components | `src/components/BlockchainUI.jsx` |

---

## 🔍 Verify Your Settings

Check these values are correct:

- [ ] CONTRACT_ADDRESS starts with `0x`
- [ ] CONTRACT_ADDRESS is 42 characters long (0x + 40 hex chars)
- [ ] CONTRACT_ABI is valid JSON array (or empty if using TrustPayABI.json)
- [ ] Contract is deployed on **Sepolia testnet**
- [ ] You have at least **0.1 ETH** on Sepolia

---

## ✨ Example Complete Setup

```javascript
// src/App.jsx - Lines 28-31

// Smart Contract Config (UPDATED)
const CONTRACT_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc9e7595f129A8"; // ✓ Filled
const CONTRACT_ABI = [];  // ✓ Using pre-configured from TrustPayABI.json
```

**That's it! Your app is ready to use.** 🎉

---

## 🔗 Useful Links

- **Remix IDE:** https://remix.ethereum.org
- **Etherscan Sepolia:** https://sepolia.etherscan.io
- **Get Test ETH:** https://sepoliafaucet.com
- **MetaMask:** https://metamask.io

---

## 💡 Pro Tips

1. **Save contract address somewhere** - you'll need it later
2. **Keep ABI in TrustPayABI.json** - easier to manage
3. **Test on testnet first** - always use Sepolia before mainnet
4. **Check Etherscan** - all transactions are visible there
5. **Never share private keys** - keep them safe!

---

## 🚀 Ready?

1. Add CONTRACT_ADDRESS
2. Keep CONTRACT_ABI = [] (uses TrustPayABI.json)
3. Run `npm run dev`
4. Test the app!

**Questions?** Check ICONS_AND_BLOCKCHAIN_SETUP.md for details.
