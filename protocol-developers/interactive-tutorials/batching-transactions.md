---
description: Batching transactions to improve your UX
---

# 👩🍳 Batching Transactions

## Creating a Batch Call

Another game changing feature of the Superfluid protocol is the ability to batch transactions together to improve the quality of UX for your users. We elaborate much more on batch calls inside of our [guide on the topic](../../resources/archived-tutorials-docs/batch-call.md). However, what you need to know for this interactive section is that batch calls can be created with the following operations:

| Type        |                 | Internal Call                                                                      |
| ----------- | --------------- | ---------------------------------------------------------------------------------- |
| Super Token | ISuperToken.sol | `operationApprove, operationTransferFrom, operationUpgrade`, `operationDowngrade`  |
| Agreement   | ISuperfluid.sol | `_callAgreement`                                                                   |
| Super App   | ISuperfluid.sol |  `_callAppAction`                                                                  |

In our example, we'll be focusing on a simple usage of batch calls: upgrading tokens to super tokens, and creating a flow in the same transaction. We'll achieve this by using the `operationUpgrade` super token call, and the `_callAgreement` call (to create the flow).

First, we'll need to approve the super token contract (in this case, fDAIx on Kovan) to spend our fDAI. Because this is an operation that is done outside of the Superfluid protocol on the ERC20 token contract, it cannot be batched.&#x20;

After the approval, you can enter the number of tokens you'd like to upgrade, and information about the flow you'd like to create and click the 2nd button to run your batch call. You'll be able to see the upgrade and createFlow operation happen in a single transaction (just check the console for details!)

{% embed url="https://codesandbox.io/embed/batch-calls-tdp4g?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FBatchCall.js&theme=dark&view=split" %}
Approve the DAI spend, then enter an upgrade amount and the receiver + flowRate for your stream
{% endembed %}

Keep in mind that this is a short example, you could run many upgrade operations & callAgreement operations in this single transaction if you wanted to.
