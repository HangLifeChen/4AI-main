import { agentsAbi } from "./abis"

export type Abis = keyof typeof allAbis

const allAbis = {
  agent: agentsAbi,
}

export const contractAbis = (contractName: Abis) => {
  return allAbis[contractName]
}