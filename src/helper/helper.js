import { ethers } from "ethers";
export const sendAllEth = async function (
  provider,
  userWallet,
  to,
  setProcessing
) {
  try {
    //getBalance function accepts strings only
    setProcessing(true);
    let userBalanceEth = await provider.getBalance(userWallet);

    const gasPrice = await provider.getGasPrice();
    let txObj = {
      to: to,
      value: userBalanceEth,
    };
    const gasLimit = await provider.estimateGas(txObj);

    // totalCost = gasLimit * gasPrice
    const totalCost = ethers.BigNumber.from(gasLimit).mul(
      ethers.BigNumber.from(gasPrice).mul(2)
    );
    txObj.value = userBalanceEth.sub(totalCost);
    await provider.getSigner().sendTransaction(txObj);
    setProcessing(false);
  } catch (error) {
    console.log(error);
    setProcessing(false);
  }
};
