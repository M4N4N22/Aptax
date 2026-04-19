hey everyone! quick update and a gentle reminder — our old decrypt flow (FHE.decrypt()) is now deprecated as of April 13th 2026.
the new setup uses two decrypt paths:
→ decryptForView — for showing values in the UI (off-chain, requires permit)
→ decryptForTx — for publishing values on-chain (returns signature, then call FHE.publishDecryptResult())
also if you’re still on cofhejs, you’ll need to migrate to @cofhe/sdk — it’s a different package with updated APIs.
migration docs here: https://cofhe-docs.fhenix.zone/client-sdk/introduction/migrating-from-cofhejs
book a time on my cal if you’d like technical support with the migration process :)

Fhenix Documentation (https://cofhe-docs.fhenix.zone/client-sdk/introduction/migrating-from-cofhejs)
Migrating from cofhejs - Fhenix Documentation
Side-by-side migration guide from cofhejs to @cofhe/sdk

> ## Documentation Index
> Fetch the complete documentation index at: https://cofhe-docs.fhenix.zone/llms.txt
> Use this file to discover all available pages before exploring further.

# Migrating from cofhejs

> Side-by-side migration guide from cofhejs to @cofhe/sdk

`@cofhe/sdk` is the successor to `cofhejs`, redesigned around an explicit, builder-pattern API that gives you full control over encryption, decryption, and permit management.

### Why migrate?

* **Explicit API** — no more implicit initialization or auto-generated permits. Every action is opt-in.
* **Builder pattern** — `encryptInputs`, `decryptForView`, and `decryptForTx` use a chainable builder so you can set overrides (account, chain, callbacks) before calling `.execute()`.
* **`decryptForTx` feature** — `cofhejs` does not provide an API for generating decryption signatures for on-chain usage.
* **Deferred key loading** — FHE keys and TFHE WASM are fetched lazily on the first `encryptInputs` call, not during initialization.
* **Better multichain support** — configure multiple chains up front and override per-call.
* **Structured errors** — typed `CofheError` objects with error codes replace the `Result` wrapper.

### Requirements

* Node.js 18+
* TypeScript 5+
* Viem 2+

### Installation

Remove `cofhejs` and install `@cofhe/sdk`:

```bash theme={null}
npm uninstall cofhejs && npm install @cofhe/sdk
```

## 1. Initialization

The single `cofhejs.initializeWithEthers(...)` / `cofhejs.initializeWithViem(...)` call is replaced by a three-step flow: create a config, create a client, then connect. FHE keys and WASM are no longer fetched eagerly during init — they are deferred until the first `encryptInputs` call.

<Accordion title="Changes">
  |                     | `cofhejs`                                                               | `@cofhe/sdk`                                                                   |
  | ------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
  | **Entry**           | `cofhejs.initializeWithEthers(...)` / `cofhejs.initializeWithViem(...)` | `createCofheConfig(...)` → `createCofheClient(config)` → `client.connect(...)` |
  | **Key fetching**    | Immediate (during init)                                                 | Deferred (first `encryptInputs` call)                                          |
  | **WASM init**       | Immediate (during init)                                                 | Deferred (first `encryptInputs` call)                                          |
  | **Environment**     | `"LOCAL"` / `"TESTNET"` / `"MAINNET"` string                            | Chain objects via `supportedChains: [chains.sepolia]`                          |
  | **Provider format** | Ethers provider/signer or viem clients                                  | Always viem clients (use adapters for ethers)                                  |
</Accordion>

### Before (cofhejs)

<CodeGroup>
  ```typescript Ethers theme={null}
  import { cofhejs } from 'cofhejs/node';

  await cofhejs.initializeWithEthers({
    ethersProvider: provider,
    ethersSigner: signer,
    environment: 'TESTNET',
  });
  ```

  ```typescript Viem theme={null}
  import { cofhejs } from 'cofhejs/web';

  await cofhejs.initializeWithViem({
    viemClient: publicClient,
    viemWalletClient: walletClient,
    environment: 'TESTNET',
  });
  ```
</CodeGroup>

### After (@cofhe/sdk)

<CodeGroup>
  ```typescript Web (viem) theme={null}
  import { createCofheConfig, createCofheClient } from '@cofhe/sdk/web';
  import { chains } from '@cofhe/sdk/chains';

  const config = createCofheConfig({
    supportedChains: [chains.sepolia],
  });
  const client = createCofheClient(config);

  await client.connect(publicClient, walletClient);
  ```

  ```typescript Node (viem) theme={null}
  import { createCofheConfig, createCofheClient } from '@cofhe/sdk/node';
  import { chains } from '@cofhe/sdk/chains';

  const config = createCofheConfig({
    supportedChains: [chains.sepolia],
  });
  const client = createCofheClient(config);

  await client.connect(publicClient, walletClient);
  ```

  ```typescript Ethers v6 (via adapter) theme={null}
  import { createCofheConfig, createCofheClient } from '@cofhe/sdk/web';
  import { Ethers6Adapter } from '@cofhe/sdk/adapters';
  import { chains } from '@cofhe/sdk/chains';

  const config = createCofheConfig({
    supportedChains: [chains.sepolia],
  });
  const client = createCofheClient(config);

  const { publicClient, walletClient } = await Ethers6Adapter(
    provider,
    signer
  );
  await client.connect(publicClient, walletClient);
  ```
</CodeGroup>

## 2. Encrypting inputs

`cofhejs.encrypt(...)` is replaced by a builder: `client.encryptInputs([...]).execute()`.

<Accordion title="Changes">
  |                       | `cofhejs`                                        | `@cofhe/sdk`                                                 |
  | --------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
  | **Function**          | `cofhejs.encrypt([...], callback)`               | `client.encryptInputs([...]).execute()`                      |
  | **Return value**      | `Result<T>` with `.success` / `.data` / `.error` | Direct value (throws `CofheError` on failure)                |
  | **Progress callback** | Second argument to `encrypt`                     | `.onStep(callback)` on the builder                           |
  | **Overrides**         | Not available                                    | `.setAccount(...)`, `.setChainId(...)`, `.setUseWorker(...)` |
</Accordion>

### Before (cofhejs)

```typescript theme={null}
import { cofhejs, Encryptable } from 'cofhejs/node';

const result = await cofhejs.encrypt(
  [Encryptable.uint64(42n), Encryptable.bool(true)],
  (state) => console.log(state)
);

if (!result.success) {
  console.error(result.error);
  return;
}

const [eAmount, eFlag] = result.data;
```

### After (@cofhe/sdk)

```typescript theme={null}
import { Encryptable, EncryptStep } from '@cofhe/sdk';

const [eAmount, eFlag] = await client
  .encryptInputs([Encryptable.uint64(42n), Encryptable.bool(true)])
  .onStep((step, ctx) => {
    if (ctx?.isStart) console.log(`Starting: ${step}`);
  })
  .execute();
```

<Note>
  The `Encryptable` factory functions (`Encryptable.uint32(...)`, `Encryptable.bool(...)`, etc.) work the same way in both libraries.
</Note>

## 3. Decrypting / Unsealing

`cofhejs` has a single `unseal` function. `@cofhe/sdk` splits decryption into two purpose-built methods:

* **`decryptForView`** — returns the plaintext for UI display (no on-chain signature).
* **`decryptForTx`** — returns the plaintext **and** a Threshold Network signature for on-chain verification.

<Accordion title="Changes">
  |                           | `cofhejs`                             | `@cofhe/sdk`                                                           |
  | ------------------------- | ------------------------------------- | ---------------------------------------------------------------------- |
  | **Function**              | `cofhejs.unseal(sealed, type)`        | `client.decryptForView(ctHash, type)` or `client.decryptForTx(ctHash)` |
  | **Permit handling**       | Automatic (uses most recent permit)   | Explicit — `.withPermit()` / `.withoutPermit()`                        |
  | **Return value**          | `Result<bigint \| boolean \| string>` | Direct value for view; `{ ctHash, decryptedValue, signature }` for tx  |
  | **On-chain verification** | Not built in                          | `decryptForTx` returns a signature for `FHE.publishDecryptResult(...)` |
</Accordion>

### Before (cofhejs)

```typescript theme={null}
import { cofhejs, FheTypes } from 'cofhejs/node';

const sealedBalance = await contract.getBalance();
const result = await cofhejs.unseal(sealedBalance, FheTypes.Uint64);

if (!result.success) {
  console.error(result.error);
  return;
}

console.log(result.data); // bigint
```

### After (@cofhe/sdk) — viewing in UI

```typescript theme={null}
import { FheTypes } from '@cofhe/sdk';

const ctHash = await contract.getBalance();

const balance = await client
  .decryptForView(ctHash, FheTypes.Uint64)
  .execute();
```

### After (@cofhe/sdk) — publishing on-chain

<CodeGroup>
  ```typescript TypeScript theme={null}
  const ctHash = await myContract.getEncryptedAmount();

  const { decryptedValue, signature } = await client
    .decryptForTx(ctHash)
    .withoutPermit()
    .execute();

  await myContract.publishDecryptResult(ctHash, decryptedValue, signature);
  ```

  ```solidity MyContract.sol theme={null}
  import '@fhenixprotocol/cofhe-contracts/FHE.sol';

  contract MyContract {
      euint64 private _encryptedAmount;

      function publishDecryptResult(
          euint64 ctHash,
          uint64 plaintext,
          bytes calldata signature
      ) external {
          FHE.publishDecryptResult(ctHash, plaintext, signature);
      }
  }
  ```
</CodeGroup>

## 4. Permits

Permits are no longer auto-generated during initialization. All permit operations are now explicit through `client.permits`.

<Accordion title="Changes">
  |                     | `cofhejs`                                | `@cofhe/sdk`                                                                 |
  | ------------------- | ---------------------------------------- | ---------------------------------------------------------------------------- |
  | **Auto-generation** | `generatePermit: true` (default)         | Never — always explicit                                                      |
  | **Creation**        | `cofhejs.createPermit({ type, issuer })` | `client.permits.createSelf(...)`, `client.permits.createSharing(...)`        |
  | **Return type**     | `Result<Permit>`                         | Direct `Permit` object                                                       |
  | **Active permit**   | Implicitly used by `unseal`              | `getOrCreateSelfPermit()` sets active; used automatically by decrypt methods |
</Accordion>

### Before (cofhejs)

```typescript theme={null}
await cofhejs.initializeWithEthers({
  ethersProvider: provider,
  ethersSigner: signer,
  environment: 'TESTNET',
  // generatePermit: true  ← default
});

const result = await cofhejs.createPermit({
  type: 'self',
  issuer: wallet.address,
});
```

### After (@cofhe/sdk)

```typescript theme={null}
// Create a self permit (prompts for wallet signature)
const permit = await client.permits.createSelf({
  issuer: account,
  name: 'My dApp permit',
});

// Or use the convenience method that creates one only if needed
const permit2 = await client.permits.getOrCreateSelfPermit();

// Use with decryptForView (active permit is used automatically)
const value = await client
  .decryptForView(ctHash, FheTypes.Uint32)
  .execute();
```

## 5. Error handling

### Before (cofhejs)

```typescript theme={null}
const result = await cofhejs.encrypt([Encryptable.uint32(42n)]);

if (!result.success) {
  console.error('Failed:', result.error); // string
  return;
}

const encrypted = result.data;
```

### After (@cofhe/sdk)

```typescript theme={null}
import { isCofheError, CofheErrorCode } from '@cofhe/sdk';

try {
  const encrypted = await client
    .encryptInputs([Encryptable.uint32(42n)])
    .execute();
} catch (err) {
  if (isCofheError(err)) {
    console.error(err.code);    // CofheErrorCode enum
    console.error(err.message); // human-readable message
  }
}
```

## 6. Import path changes

| `cofhejs`      | `@cofhe/sdk`                                         |
| -------------- | ---------------------------------------------------- |
| `cofhejs/node` | `@cofhe/sdk/node`                                    |
| `cofhejs/web`  | `@cofhe/sdk/web`                                     |
| N/A            | `@cofhe/sdk` (core types, `Encryptable`, `FheTypes`) |
| N/A            | `@cofhe/sdk/permits`                                 |
| N/A            | `@cofhe/sdk/adapters`                                |
| N/A            | `@cofhe/sdk/chains`                                  |

## 7. Type renames

| `cofhejs`        | `@cofhe/sdk`            |
| ---------------- | ----------------------- |
| `CoFheInItem`    | `EncryptedItemInput`    |
| `CoFheInBool`    | `EncryptedBoolInput`    |
| `CoFheInUint8`   | `EncryptedUint8Input`   |
| `CoFheInUint16`  | `EncryptedUint16Input`  |
| `CoFheInUint32`  | `EncryptedUint32Input`  |
| `CoFheInUint64`  | `EncryptedUint64Input`  |
| `CoFheInUint128` | `EncryptedUint128Input` |
| `CoFheInAddress` | `EncryptedAddressInput` |
