---
description: Advice for devs wanting to build secure applications on Superfluid
---

# Security Best Practices

## General

* We recommend what every good security expert would recommend: full test coverage, separation of concerns, using automated tools like Github actions, or using the Trail of Bits tools for fuzzing & static analysis
  * Guides like [this one from Consensys](https://consensys.github.io/smart-contract-best-practices/) can be helpful in understanding what to think about before deploying smart contracts to mainnet.
* Beyond this, we recommend that you continue to think about security & potential for loss of funds in the front end and off-chain components of your project (if you have them).&#x20;
  * For example, we highly recommend you adopt some of the same UX practices that we do in the[ Superfluid dashboard](https://app.superfluid.finance/) if you have a front end that allows people to create Superfluid streams
  * I.e. we let the user know that letting their balance hit zero before they close their stream will [lead to a liquidation](../../sentinels/liquidations-and-toga.md)

## Building Super Apps

* Be careful that your application does not get jailed unexpectedly.&#x20;
* We have detailed information here regarding the jail system and how to avoid a jailed Super App, but one of the most common reasons for a jailed super app is an unexpected revert in either the `beforeAgreementTerminated` or `afterAgreementTerminated` callbacks

## Custom Super Tokens

* In general, we advise sticking to the existing Super Token interfaces seen [here](https://github.com/superfluid-finance/protocol-monorepo/tree/dev/packages/ethereum-contracts/contracts/interfaces/tokens) unless you have a good reason not to
* If you want to deviate from this, we strongly encourage you to reach out to the Superfluid developer team in the #dev-support channel in our [Discord ](https://discord.superfluid.finance)

