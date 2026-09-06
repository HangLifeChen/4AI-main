import { waitForTransactionReceipt as waitForTransactionReceiptWagmi } from "wagmi/actions";
import { Address } from "viem";
import { Chain } from "wagmi/chains";
import { ContractAddresses } from "./contractAddresses";
import { config } from '@/components/common/reown-provider/wagmi-config';
import { Abis, contractAbis } from "./contractAbis";

export type Addresses = {
  [chainId in Chain["id"]]: Address;
};

// wait for transaction status
export const waitForTransactionReceipt = async (hash: `0x${string}`) => {
  const receipt = await waitForTransactionReceiptWagmi(config, { hash });
  return {
    receipt,
    isConfirmed: receipt.status === "success",
  };
};

export const addressMap = (
  address: Addresses,
  chainId?: Chain["id"],
): `0x${string}` => {
  return chainId && address[chainId] ? address[chainId] : ("" as `0x${string}`);
};

export const getSpecificContract = (contractName: Abis, chainId: number) => {
  const address = addressMap(ContractAddresses[contractName] as Addresses, chainId);
  const abi = contractAbis(contractName);

  return {
    address,
    abi: abi,
  };
};


