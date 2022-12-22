---
description: High Level Protocol Concepts
---

# 💡 What is Superfluid?

## INTRODUCTION

Superfluid is a smart contract framework on EVM networks, enabling you to move assets on-chain following predefined rules called agreements. With a single on-chain transaction, the money will flow from your wallet to the receiver in real time! No further transactions required ✨

**Superfluid enables:**

💸 **Real money streaming** - Constant token flows on-chain with no capital lockups. Money steams will continue perpetually until cancellation or the senders balance runs out. Money streams can also have their stream rate updated at any time.

🎁 **Rewards distributions** - Fixed cost distribution in a single transaction for any number of receivers.

🔮 **Anything you can imagine** - Superfluid is very flexible!

**Superfluid Components:**

The current version of Superfluid is composed of the following key elements:

* _**Super Agreement Framework**_**:** a set of approved _super agreements_ contracts as building blocks.
* _**Super App Framework**_**:** a development framework for building real-time finance apps.
* _**Super Token Framework**_**:** an extended [ERC-777](https://eips.ethereum.org/EIPS/eip-777) implementation with real-time finance capability, and a registry.
* _**Batch Call & Meta Tx**_**:** for users (contracts or EOA) to interact with the system in batch on-chain, or off-chain through meta transactions.
* _**Governance**_**:** an external contract for managing protocol parameters and contract upgrades.
* _**Solvency Agents**_**:** an off-chain network of agents ensuring the solvency of the system. [Read more](../developers/super-tokens/super-tokens/)

{% hint style="info" %}
NOTE: we recommend using the [Superfluid Console](https://console.superfluid.finance) and the [Superfluid Dashboard](https://app.superfluid.finance) as you interact with the protocol.
{% endhint %}
