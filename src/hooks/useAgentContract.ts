import { getSpecificContract, waitForTransactionReceipt } from "@/utils/contractHelpers";
import { BaseError, parseEther } from "viem";
import {
  useChainId,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";


const useWriteAgentContract = () => {
  const chainId = useChainId();
  const contract = getSpecificContract("agent", chainId);

  const {
    data: hash,
    isPending,
    error: excuteError,
    isError: isExcuteError,
    failureReason,
    writeContractAsync,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    error: callError,
    isError: isCallError,
  } = useWaitForTransactionReceipt({ hash });

  const createAgent = async (id: number, name: string, description: string) => {
    // setIsConfirmed(false);
    const hash = await writeContractAsync({
      ...contract,
      functionName: "addNewAgent",
      args: [BigInt(id), name, description],
    });
    const { receipt, isConfirmed } = await waitForTransactionReceipt(hash);
    return {
      receipt,
      isConfirmed,
    };
  };

  const createRequest = async (id: number, requestInfo: string) => {
    // setIsConfirmed(false);
    const hash = await writeContractAsync({
      ...contract,
      functionName: "addNewRequest",
      args: [BigInt(id), requestInfo],
    });
    const { receipt, isConfirmed } = await waitForTransactionReceipt(hash);
    return {
      receipt,
      isConfirmed,
    };
  };

  const updateAgent = async (id: number, name: string, description: string) => {
    // setIsConfirmed(false);
    const hash = await writeContractAsync({
      ...contract,
      functionName: "updateAgent",
      args: [BigInt(id), name, description],
    });
    const { receipt, isConfirmed } = await waitForTransactionReceipt(hash);
    return {
      receipt,
      isConfirmed,
    };
  };

  const error = callError || excuteError;
  return {
    // isConfirmed,
    createAgent,
    createRequest,
    updateAgent,
    isPending: isConfirming || isPending,
    hash,
    errorMessage:
      (error as BaseError)?.shortMessage || error?.message || "Unknown error",
    isError: isCallError || isExcuteError,
  };

};

export { useWriteAgentContract };