import hre from "hardhat";

import { syncDilixApp } from "./sync-dilix-app";

async function main() {
  const registryFactory = await hre.ethers.getContractFactory("AptaxRegistry");
  const registry = await registryFactory.deploy();
  await registry.waitForDeployment();

  const metricStoreFactory = await hre.ethers.getContractFactory("AptaxMetricStore");
  const metricStore = await metricStoreFactory.deploy(await registry.getAddress());
  await metricStore.waitForDeployment();

  const verifierFactory = await hre.ethers.getContractFactory("AptaxVerifier");
  const verifier = await verifierFactory.deploy(
    await registry.getAddress(),
    await metricStore.getAddress()
  );
  await verifier.waitForDeployment();
  await metricStore.setAuthorizedVerifier(await verifier.getAddress());

  const deployment = {
    network: hre.network.name,
    chainId: Number(hre.network.config.chainId ?? 0),
    registry: await registry.getAddress(),
    metricStore: await metricStore.getAddress(),
    verifier: await verifier.getAddress(),
  };

  await syncDilixApp(deployment);
  console.log(JSON.stringify(deployment, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
