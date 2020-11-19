---
description: One-liners to keep you "in the flow".
---

# Cheat Sheet

![](.gitbook/assets/image%20%283%29.png)

## Quick-start

Setup the SDK in Truffle console and mint DAIx. See the [tutorial](https://superfluid.gitbook.io/superfluid/protocol-tutorials/create-a-superfluid-flow) for a full walk-through.

```text
npx truffle --network goerli console
# Then in console
exec ../test-scripts/console-quick-start.js
```

## Tokens

**`balanceOf()`**

```text
(await daix.balanceOf(bob)).toString() / 1e18
(await dai.balanceOf(bob)).toString() / 1e18
```

**`upgrade()`**

```text
dai.approve(daix.address, "1"+"0".repeat(42), { from: bob })
daix.upgrade(web3.utils.toWei("50", "ether"), { from: bob })
```

**`deleteFlow()`**

```text
sf.host.callAgreement(sf.agreements.cfa.address, sf.agreements.cfa.contract.methods.deleteFlow(daix.address, bob, alice, "0x").encodeABI(), { from: bob })
```

**`getNetFlow()`**

```text
(await sf.agreements.cfa.getNetFlow(daix.address, bob)).toString() / 1e18
```

## Instant Distributions

**`createIndex()`** \(sent from _publisher\)_

```text
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.createIndex(daix.address, 42, "0x").encodeABI(), { from: bob })
```

**`updateSubscription()`** \(sent from _publisher\)_

```text
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.updateSubscription(daix.address, 42, dan, 100, "0x").encodeABI(), { from: bob })
```

**`approveSubscription()`** \(sent from _subscriber\)_

```text
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.approveSubscription(daix.address, bob, 42, "0x").encodeABI(), { from: alice })
```

**`updateIndex()`** \(sent from _publisher\)_

```text
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.updateIndex(daix.address, 42, web3.utils.toWei("0.01", "ether"), "0x").encodeABI(), { from: bob })
```

**`claim()`** \(sent from _subscriber\)_

```text
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.claim(daix.address, bob, 42, "0x").encodeABI(), { from: dan })
```

## Agreements

### Constant Flow Agreement \(CFA\) <a id="constant-flow-agreement-cfa"></a>

A **Constant Flow Agreement** is a transfer of value from a `sender` to a `receiver` at a constant `flowRate` measured in _amount per second_.

### Instant Distribution Agreement \(IDA\) <a id="instant-distribution-agreement-ida"></a>

An **Instant Distribution Agreement \(IDA\)** is used to send funds as one-time-payments. It consists of a **Publishing Index** with `indexId`, an `indexValue`, and one or more **subscribers**.  










