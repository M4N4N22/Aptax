import "server-only";

import { Contract, Interface, JsonRpcProvider } from "ethers";

import {
  aptaxMetricStoreAbi,
  aptaxRegistryAbi,
  aptaxVerifierAbi,
} from "@/lib/aptax/abis";
import { getAptaxServerEnv } from "@/server/aptax/env";

let provider: JsonRpcProvider | null = null;

export const registryInterface = new Interface(aptaxRegistryAbi);
export const metricStoreInterface = new Interface(aptaxMetricStoreAbi);
export const verifierInterface = new Interface(aptaxVerifierAbi);

function getProvider() {
  if (!provider) {
    const env = getAptaxServerEnv();
    provider = new JsonRpcProvider(env.NEXT_PUBLIC_NETWORK_RPC_URL, env.NEXT_PUBLIC_NETWORK_CHAIN_ID);
  }

  return provider;
}

export function getAptaxAddresses() {
  const env = getAptaxServerEnv();

  return {
    registryAddress: env.NEXT_PUBLIC_APTAX_REGISTRY_ADDRESS,
    metricStoreAddress: env.NEXT_PUBLIC_APTAX_METRIC_STORE_ADDRESS,
    verifierAddress: env.NEXT_PUBLIC_APTAX_VERIFIER_ADDRESS,
  };
}

export function getRegistryContract() {
  const { registryAddress } = getAptaxAddresses();
  return new Contract(registryAddress, aptaxRegistryAbi, getProvider());
}

export function getVerifierContract() {
  const { verifierAddress } = getAptaxAddresses();
  return new Contract(verifierAddress, aptaxVerifierAbi, getProvider());
}

export function getMetricStoreContract() {
  const { metricStoreAddress } = getAptaxAddresses();
  return new Contract(metricStoreAddress, aptaxMetricStoreAbi, getProvider());
}
