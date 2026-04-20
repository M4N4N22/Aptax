import fs from "node:fs/promises";
import path from "node:path";

type DeploymentRecord = {
  network: string;
  chainId: number;
  registry: string;
  metricStore: string;
  verifier: string;
};

const rootDir = path.resolve(__dirname, "..");
const appDir = path.resolve(rootDir, "..", "dilix-next-app");
const appLibDir = path.join(appDir, "lib", "aptax");
const deploymentsDir = path.join(rootDir, "deployments");

async function readArtifact(contractName: string, sourceName: string) {
  const artifactPath = path.join(
    rootDir,
    "artifacts",
    "contracts",
    sourceName,
    `${contractName}.json`
  );
  const artifactRaw = await fs.readFile(artifactPath, "utf8");
  return JSON.parse(artifactRaw) as { abi: unknown[] };
}

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function syncGeneratedAbis() {
  const registryArtifact = await readArtifact("AptaxRegistry", "AptaxRegistry.sol");
  const metricStoreArtifact = await readArtifact("AptaxMetricStore", "AptaxMetricStore.sol");
  const verifierArtifact = await readArtifact("AptaxVerifier", "AptaxVerifier.sol");

  const generatedPath = path.join(appLibDir, "abis.generated.ts");
  const fileContents = `export const aptaxRegistryAbi = ${JSON.stringify(registryArtifact.abi, null, 2)} as const;

export const aptaxMetricStoreAbi = ${JSON.stringify(metricStoreArtifact.abi, null, 2)} as const;

export const aptaxVerifierAbi = ${JSON.stringify(verifierArtifact.abi, null, 2)} as const;
`;

  await ensureDir(appLibDir);
  await fs.writeFile(generatedPath, fileContents);
}

async function syncDeploymentManifest(deployment: DeploymentRecord) {
  await ensureDir(deploymentsDir);

  const deploymentPath = path.join(deploymentsDir, `${deployment.network}.json`);
  await fs.writeFile(deploymentPath, `${JSON.stringify(deployment, null, 2)}\n`);

  const appDeploymentPath = path.join(appLibDir, "deployments.generated.json");
  let existing: Record<string, DeploymentRecord> = {};

  try {
    existing = JSON.parse(await fs.readFile(appDeploymentPath, "utf8")) as Record<
      string,
      DeploymentRecord
    >;
  } catch {}

  existing[deployment.network] = deployment;
  await fs.writeFile(appDeploymentPath, `${JSON.stringify(existing, null, 2)}\n`);
}

export async function syncDilixApp(deployment?: DeploymentRecord) {
  await syncGeneratedAbis();

  if (deployment) {
    await syncDeploymentManifest(deployment);
  }
}

if (require.main === module) {
  const deploymentArg = process.argv[2];
  const deployment = deploymentArg
    ? (JSON.parse(deploymentArg) as DeploymentRecord)
    : undefined;

  syncDilixApp(deployment).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
