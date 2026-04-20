import "server-only";

import deployments from "@/lib/aptax/deployments.generated.json";
import { z } from "zod";

const aptaxAddress = z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Expected a contract address.");

const envSchema = z.object({
  NEXT_PUBLIC_NETWORK_CHAIN_ID: z.coerce.number().int().positive(),
  NEXT_PUBLIC_NETWORK_RPC_URL: z.string().url(),
  NEXT_PUBLIC_APTAX_REGISTRY_ADDRESS: aptaxAddress,
  NEXT_PUBLIC_APTAX_METRIC_STORE_ADDRESS: aptaxAddress,
  NEXT_PUBLIC_APTAX_VERIFIER_ADDRESS: aptaxAddress,
});

export function getAptaxServerEnv() {
  const chainId = Number(
    process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID ?? process.env.NEXT_PUBLIC_APTAX_CHAIN_ID
  );
  const generatedDeployment = Object.values(deployments as Record<string, {
    chainId: number;
    registry: string;
    metricStore: string;
    verifier: string;
  }>).find((deployment) => deployment.chainId === chainId);

  const result = envSchema.safeParse({
    NEXT_PUBLIC_NETWORK_CHAIN_ID: chainId,
    NEXT_PUBLIC_NETWORK_RPC_URL:
      process.env.NEXT_PUBLIC_NETWORK_RPC_URL ?? process.env.NEXT_PUBLIC_APTAX_RPC_URL,
    NEXT_PUBLIC_APTAX_REGISTRY_ADDRESS:
      process.env.NEXT_PUBLIC_APTAX_REGISTRY_ADDRESS ?? generatedDeployment?.registry,
    NEXT_PUBLIC_APTAX_METRIC_STORE_ADDRESS:
      process.env.NEXT_PUBLIC_APTAX_METRIC_STORE_ADDRESS ?? generatedDeployment?.metricStore,
    NEXT_PUBLIC_APTAX_VERIFIER_ADDRESS:
      process.env.NEXT_PUBLIC_APTAX_VERIFIER_ADDRESS ?? generatedDeployment?.verifier,
  });
  if (!result.success) {
    const message = result.error.issues.map((issue) => issue.message).join(" ");
    throw new Error(
      `Network configuration is incomplete. Set NEXT_PUBLIC_NETWORK_CHAIN_ID, NEXT_PUBLIC_NETWORK_RPC_URL, NEXT_PUBLIC_APTAX_REGISTRY_ADDRESS, NEXT_PUBLIC_APTAX_METRIC_STORE_ADDRESS, and NEXT_PUBLIC_APTAX_VERIFIER_ADDRESS. Legacy NEXT_PUBLIC_APTAX_CHAIN_ID and NEXT_PUBLIC_APTAX_RPC_URL are still accepted only for compatibility. ${message}`
    );
  }

  return result.data;
}
