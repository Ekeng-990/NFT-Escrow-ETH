# 🔐 NFT Escrow Marketplace

## 📌 Overview
NFT Escrow Marketplace is a decentralized escrow system built on Ethereum using Solidity smart contracts. This platform ensures secure transactions where funds are only released when both parties meet the agreed conditions.

## 🚀 Features
- ✅ **Secure Escrow System** – Funds are locked in a smart contract until released or refunded.
- ✅ **Decentralized Transactions** – Uses smart contracts to eliminate intermediaries.
- ✅ **Arbiter Role** – A third-party arbiter can resolve disputes.
- ✅ **Web3 Integration** – Users can connect their MetaMask wallet to interact with the platform.
- ✅ **Transaction History** – View all escrow contracts created on the platform.

## 🏗️ Smart Contracts
This project consists of two main smart contracts:
- 📜 **Escrow.sol** – Handles individual escrow transactions.
- 🏭 **EscrowFactory.sol** – Manages multiple escrow contracts.

## 🔧 Installation
### 📌 Prerequisites
Ensure you have the following installed:
- 🟢 [Node.js](https://nodejs.org/)
- ⚒️ [Hardhat](https://hardhat.org/)
- 🔑 [MetaMask](https://metamask.io/)

### 📌 Steps to Run
1. Clone this repository:
   ```sh
   git clone https://github.com/Ekeng-990/NFT-Escrow-ETH.git
   cd NFT-Escrow-ETH
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Compile the smart contracts:
   ```sh
   npx hardhat compile
   ```

4. Deploy the contracts:
   ```sh
   npx hardhat run scripts/deploy.js --network localhost
   ```

5. Start the frontend:
   ```sh
   npm run dev
   ```

## 📂 Folder Structure
```
/contracts      # Solidity smart contracts
  ├── Escrow.sol
  ├── EscrowFactory.sol
/scripts        # Deployment scripts
  ├── deploy.js
/test           # Smart contract tests
  ├── Escrow.test.js
/pages          # Frontend pages (Next.js)
  ├── index.js
  ├── create.js
  ├── escrow/[id].js
/components     # UI components
  ├── Navbar.js
  ├── EscrowCard.js
/utils          # Web3 interactions
  ├── interact.js
/server         # Backend API & Webhooks
  ├── webhook.js
```

## 📖 Usage
1. **🔗 Connect Wallet** – Users must connect their MetaMask wallet.
2. **📜 Create Escrow** – Define seller, arbiter, and deposit funds.
3. **🔄 Manage Transactions** – Buyer can release funds or request a refund via the smart contract.

## 📜 License
This project is licensed under the **MIT License**.

---

💻 **Created by Lucifer** 🚀

