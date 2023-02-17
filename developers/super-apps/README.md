---
description: Building Programmable Cashflows
---

# 🤖 Super Apps

### **What is a Super App?**

Super Apps allow us to build smart contracts that are fully integrated with Superfluid at the protocol level.&#x20;

If you've looked at our[ Tradeable Cashflow](https://github.com/superfluid-finance/super-examples/tree/main/projects/tradeable-cashflow) tutorial or our [User Data](https://docs.superfluid.finance/superfluid/docs/user-data) tutorial, we are using a Super App in each of those sample applications.

![The Tradeable Cashflow NFT](<../../.gitbook/assets/image (30) (1).png>)

For example, the tradeable cashflow NFT contract receives a stream, and then uses special callbacks within the SuperApp to automatically open up a new stream from the NFT to the owner of the NFT.&#x20;

The contract 'listens' for a call to a Superfluid super agreement contract (in this example, the Constant Flow Agreement contract), and runs a single callback function in response to the following 3 actions:

1. A flow is opened with the Super App as the `receiver`
2. A flow is updated which has the Super App as the `receiver`
3. A flow is closed by the Super App's counter party (i.e. if either the _sender_ of a flow into the Super app or the _recipient_ of a flow from the Super App deleted the flow, a callback will be run). As of today, this is only relevant for the case of canceled flows.

When a stream is created into a Super App, the `beforeAgreementCreated` and the `afterAgreementCreated` callback may be run. These callbacks can execute any arbitrary logic, as long as this logic fits within the rules of standard smart contract development and the rules of Super Apps (which are explained further later on in this section).

In the case of the tradable cashflow contract, the logic we include inside of the `afterAgreementCreated` callback will open up a money stream from the app to the NFT's owner in an amount that is equal to the `flowRate` into the app.

Super Apps like the tradable cashflow example keep their callback logic simple, while others get more advanced and leverage items like `userData` for additional functionality.

Some of the most interesting projects in our ecosystem, such as Ricochet Exchange, make heavy use of Super App callbacks.
