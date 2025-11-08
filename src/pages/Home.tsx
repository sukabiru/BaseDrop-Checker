import ConnectWallet from "../components/ConnectWallet";

export default function Home() {
  return (
    <div className="page">
      <h1>BaseDrop Checker</h1>
      <p>Cek indikasi eligibility airdrop di jaringan Base.</p>
      <ConnectWallet />
    </div>
  );
}
