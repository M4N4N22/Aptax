# Aptax Phase 1 Platform Notes

## Aptax vs. Fhenix

Aptax owns the product workflow, contract boundaries, app routes, and the future public surface area.
Fhenix owns encrypted inputs, permits, encrypted computation, and `decryptForView`.

Phase 1 keeps that split explicit:

* `fhenix-contracts/` contains the encrypted verification core.
* `next-app/` contains the first-party product and backend-facing orchestration.
* Browser code handles wallet signing, client-side encryption, permits, and UI-bound decrypts.

## Future API shape

The internal app API now mirrors a future Aptax API without introducing a relayer:

* `POST /api/aptax/subjects`
  prepares subject registration calldata
* `POST /api/aptax/subjects/[subjectId]/metric`
  prepares encrypted MRR storage calldata
* `POST /api/aptax/subjects/[subjectId]/requests`
  prepares threshold verification calldata
* `GET /api/aptax/requests/[requestId]`
  returns request status and bounded-result metadata
* `GET /api/aptax/subjects`
  lists registered subjects
* `GET /api/aptax/subjects/[subjectId]/requests`
  lists request history for a subject

If Aptax adds delegated auth later, these prepared-transaction endpoints can evolve into submit-and-track endpoints without changing the product vocabulary.

## Future SDK shape

`next-app/lib/aptax/client.ts` is the current thin internal SDK layer.

Useful future public method names are already visible:

* `createBrowserSession()`
* `ensureSubjectRegistered()`
* `storeFounderMrr()`
* `requestThresholdVerification()`
* `getSubjects()`
* `getSubjectRequests()`
* `getVerificationRequest()`

Phase 2 can split these into public browser and server packages if the platform surfaces become external.

## Future MCP shape

A future Aptax MCP layer should orchestrate Aptax primitives, not replace Fhenix primitives.

Good future MCP capabilities:

* list subjects
* inspect verification request history
* prepare founder or investor workflow steps
* explain bounded verification outcomes

It should not bypass the wallet-owned encryption, permit, or decrypt flows that belong to the user and the Fhenix stack.
