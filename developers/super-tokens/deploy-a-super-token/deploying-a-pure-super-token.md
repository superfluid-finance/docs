---
description: Deploying your own Super Token
---

# Deploying a Pure Super Token

{% hint style="info" %}
You can learn more about what Pure Super Tokens are [HERE](../types-of-super-tokens.md#2.-pure-super-tokens).
{% endhint %}

Anyone can deploy a Pure Super Token and add their own custom non-Superfluid logic. This guide will assist you with performing your deployment of a [governed](../types-of-super-tokens.md#governed-vs-independent) Pure Super Token.

## 1. Set Up the custom-supertokens Repo Locally

Follow the "Setup" in the README to get ready for development 👇

{% embed url="https://github.com/superfluid-finance/custom-supertokens#setup" %}

## 2. Select Logic

The main contract directory contains an assortment of examples of Pure Super Tokens contracts with common custom logic.

{% embed url="https://github.com/superfluid-finance/custom-supertokens/tree/main/contracts" %}

If none of those options fit the exact logic you are hoping for, then don't hesitate to copy down [PureSuperToken.sol](https://github.com/superfluid-finance/custom-supertokens/blob/main/contracts/PureSuperToken.sol) and begin working in your own logic.&#x20;

{% hint style="info" %}
If you do copy down PureSuperToken.sol, don't forget to rename the contract in the .sol file to something unique or you'll have an issue when building the contracts for deployment in the next step.
{% endhint %}

## 3. Deploy Pure Super Token

Make a .env file out of the [template](https://github.com/superfluid-finance/custom-supertokens/blob/main/.env.template) provided and fill out the appropriate fields for the network you intend to deploy on.

Then follow the "Deployment" steps in the README to deploy and verify your Pure Super Token 👇

{% embed url="https://github.com/superfluid-finance/custom-supertokens#deployment" %}
