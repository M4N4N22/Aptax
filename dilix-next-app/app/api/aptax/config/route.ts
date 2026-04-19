import { getAptaxServerEnv } from "@/server/aptax/env";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const env = getAptaxServerEnv();

    return Response.json({
      configured: true,
      networkChainId: env.NEXT_PUBLIC_NETWORK_CHAIN_ID,
      registryAddress: env.NEXT_PUBLIC_APTAX_REGISTRY_ADDRESS,
      metricStoreAddress: env.NEXT_PUBLIC_APTAX_METRIC_STORE_ADDRESS,
      verifierAddress: env.NEXT_PUBLIC_APTAX_VERIFIER_ADDRESS,
    });
  } catch (error) {
    return Response.json(
      {
        configured: false,
        networkChainId: 0,
        registryAddress: "",
        metricStoreAddress: "",
        verifierAddress: "",
        error: error instanceof Error ? error.message : "Aptax config could not be loaded.",
      },
      { status: 503 }
    );
  }
}
