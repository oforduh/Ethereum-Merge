import React, { useState } from "react";
import styles from "./navbar.module.scss";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { useAddress, useWeb3Context } from "../../context/web3Context";

const Navbar = () => {
  const [connecting, setConnecting] = useState(false);
  const address = useAddress();
  const { connect, disconnect, connected } = useWeb3Context();

  // format the address
  let ellipsis = address
    ? `${address.slice(0, 3)}
    ...${address.slice(address.length - 5, address.length)}`
    : "Connect Wallet";

  return (
    <div className={styles.container}>
      <div className={styles.navbar_container}>
        <div>Web3Modal</div>
        <div>
          <button
            onClick={() => {
              {
                !connected ? connect(setConnecting) : disconnect();
              }
            }}
          >
            {connected
              ? ellipsis
              : connecting
              ? "connecting"
              : "connect wallet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
