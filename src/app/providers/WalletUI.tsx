"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";

export default function WalletUI() {
  const { publicKey, sendTransaction } = useWallet();
  const [status, setStatus] = useState("");

  const handleTransaction = async () => {
    if (!publicKey) return;

    try {
      const connection = new Connection("https://api.devnet.solana.com", "confirmed");

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey, // Replace with recipient's public key
          lamports: 1000, // Amount to transfer in lamports
        })
      );

      const signature = await sendTransaction(transaction, connection);
      setStatus(`Transaction sent: ${signature}`);
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Solana dApp</h1>
      <WalletMultiButton />
      {publicKey && <p>Connected Wallet: {publicKey.toBase58()}</p>}
      <button onClick={handleTransaction} disabled={!publicKey}>
        Perform Action
      </button>
      {status && <p>{status}</p>}
    </div>
  );
}
