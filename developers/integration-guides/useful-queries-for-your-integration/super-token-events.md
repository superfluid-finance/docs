---
description: Query Super Token Event Data
---

# Super Token Events

## Super Token Events

`Transfer`: emitted when super tokens are transferred. Will _decrement_ the super token balance of the from address (ie. the same as ERC20 transfer).

**Solidity Event:**

<figure><img src="../../../.gitbook/assets/Screen Shot 2022-11-29 at 9.58.15 AM.png" alt=""><figcaption><p>This comes directly from the Open Zeppelin IERC20 implementation that Super Tokens inherit from</p></figcaption></figure>

**Sample Subgraph Query:**

```graphql
#get DAIx transfer events on goerli where "0xdcb..." is the sender  
query MyQuery {
  transferEvents(
    where: {from: "0xdcb45e4f6762c3d7c61a00e96fb94adb7cf27721", token: "0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00"}
  ) {
    timestamp
    to {
      id
    }
    value
    transactionHash
  }
}
```

`tokenUpgraded`: emitted when tokens are upgraded (i.e. wrapped). This will _increment_ a user’s super token balance and _decrement_ a user’s balance in the underlying token

[**Solidity Event:**](https://github.com/superfluid-finance/protocol-monorepo/blob/ace5c3186a8880df0e8d9f99db0d02c6fc941ae1/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol#L383)

<figure><img src="../../../.gitbook/assets/Screen Shot 2022-11-29 at 9.59.13 AM.png" alt=""><figcaption></figcaption></figure>

**Sample Subgraph Query:**

```graphql
#query that will return all emitted DAIx upgrade events for "0xdcb…" on goerli
query MyQuery {
  tokenUpgradedEvents(
    where: {account: "0xdcb45e4f6762c3d7c61a00e96fb94adb7cf27721", token: "0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00"}
  ) {
    timestamp
    amount
  }
}
```

`tokenDowngraded`: emitted when tokens are downgraded (i.e. unwrapped). This will _decrement_ a user’s super token balance, and _increment_ their balance of the underlying token

[**Solidity Event:**](https://github.com/superfluid-finance/protocol-monorepo/blob/ace5c3186a8880df0e8d9f99db0d02c6fc941ae1/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol#L400)

<figure><img src="../../../.gitbook/assets/Screen Shot 2022-11-29 at 9.59.45 AM.png" alt=""><figcaption></figcaption></figure>

**Sample Subgraph Query:**

```graphql
#query that will return all emitted DAIx downgrade events for "0xdcb…" on goerli
query MyQuery {
  tokenDowngradedEvents(
    where: {account: "0xdcb45e4f6762c3d7c61a00e96fb94adb7cf27721", token: "0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00"}
  ) {
    timestamp
    amount
  }
}
```
