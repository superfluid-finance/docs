---
description: Obtaining keys for super app deployment
---

# Super App Deployment Guide

Looking for instructions on how to deploy a super app? Check out our guide on github:

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/wiki/Super-App-White-listing-Guide" %}

Check out this thorough guide on mainnet deployment and forking from [omnifient](https://mobile.twitter.com/omnifient), a community contributor.

{% embed url="https://mirror.xyz/0x52EF1F3c4A1068d0079093cD2DCAe9eBE9Edcb8F/z2uHwWCZcphEnEHhDJ15UZGw_dMwm-uVD2Iy4Dp76M0" %}

## Deploying Upgradeable Super Apps

[Super Apps](https://docs.superfluid.finance/superfluid/protocol-overview/super-apps/super-app) allow for a tight integration with the protocol. As for now, only Super Apps approved by governance can be registered and thus become operational.

If you want to deploy a Super App to a mainnet, you can choose between 2 options for how to get it registered:

1. Request a _registration key_ tied to a _deployer account_. Such a key can be used repeatedly, but may eventually expire. Registration is done via `ISuperfluid.registerAppWithKey()`.
2. Provide the address of a _factory contract_ which gets permission to register an unlimited number of Super Apps. Registration is done via `ISuperfluid.registerAppByFactory()`.

You can find the interface description for the registration methods [here](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol).

In order to request a registration key or whitelisting of a factory contract, please [create a request issue](https://github.com/superfluid-finance/protocol-monorepo/issues/new?assignees=d10r\&labels=Type%3A+Help+Me\&template=new-superapp-deployment-key.md\&title=%5BDeployer+Whitelisting+Request%5D+) with the relevant information.

If requesting a registration key, please also provide an _deployer address_ you want to have it associated to. If requesting a factory whitelisting, please provide a link to the contract with verified source code on an Explorer or [sourcify](https://sourcify.dev/).

By choosing to take the `registerAppByFactory` route, you forgo the need to register via constructor and can make your Super Apps upgradeable.

