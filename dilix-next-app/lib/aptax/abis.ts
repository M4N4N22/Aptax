import type { Abi } from "viem";

export {
  aptaxMetricStoreAbi,
  aptaxRegistryAbi,
  aptaxVerifierAbi,
} from "./abis.generated";

import {
  aptaxMetricStoreAbi as generatedAptaxMetricStoreAbi,
  aptaxRegistryAbi as generatedAptaxRegistryAbi,
  aptaxVerifierAbi as generatedAptaxVerifierAbi,
} from "./abis.generated";

export const aptaxRegistryViemAbi = generatedAptaxRegistryAbi as Abi;
export const aptaxMetricStoreViemAbi = generatedAptaxMetricStoreAbi as Abi;
export const aptaxVerifierViemAbi = generatedAptaxVerifierAbi as Abi;
