import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

// Staking Token ABI (already includes stake function)
const stakingTokenABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function stake(uint256 amount)"
];

const STAKING_TOKEN_ADDRESS = "0x2b135a08c50e8871C6a8932B74d8cD0325e44D9b";

const StakeToken = ({ onBalanceUpdate }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [stakingToken, setStakingToken] = useState(null);
  const [amountToApprove, setAmountToApprove] = useState('');
  const [tokenBalance, setTokenBalance] = useState('0');
  const [error, setError] = useState(null);

  const STAKE_DAPP_ADDRESS = "0x8755B5bFfC86dFabB8B15148074d05C411Aad1b6";

  // Connect to MetaMask
  const connectWallet = async () => {
    try {
      setError(null);
      const ethProvider = await detectEthereumProvider({ mustBeMetaMask: true });
      if (!ethProvider) {
        setError("MetaMask not detected. Please install MetaMask.");
        return;
      }

      const provider = new ethers.providers.Web3Provider(ethProvider);
      let accounts;
      try {
        accounts = await provider.send("eth_requestAccounts", []);
      } catch (err) {
        setError("Failed to connect to MetaMask. Please unlock your wallet or allow access.");
        console.error("MetaMask connection error:", err);
        return;
      }

      const signer = provider.getSigner();
      const userAddress = accounts[0];

      setProvider(provider);
      setSigner(signer);
      setAccount(userAddress);

      // Initialize staking token contract
      const stakingTokenContract = new ethers.Contract(STAKING_TOKEN_ADDRESS, stakingTokenABI, signer);
      setStakingToken(stakingTokenContract);

      // Fetch balance after connecting
      fetchBalance(userAddress, stakingTokenContract);
    } catch (err) {
      setError("Unexpected error during wallet connection. Check console for details.");
      console.error("Wallet connection error:", err);
    }
  };

  // Fetch balance
  const fetchBalance = async (userAccount, stakingTokenContract) => {
    try {
      if (stakingTokenContract && userAccount) {
        const balance = await stakingTokenContract.balanceOf(userAccount);
        const formattedBalance = ethers.utils.formatEther(balance);
        setTokenBalance(formattedBalance);
        if (onBalanceUpdate) {
          onBalanceUpdate(formattedBalance);
        }
      }
    } catch (err) {
      setError("Failed to fetch balance. Check console for details.");
      console.error("Balance fetch error:", err);
    }
  };

  // Approve tokens
  const handleApprove = async () => {
    if (!stakingToken || !account) {
      setError("Connect wallet first!");
      return;
    }
    if (!amountToApprove) {
      setError("Enter an amount to approve!");
      return;
    }
    try {
      setError(null);
      const tx = await stakingToken.approve(STAKE_DAPP_ADDRESS, ethers.utils.parseEther(amountToApprove));
      await tx.wait();
      alert("Approval successful!");
      fetchBalance(account, stakingToken);
    } catch (err) {
      setError("Approval failed. Check console for details.");
      console.error("Approval error:", err);
    }
  };

  // Stake tokens
  const handleStake = async () => {
    if (!stakingToken || !account) {
      setError("Connect wallet first!");
      return;
    }
    if (!amountToApprove) {
      setError("Enter an amount to stake!");
      return;
    }
    try {
      setError(null);
      const amountToStake = ethers.utils.parseEther(amountToApprove);
      const tx = await stakingToken.stake(amountToStake);
      await tx.wait();
      alert("Staking successful!");
      fetchBalance(account, stakingToken); // Refresh balance after staking
    } catch (err) {
      setError("Staking failed. Check console for details.");
      console.error("Staking error:", err);
    }
  };

  return (
    <div className="StakeToken">
      <h2>Stake Token</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!account ? (
        <button onClick={connectWallet}>Connect MetaMask</button>
      ) : (
        <>
          <p>Account: {account}</p>
          <p>Balance: {tokenBalance} STK</p>
          <input
            type="text"
            placeholder="Amount to approve/stake"
            value={amountToApprove}
            onChange={(e) => setAmountToApprove(e.target.value)}
          />
          <button onClick={handleApprove}>Approve Tokens</button>
          <button onClick={handleStake}>Stake Tokens</button>
        </>
      )}
    </div>
  );
};

export default StakeToken;