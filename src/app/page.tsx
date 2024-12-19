import { SolanaWalletProvider } from "./providers/WalletProvider";
import WalletUI from "./providers/WalletUI";

export default function Home() {
  return (
    <SolanaWalletProvider>
      <WalletUI />
    </SolanaWalletProvider>
  );
}
