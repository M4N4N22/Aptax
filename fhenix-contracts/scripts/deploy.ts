import hre from "hardhat";

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
    registry: await registry.getAddress(),
    metricStore: await metricStore.getAddress(),
    verifier: await verifier.getAddress(),
  };

  console.log(JSON.stringify(deployment, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
