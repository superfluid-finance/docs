---
description: Immunefi Program and Links to Audits
---

# 🛡 Security & Bug Bounties

## Immunefi Bug Bounty Program

We have an [Immunefi](https://immunefi.com/bounty/superfluid/) bug bounty program with a maximum bounty of $100,000.

This program is focused on the protocol's smart contracts and is focused on preventing:

* Superfluid framework bugs
* Bugs in CFA/IDA in general
  * Anything that would avoid streams from being closed
  * Anything that would result in the sum of all account balances drifting significantly from the total supply
* Theft of tokens in third party wrapper contracts
* Other unexpected behavior in any super token contracts

**Learn more here:**

{% embed url="https://immunefi.com/bounty/superfluid/" %}

## Audit Resources

Superfluid has been audited on multiple occasions, you can find these past audit reports here:

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/tree/dev/packages/ethereum-contracts/audits" %}

## General Security Tips For Superfluid Developers

* We recommend what every good security expert would recommend: full test coverage, separation of concerns, and using automated tools like Github Actions or [Trail of Bits](https://blog.trailofbits.com/2018/03/23/use-our-suite-of-ethereum-security-tools/)' tools for fuzzing & static analysis
  * Guides like [this one from Consensys](https://consensys.github.io/smart-contract-best-practices/) can be helpful in understanding what to think about before deploying smart contracts to mainnet.
  * If you're looking for inspiration on setting up your own Github Actions pipelines, you can find a breakdown on Superfluid's own Github Actions setup [here](https://github.com/superfluid-finance/protocol-monorepo/wiki/Superfluid-GitHub-Actions-Deep-Dive)
* Beyond this, we recommend that you continue to think about security & potential for loss of funds in the front end and off-chain components of your project (if you have them).&#x20;
  * For example, we highly recommend you adopt some of the same UX practices that we do in the[ Superfluid dashboard](https://app.superfluid.finance/) if you have a front end that allows people to create Superfluid streams
  * I.e. we let the user know that letting their balance hit zero before they close their stream will [lead to a liquidation](../../sentinels/liquidations-and-toga.md)

### Security Tips for Building Super Apps

* Be careful that your application does not get jailed unexpectedly.&#x20;
* We have detailed information [here](https://docs.superfluid.finance/superfluid/developers/super-apps/super-app#super-app-rules-jail-system) regarding the jail system and how to avoid a jailed Super App, but one of the most common reasons for a jailed super app is an unexpected revert in either the `beforeAgreementTerminated` or `afterAgreementTerminated` callbacks

### Custom Super Tokens

* In general, we advise sticking to the existing Super Token interfaces seen [here](https://github.com/superfluid-finance/protocol-monorepo/tree/dev/packages/ethereum-contracts/contracts/interfaces/tokens) unless you have a good reason not to
* If you want to deviate from this, we strongly encourage you to reach out to the Superfluid developer team in the #dev-support channel in our [Discord ](https://discord.superfluid.finance)
