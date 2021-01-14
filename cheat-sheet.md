---
description: One-liners to keep you "in the flow".
---

# Cheat Sheet

![](.gitbook/assets/image%20%283%29.png)

#### Quick-start

Setup the SDK in Truffle console and mint DAIx. See the [tutorial](https://github.com/superfluid-finance/superfluid-protocol-docs/tree/c0acd5ac6cab2baecb39b5b01b35daa9f175c468/tutorial/create-a-flow/README.md) for a full walk-through.

```javascript
npx truffle --network goerli conole
# Then in console
exec ../test-scripts/console-quick-start.js
```

#### Tokens

**`balanceOf()`**

```text
(await daix.balanceOf(bob)).toString() / 1e18
(await dai.balanceOf(bob)).toString() / 1e18

or

(async () => wad4human(await dai.balanceOf(bob))()
(async () => wad4human(await daix.balanceOf(bob))()

```

**`upgrade()`**

```javascript
dai.approve(daix.address, "1" + "0".repeat(42), { from: bob });
daix.upgrade(web3.utils.toWei("50", "ether"), { from: bob });
```

#### User object

**`user()`**

```javascript
const bob = sf.user({ address: bobAddress, token: daix.address });
const alice = sf.user({ address: aliceAddress, token: daix.address });
```

**`bob.details()`**

```javascript
const details = await bob.details();

// returns an object
details: {
    cfa: {
        flows: {
            inFlows: [
                { sender, receiver, flowRate }
            ],
            outFlows: [
                { sender, receiver, flowRate }
            ]
        },
        netFlow: ""
    }
    ida: {
        subscriptions: []
    }
```

**`bob.flow()`**

```javascript
// create new flow
bob.flow({ recipient: alice, flowRate: "-38580246913580" }); //recipient can be user object or address

// edit existing flow
bob.flow({ recipient: alice.address, flowRate: 0.1 * 1e18 }); //0.1 DAI per second with 18 decimals.

// close flow
bob.flow({ recipient: alice, flowRate: "0" });

// add custom userData parameters
const userData = { message: "here's a flow Alice", flowId: "007" };
bob.flow({ recipient: alice, flowRate: 1 * 1e18, options: { userData } });
```

**`bob.createPool()`**

```js
await bob.createPool({ poolId: 1 });
```

**`bob.giveShares()`**

```js
await bob.giveShares({ poolId: 1, recipient: alice, shares: 90 });
await bob.giveShares({ poolId: 1, recipient: carol, shares: 10 });
```

**`bob.distributeToPool()`**

```js
await bob.distributeToPool({ poolId: 1, amount: 1000 });
```

#### Flows

**`createFlow()`**

```javascript
sf.cfa.createFlow({
  superToken: daix.address,
  sender: bob,
  receiver: alice,
  flowRate: "385802469135802"
});
```

**`updateFlow()`**

```javascript
sf.cfa.createFlow({
  superToken: daix.address,
  sender: bob,
  receiver: alice,
  flowRate: "632802469135333"
});
```

**`deleteFlow()`**

```text
sf.cfa.deleteFlow({superToken: daix.address, sender: bob, receiver: alice, by: bob})
```

**`getNetFlow()`**

```text
(await sf.cfa.getNetFlow({superToken: daix.address, account: bob})).toString()
```

**`getFlow()`**

```text
(await sf.cfa.getFlow({superToken: daix.address, sender: bob, receiver: alice})).toString()
```

**`listFlows()`**

```text
await sf.cfa.listFlows({superToken: daix.address, account: bob})
```

#### Instant Distributions

**`createIndex()`** \(sent from _publisher\)_

```text
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.createIndex(daix.address, 42, "0x").encodeABI(), "0x", { from: bob })
```

**`updateSubscription()`** \(sent from _publisher\)_

```text
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.updateSubscription(daix.address, 42, dan, 100, "0x").encodeABI(), "0x", { from: bob })
```

**`approveSubscription()`** \(sent from _subscriber\)_

```text
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.approveSubscription(daix.address, bob, 42, "0x").encodeABI(), "0x", { from: alice })
```

**`updateIndex()`** \(sent from _publisher\)_

```text
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.updateIndex(daix.address, 42, web3.utils.toWei("0.01", "ether"), "0x").encodeABI(), "0x", { from: bob })
```

**`claim()`** \(sent from _subscriber\)_

```text
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.claim(daix.address, bob, 42, dan, "0x").encodeABI(), "0x", { from: dan })
```

## Agreements

### Constant Flow Agreement \(CFA\)

A **Constant Flow Agreement** is a transfer of value from a `sender` to a `receiver` at a constant `flowRate` measured in _amount per second_.

### Instant Distribution Agreement \(IDA\)

An **Instant Distribution Agreement \(IDA\)** is used to send funds as one-time-payments. It consists of a **Publishing Index** with `indexId`, an `indexValue`, and one or more **subscribers**.
