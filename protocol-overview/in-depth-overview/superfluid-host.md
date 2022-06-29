---
description: The "brain" of the Superfluid Protocol
---

# Superfluid Host

## Definition

The Superfluid Host Contract is the centerpiece of the Superfluid Protocol which connects Super Tokens, Super Agreements, and Super Apps. It works like a conduit for information throughout the Superfluid Protocol.

![](<../../.gitbook/assets/image (68).png>)

That looks complicated. Let's break down the basic linkages from core pieces of the Superfluid Protocol to the Host contract :point\_down:****

## Super Agreements 🔗 Host Contract

Super Agreements are modular and house their logic in their own individual contracts that are connected to the Host Contract. Calling a Super Agreement means calling [`callAgreement()`](https://docs.superfluid.finance/superfluid/developers/solidity-examples/interacting-with-superfluid-smart-contracts) on the Host Contract with a chosen Super Agreement and parameters.

As a result, Super Agreements can be upgraded and new Super Agreements can be developed and registered to the Host Contract.

{% hint style="info" %}
**NOTE**: Accounts do NOT actually interact with the Super Token contract when calling a Super Agreement. Accounts call Super Agreements through the Host Contract, which in turn enacts the agreement's functionality upon the Super Token balances of the accounts involved.
{% endhint %}

## Super Tokens 🔗 Host Contract

Super Tokens are essentially the base of the Superfluid Protocol where all the Super Agreement information for an account is aggregated.

Through a Super Token contract, the effects of each Super Agreement (CFA & IDA) on the balance of an account is combined to return the account's Super Token balance.

The Super Token grabs this information through the Host contract by iterating across the list of Super Agreements registered with the Host.&#x20;

## Super Apps 🔗 Host Contract

Super Apps must be registered with the Superfluid Host in order to activate callback logic. Once deployed and registered, when an account engages a Super Agreement to a Super App, the Host will trigger the Super App's callback functionality.

![](<../../.gitbook/assets/image (58).png>)
