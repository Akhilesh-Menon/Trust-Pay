# 🏗️ Architecture & Data Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   TrustPay+ Application                      │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ App.jsx (Main Component)                               │  │
│  │  ├── States: page, role, walletAddress, etc.          │  │
│  │  ├── Functions: connectWallet, lockPayment, etc.      │  │
│  │  └── Pages: Home, Login, Signup, Dashboards           │  │
│  └────────────────────────────────────────────────────────┘  │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Components (BlockchainUI.jsx)                          │ │
│  │  ├── WalletButton (with icons)                        │ │
│  │  ├── LockPaymentButton                                │ │
│  │  ├── ReleasePaymentButton                             │ │
│  │  ├── StatusAlert                                      │ │
│  │  ├── WalletCard                                       │ │
│  │  ├── AmountCard                                       │ │
│  │  ├── StatusBadge                                      │ │
│  │  └── TransactionLink                                 │ │
│  └──────────────────────────────────────────────────────────┘ │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ UI/Styling                                             │ │
│  │  ├── Tailwind CSS (responsive grid, colors)           │ │
│  │  ├── lucide-react (13 icons)                          │ │
│  │  └── Custom animations (loading spinners)             │ │
│  └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│          BLOCKCHAIN INTEGRATION LAYER                         │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ blockchainActions.js                                   │  │
│  │  ├── depositToEscrow(address, amount)                 │  │
│  │  ├── releaseFromEscrow(address)                       │  │
│  │  └── getEscrowBalance(address)                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                           ↓                                   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ contract.js                                            │  │
│  │  ├── getContract(contractAddress)                     │  │
│  │  ├── getProvider()                                    │  │
│  │  └── imports TrustPayABI.json                         │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│            EXTERNAL SERVICES                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ MetaMask                                               │ │
│  │  └── window.ethereum provider                         │ │
│  └──────────────────────────────────────────────────────────┘ │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ ethers.js Library                                      │ │
│  │  ├── BrowserProvider (MetaMask connection)            │ │
│  │  ├── Signer (signing transactions)                    │ │
│  │  └── Contract (interact with smart contract)          │ │
│  └──────────────────────────────────────────────────────────┘ │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Sepolia Testnet Blockchain                            │ │
│  │  ├── TrustPayEscrow Smart Contract                    │ │
│  │  ├── User Wallets                                     │ │
│  │  └── Transaction History                              │ │
│  └──────────────────────────────────────────────────────────┘ │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Etherscan (Block Explorer)                            │ │
│  │  └── View transactions & contract details             │ │
│  └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│            BACKEND SERVICES                                   │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Firebase                                               │ │
│  │  ├── Authentication (auth.js)                         │ │
│  │  │   ├── Signup with email/password                  │ │
│  │  │   └── Login with email/password                   │ │
│  │  └── Firestore Database (db.js)                      │ │
│  │      ├── User profiles                               │ │
│  │      ├── Wallet information                          │ │
│  │      └── Transaction history                         │ │
│  └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

---

## Data Flow: Lock Payment

```
User clicks "Lock Payment" button
         ↓
  Validation checks:
  ├── Wallet connected? ✓
  ├── Freelancer address valid? ✓
  └── Amount > 0? ✓
         ↓
  App.jsx: lockPayment() called
         ↓
  blockchainActions.js: depositToEscrow()
         ↓
  contract.js: getContract(CONTRACT_ADDRESS)
         ↓
  ethers.js creates contract instance
         ↓
  Window.ethereum (MetaMask)
         ↓
  MetaMask shows popup for user approval
         ↓
  User clicks "Confirm" in MetaMask
         ↓
  Transaction sent to Sepolia blockchain
         ↓
  Mining... (showing spinner ⚙️)
         ↓
  Transaction confirmed (10-30 seconds)
         ↓
  Status message: "✓ Payment locked!"
  Transaction hash displayed
  Status badge changes to "Escrow Created"
         ↓
  Transaction link shows (clickable)
  User can view on Etherscan (https://sepolia.etherscan.io)
```

---

## Data Flow: Release Payment

```
User clicks "Release Payment" button
         ↓
  Validation checks:
  ├── Wallet connected? ✓
  └── Freelancer address valid? ✓
         ↓
  App.jsx: releasePayment() called
         ↓
  blockchainActions.js: releaseFromEscrow()
         ↓
  contract.js: getContract(CONTRACT_ADDRESS)
         ↓
  ethers.js creates contract instance
         ↓
  Window.ethereum (MetaMask)
         ↓
  MetaMask shows popup for user approval
         ↓
  User clicks "Confirm" in MetaMask
         ↓
  Transaction sent to Sepolia blockchain
  Contract executes release() function
         ↓
  Funds transfer to freelancer wallet
         ↓
  Mining... (showing spinner ⚙️)
         ↓
  Transaction confirmed (10-30 seconds)
         ↓
  Status message: "✓ Payment released!"
  Transaction hash displayed
  Status badge changes to "Payment Released"
         ↓
  Freelancer receives ETH in their wallet
  Etherscan shows transaction
```

---

## Component Hierarchy

