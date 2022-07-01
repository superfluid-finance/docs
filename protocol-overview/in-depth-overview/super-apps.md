---
description: Making Super Agreements truly programmable
---

# Super Apps

## Definition

Super Apps are smart contracts that inherit Superfluid functionality giving them the ability to **react to Super Agreements**. Through callbacks, a Super App can "react" to the creating, updating, and deleting react with customized logic set in its smart contract code.

## **Reacting to Super Agreements**

**Callbacks** are what make Super Apps reactive. They are custom code that a developer can implement in a Super App that triggers when a Super Agreement to the Super App is created, updated, or deleted. This code could enact anything from minting an NFT to initiating a new CFA.&#x20;

### **Example - Stream Consolidator Super App**

A Super App, programmed to take all inbound flows to it and aggregate them into a single outbound flow to the designated Account Z, is deployed.&#x20;

**1.** Account A starts a CFA to the Super App of 100 USDCx/mo. _In reaction_, the Super App initiates an outbound CFA of 100 USDCx/mo. from itself to Account Z.

**2.** Account B starts a CFA to the Super App of 25 USDCx/mo and Account A updates its CFA to 50 USDCx/mo. The Super App reacts with the necessary flow update in its outbound CFA.

**3.** The Super App will continue to react appropriately as new accounts create, update, and delete CFAs to the Super App.&#x20;

{% hint style="info" %}
**NOTE**: While any smart contract can engage Super Agreements, a smart contract **must have callbacks defined** in order to be classified as a Super App.
{% endhint %}

## Why Are Super Apps Needed?

Since Super Apps can react to Super Agreements, they create an intermediate layer of programmability to Super Agreement's that wouldn't be possible with just wallet-to-wallet action.

As a result, applications can be made that mesh together custom logic with Super Agreements actions to create scalable dApps with innovative user experiences.

For instance, you could create a lending Super App where loan repayment is be done via CFA stream rather than manual and repetitive repayment transactions. Also, imagine a Super App supporting on-chain subscriptions paid through CFA streams with a built-in affiliate program that automatically redirects portions of subscription streams to referrers. The possibilities with Super Apps are endless!

For more inspiration, check out these Super App examples below :point\_down:

{% content-ref url="../../resources/examples.md" %}
[examples.md](../../resources/examples.md)
{% endcontent-ref %}
