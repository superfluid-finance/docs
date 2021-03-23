# Super Tokens

## Stream Liquidation and Solvency

Here's the general flow of solvency states for Super Tokens in a Constant Flow Agreement. 

#### **1.** **Solvent**

Everyone is in good standing. The sender's balance shows greater than 0 on the dashboard. The  stream flows to the receiver. 

#### **2. Critical**

The sender's balance shows 0 on the dashboard, and the stream is now able to be closed by a Licensed Agent. Until the stream is actually closed, funds are paid to the receiver's wallet using the sender's initial deposit. Licensed agents are incentivized to close the stream as soon as possible, since they earn the remaining balance of the sender's deposit. 

Technically, anyone can close stream during the Critical or Insolvent states, however only Licensed Agents can receive deposit rewards.

#### **3. Insolvent**

If the Licensed Agent has not closed the stream, and the deposit has been completely consumed,  then the Insolvent state begins. The stream will continue to the receiver, however since these tokens don't actually exist in the sender's wallet, we must keep track of this debt so that the Super Token itself can remain solvent within the Superfluid Protocol. We call this debt the "**Delay**". 

Once the Licensed Agent, or anyone closes the stream, the Delay is taken from their Bond as a slashing fee. This slashing fee is then burned, to offset the tokens created during insolvency.