```
App (Main Component)
│
├── Home Page
│   ├── Navbar (no icons here)
│   └── Landing section
│
├── Login Page
│   └── Input form
│
├── Signup Page
│   └── Input form
│
├── Role Selection Page
│   └── Two buttons
│
├── Client Dashboard
│   ├── Navbar
│   │   ├── 🏠 Dashboard button
│   │   ├── 💼 Freelancer button
│   │   ├── 💳 WalletButton component
│   │   └── 🚪 Logout button
│   │
│   ├── Header section
│   │
│   ├── StatusAlert component (if message)
│   │
│   ├── TransactionLink component (if hash)
│   │
│   ├── Stats Cards Row
│   │   ├── WalletCard component (💰)
│   │   ├── Freelancer card (💼)
│   │   ├── AmountCard component (💵)
│   │   └── Status card with StatusBadge component
│   │
│   ├── Escrow Balance display (if > 0)
│   │
│   └── Payment Form Card
│       ├── Input: Freelancer Wallet
│       ├── Input: Amount (ETH)
│       ├── LockPaymentButton component (🔒)
│       │   └── Shows spinner when loading
│       └── ReleasePaymentButton component (🔓)
│           └── Shows spinner when loading
│
└── Freelancer Dashboard
    ├── Navbar
    │   └── Same buttons as Client
    │
    ├── Header section
    │
    ├── StatusAlert component (if message)
    │
    ├── Stats Cards Row
    │   ├── WalletCard component
    │   ├── Status badge
    │   └── Payout status
    │
    └── Work Submission Card
        ├── Input: Work Link
        └── Submit button (💼)
```

---

## State Management Flow

```
App Component State:
│
├── Authentication States
│   ├── page (home, login, signup, role, client, freelancer)
│   ├── role (client or freelancer)
│   ├── email
│   └── password
│
├── Wallet States
│   ├── walletAddress ("0x..." or "")
│   ├── provider (ethers provider or null)
│   ├── signer (ethers signer or null)
│   └── isLoadingWallet (true/false during connection)
│
├── Transaction States
│   ├── isLoadingTx (true/false during transaction)
│   ├── txMessage (status text)
│   ├── txHash (transaction hash)
│   └── escrowBalance (ETH amount)
│
├── Payment States
│   ├── clientWallet
│   ├── freelancerWallet
│   ├── amount
│   ├── status (Pending, Escrow Created, Payment Released, etc.)
│   └── workLink
│
└── Contract Config
    ├── CONTRACT_ADDRESS ("0x..." from Remix)
    └── CONTRACT_ABI (array from Remix or TrustPayABI.json)
```

---

## Error Handling Flow

```
User Action
    ↓
Try-Catch Block
    ├── ✓ Success Path
    │   ├── Update states
    │   ├── Show success message (✓)
    │   └── Clear after 3 seconds
    │
    └── ❌ Error Path
        ├── Catch error
        ├── Show error message (❌)
        ├── Log to console (for debugging)
        └── User can retry
```

---

## File Import Flow

```
App.jsx
├── imports React hooks
│   └── useState, useEffect
├── imports Firebase modules
│   └── auth, db, createUserWithEmailAndPassword, etc.
├── imports ethers.js
│   └── ethers (contract, signer, provider)
├── imports custom components
│   └── BlockchainUI.jsx (all UI components)
├── imports blockchain utilities
│   └── blockchainActions.js (contract functions)
└── imports icons
    └── lucide-react (Wallet, Lock, Unlock, etc.)

BlockchainUI.jsx
├── imports React
├── imports lucide-react icons
│   └── (Wallet, Lock, Unlock, Send, CheckCircle, etc.)
└── exports 10 component functions

blockchainActions.js
├── imports ethers.js
│   └── ethers.parseEther, ethers.formatEther
├── imports contract utilities
│   └── getContract() from contract.js
└── exports 3 blockchain functions

contract.js
├── imports ethers.js
├── imports TrustPayABI.json
└── exports getContract(), getProvider()
```

---

## Technology Stack

```
Frontend Layer:
├── React 19.2.4           (UI framework)
├── React-DOM 19.2.4       (DOM rendering)
├── Tailwind CSS 4.2.2     (Styling)
├── lucide-react (latest)  (Icons - NEW)
└── Vite 8.0.4             (Build tool)

Blockchain Layer:
├── ethers.js 6.16.0       (Blockchain library)
└── MetaMask              (Wallet - external)

Backend/Auth Layer:
└── Firebase 12.12.0       (Auth & Database)

Smart Contract:
└── Solidity 0.8.0+        (Blockchain language)
    └── Deployed on Sepolia Testnet

Development Tools:
├── ESLint 9.39.4          (Code quality)
├── @vitejs/plugin-react   (React support in Vite)
└── Tailwind CSS Vite Plugin (Styling)
```

---

## Feature Matrix

| Feature | Component | Status |
|---------|-----------|--------|
| Email/Password Auth | App.jsx + Firebase | ✓ |
| Role-based access | App.jsx | ✓ |
| Wallet connection | WalletButton + connectWallet() | ✓ |
| Deposit escrow | LockPaymentButton + depositToEscrow() | ✓ |
| Release payment | ReleasePaymentButton + releaseFromEscrow() | ✓ |
| Check balance | blockchainActions.js | ✓ |
| View transactions | TransactionLink component | ✓ |
| Status messages | StatusAlert component | ✓ |
| Loading states | LoadingSpinner + isLoadingTx | ✓ |
| Error handling | Try-catch blocks | ✓ |
| Icons & UI | BlockchainUI components | ✓ |
| Responsive design | Tailwind CSS | ✓ |

---

## Deployment Architecture

```
Local Development:
├── npm run dev
├── Vite dev server (localhost:5173)
├── Hot module reload
└── MetaMask testnet

Production Build:
├── npm run build
├── Vite bundling
├── Static files (HTML, CSS, JS)
├── Deployed to: Vercel / Netlify / AWS
└── MetaMask mainnet (when ready)
```

---

**Total Components: 19 (1 main + 10 UI + 3 blockchain + 5 pages)**

**Total Functions: 15+ (Connect wallet, lock, release, validate, etc.)**

**Icons Used: 13 different lucide-react icons**

**State Variables: 18+ managed in React**

**External APIs: MetaMask, Ethers.js, Firebase, Etherscan**
