import { expect } from "chai";
import { Encryptable, FheTypes } from "@cofhe/sdk";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import hre from "hardhat";
import type { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("Aptax Phase 1 contracts", function () {
  async function deploySuite() {
    const [founder, investor, outsider] = await hre.ethers.getSigners();

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

    const founderClient = await hre.cofhe.createClientWithBatteries(founder);
    const investorClient = await hre.cofhe.createClientWithBatteries(investor);
    const outsiderClient = await hre.cofhe.createClientWithBatteries(outsider);

    return {
      founder,
      investor,
      outsider,
      registry,
      metricStore,
      verifier,
      founderClient,
      investorClient,
      outsiderClient,
    };
  }

  async function expectDecryptFailure(
    signer: HardhatEthersSigner,
    promiseFactory: () => Promise<unknown>
  ) {
    try {
      await promiseFactory();
      expect.fail(`expected decrypt attempt by ${signer.address} to fail`);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
    }
  }

  it("lets a founder register a subject and store generic encrypted diligence metrics", async function () {
    const { founder, outsider, registry, metricStore, founderClient, outsiderClient } =
      await deploySuite();
    const subjectId = hre.ethers.id("startup:aptax-labs");
    const mrrMetricKey = hre.ethers.id("mrr");
    const cashMetricKey = hre.ethers.id("cash_balance");

    await expect(
      registry.connect(founder).registerSubject(subjectId, "ipfs://aptax-labs")
    )
      .to.emit(registry, "SubjectRegistered")
      .withArgs(subjectId, founder.address, "ipfs://aptax-labs");

    expect(await registry.subjectCount()).to.equal(1n);
    expect(await registry.listSubjectIds()).to.deep.equal([subjectId]);

    const [encryptedMrr] = await founderClient
      .encryptInputs([Encryptable.uint64(25000n)])
      .execute();

    await expect(metricStore.connect(founder).storeEncryptedMrr(subjectId, encryptedMrr))
      .to.emit(metricStore, "MetricStored")
      .withArgs(subjectId, mrrMetricKey, founder.address, anyValue);

    const [encryptedCash] = await founderClient
      .encryptInputs([Encryptable.uint64(320000n)])
      .execute();
    await expect(
      metricStore.connect(founder).storeEncryptedMetric(subjectId, cashMetricKey, encryptedCash)
    )
      .to.emit(metricStore, "MetricStored")
      .withArgs(subjectId, cashMetricKey, founder.address, anyValue);

    const metricRecord = await metricStore.getMetricRecord(subjectId, mrrMetricKey);
    expect(metricRecord.isSet).to.equal(true);
    expect(await metricStore.metricCountForSubject(subjectId)).to.equal(2n);
    expect(await metricStore.listMetricKeysForSubject(subjectId)).to.deep.equal([
      mrrMetricKey,
      cashMetricKey,
    ]);

    const founderView = await founderClient
      .decryptForView(metricRecord.handle, FheTypes.Uint64)
      .execute();
    expect(founderView).to.equal(25000n);

    await expectDecryptFailure(outsider, () =>
      outsiderClient.decryptForView(metricRecord.handle, FheTypes.Uint64).execute()
    );
  });

  it("computes bounded verification results for generic metrics and operator kinds", async function () {
    const {
      founder,
      investor,
      outsider,
      registry,
      metricStore,
      verifier,
      founderClient,
      investorClient,
      outsiderClient,
    } = await deploySuite();
    const subjectId = hre.ethers.id("startup:acme-growth");
    const mrrMetricKey = hre.ethers.id("mrr");
    const concentrationMetricKey = hre.ethers.id("customer_concentration_bps");

    await registry.connect(founder).registerSubject(subjectId, "ipfs://acme-growth");

    const [encryptedMrr] = await founderClient
      .encryptInputs([Encryptable.uint64(42000n)])
      .execute();
    await metricStore.connect(founder).storeEncryptedMrr(subjectId, encryptedMrr);

    const [encryptedConcentration] = await founderClient
      .encryptInputs([Encryptable.uint64(2500n)])
      .execute();
    await metricStore
      .connect(founder)
      .storeEncryptedMetric(subjectId, concentrationMetricKey, encryptedConcentration);

    await expect(
      verifier.connect(investor).createThresholdRequest(subjectId, mrrMetricKey, 30000, 0)
    )
      .to.emit(verifier, "VerificationComputed");

    await expect(
      verifier
        .connect(investor)
        .createThresholdRequest(subjectId, concentrationMetricKey, 3000, 1)
    ).to.emit(verifier, "VerificationComputed");

    const requestIds = await verifier.listRequestIdsForRequester(investor.address);
    const mrrRequest = await verifier.getVerificationRequest(requestIds[0]);
    const concentrationRequest = await verifier.getVerificationRequest(requestIds[1]);

    expect(mrrRequest.requester).to.equal(investor.address);
    expect(mrrRequest.metricKey).to.equal(mrrMetricKey);
    expect(mrrRequest.threshold).to.equal(30000);
    expect(mrrRequest.operatorKind).to.equal(0);
    expect(mrrRequest.status).to.equal(2);

    expect(concentrationRequest.metricKey).to.equal(concentrationMetricKey);
    expect(concentrationRequest.operatorKind).to.equal(1);

    const investorResult = await investorClient
      .decryptForView(mrrRequest.resultHandle, FheTypes.Bool)
      .execute();
    expect(investorResult).to.equal(true);

    const concentrationResult = await investorClient
      .decryptForView(concentrationRequest.resultHandle, FheTypes.Bool)
      .execute();
    expect(concentrationResult).to.equal(true);

    await expectDecryptFailure(outsider, () =>
      outsiderClient.decryptForView(mrrRequest.resultHandle, FheTypes.Bool).execute()
    );
  });

  it("keeps the MRR compatibility wrappers and returns false when a threshold check fails", async function () {
    const {
      founder,
      investor,
      outsider,
      registry,
      metricStore,
      verifier,
      founderClient,
      investorClient,
    } = await deploySuite();
    const subjectId = hre.ethers.id("startup:quiet-revenue");

    await registry.connect(founder).registerSubject(subjectId, "ipfs://quiet-revenue");

    const [encryptedMrr] = await founderClient
      .encryptInputs([Encryptable.uint64(9000n)])
      .execute();
    await metricStore.connect(founder).storeEncryptedMrr(subjectId, encryptedMrr);

    const [outsiderEncryptedMrr] = await founderClient
      .encryptInputs([Encryptable.uint64(12000n)])
      .execute();

    await expect(
      metricStore.connect(outsider).storeEncryptedMrr(subjectId, outsiderEncryptedMrr)
    )
      .to.be.revertedWithCustomError(metricStore, "NotSubjectOwner")
      .withArgs(subjectId, outsider.address);

    await verifier.connect(investor).createMrrThresholdRequest(subjectId, 10000);
    const [requestId] = await verifier.listRequestIdsForRequester(investor.address);
    const request = await verifier.getVerificationRequest(requestId);

    const investorResult = await investorClient
      .decryptForView(request.resultHandle, FheTypes.Bool)
      .execute();
    expect(investorResult).to.equal(false);
  });
});
