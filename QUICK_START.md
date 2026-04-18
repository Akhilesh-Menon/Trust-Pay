# 🚀 QUICK START CHECKLIST

## Before You Deploy

- [ ] MetaMask extension installed (https://metamask.io)
- [ ] MetaMask wallet created
- [ ] Connected to Sepolia Testnet in MetaMask

## Deployment Steps (Copy & Paste)

### 1. Deploy Smart Contract
```
Go to: https://remix.ethereum.org
1. New File → TrustPayEscrow.sol
2. Paste code from TrustPayEscrow.sol in your project
3. Solidity Compiler → Compile v0.8.0
4. Deploy & Run Transactions
5. Change to "Injected Provider - MetaMask"
6. Click Deploy
7. Confirm in MetaMask
8. COPY contract address
```

### 2. Get Test ETH
```
Go to: https://sepoliafaucet.com
Paste wallet address
Click "Send me 0.5 ETH"
Wait 1-2 minutes
Check MetaMask balance
```

### 3. Get Contract ABI
```
In Remix:
1. Click deployed contract
2. Click copy button next to ABI
3. Open App.jsx
4. Find: const CONTRACT_ABI = [];
5. Paste entire ABI array inside brackets
```

### 4. Update App.jsx
```javascript
// Find around line 30:
const CONTRACT_ADDRESS = "0x..."; // Paste your contract address here
const CONTRACT_ABI = [...]; // Paste your ABI here
```

## Test Checklist

- [ ] App loads without errors
- [ ] "Connect Wallet" button visible in navbar
- [ ] Clicking "Connect Wallet" opens MetaMask
- [ ] Wallet address appears in green button
- [ ] Wallet address shows in both dashboards
- [ ] "Lock Payment" calls contract.deposit() successfully
- [ ] "Release Payment" calls contract.release() successfully
- [ ] No white screen errors
- [ ] No console errors

## Files Updated

```
✓ App.jsx - Added MetaMask integration
✓ TrustPayEscrow.sol - New smart contract
✓ METAMASK_SETUP.md - Full setup guide
```

## Key Code Locations in App.jsx

```javascript
Line 7:    import { ethers } from "ethers";
Line 28-31: Contract configuration
Line 36-67: connectWallet() function
Line 69-109: lockPayment() function
Line 111-151: releasePayment() function
Line 153-176: Updated Navbar with wallet button
Line 227-243: Updated Client Dashboard
Line 265-281: Updated Freelancer Dashboard
```

## Troubleshooting

### White Screen?
- Check browser console (F12)
- Make sure CONTRACT_ADDRESS and CONTRACT_ABI are not empty
- Restart dev server: Ctrl+C, then `npm run dev`

### Wallet won't connect?
- Refresh page
- Restart MetaMask
- Make sure MetaMask is unlocked
- Try on different browser tab

### Transaction fails?
- Check you have >= 0.1 ETH on Sepolia
- Verify wallet address format (0x...)
- Check contract is deployed on Sepolia
- View error message in alert

### Can't see wallet address in dashboards?
- Click "Connect Wallet" first
- Approve MetaMask popup
- Refresh page if needed

---

**All set! Start with `npm run dev` and follow the Test Checklist above.** 🎉
