---
description: Manage Flows and IDAs using a smart contract
---

# 🦾 Super Apps

A Super App can "manage" agreements and respond to changes. This is where you can write your own custom logic/behavior. In this section we will deploy a new Super App using Remix. Our app will accept incoming CFA flows, and use the smart contract logic to determine where to redirect it. 

![](../.gitbook/assets/image%20%2812%29.png)

## Prerequisites

Before starting this tutorial you should: 

* Have some goerli ETH and tokens in your wallet from the dashboard [https://app.superfluid.finance](https://app.superfluid.finance)

## Setup

Click the link to load the contracts in Remix:

{% embed url="https://remix.ethereum.org/\#gist=2d2c1e51a21ff5496c69397454c1eee5&call=fileManager//open//browser/gists/2d2c1e51a21ff5496c69397454c1eee5/TradeableCashflow.sol" caption="Holy Grail Super App" %}

Once it loads, you should see `TradeableCashflow.sol` in the editor window. 

![](../.gitbook/assets/image%20%281%29.png)

Open the gist in the file explorer to see all the contracts. `TradeableCashflow.sol` is our main contract, which inherits `RedirectAll` from the local file, and the `ERC721` contract from the  Open Zeppelin Github repo.

The main components of this contract is:

1. We create a new ERC721 and mint a single NFT 
2. Whenever we transfer the NFT, the `_beforeTokenTransfer` hook will execute `_changeReceiver` 

Ok, so let's look at what `_changeReceiver` does in `RedirectAll.sol`

```javascript
    // @dev Change the Receiver of the total flow
    function _changeReceiver( address newReceiver ) internal {
        // Some internal checking    
        // ...
        // @dev delete flow to old receiver
        _host.callAgreement(
            _cfa,
            abi.encodeWithSelector(
                _cfa.deleteFlow.selector,
                _acceptedToken,
                address(this),
                _receiver,
                new bytes(0)
            ),
            "0x"
        );
        // @dev create flow to new receiver
        _host.callAgreement(
            _cfa,
            abi.encodeWithSelector(
                _cfa.createFlow.selector,
                _acceptedToken,
                newReceiver,
                _cfa.getNetFlow(_acceptedToken, address(this)),
                new bytes(0)
            ),
            "0x"
        );
        // @dev set global receiver to new receiver
        _receiver = newReceiver;

        emit ReceiverChanged(_receiver);
    }
```

The notation here will look different from what we've covered so far, since we are interacting with the contracts directly. In comparison, here is how it might look if you performed the action using the SDK: `flow({recipient: oldRecipient, flowRate: "0" })` followed by `flow({recipient: newRecipient, flowRate: newFlowRate })` 

Note that we are using `getNetFlow` to calculate the current flowRate.

Cool so now we have an idea how a contract can change and update flows. How about reacting to incoming flows? For this we need to use Super App callbacks.

## Callbacks

This is how your app can respond to someone opening a new flow, without actually calling a function on the contract itself. For example, a user can open a new flow to your contract via the dashboard. More docs on this coming soon!

## Deployment

Switch back to `TradeableCashflow.sol` file in the editor window. Now in the Compiler tab, make sure you're using the same version as whats listed in the contract, and hit "compile".

![](../.gitbook/assets/image%20%2810%29.png)

To deploy the contract, switch to the "Deploy and Run Transactions" tab, and select “Injected Web3”. In your wallet, make sure you're on the Goerli test network. Here are the parameters you should use to deploy:

* Host: 0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9
* CFA: 0xEd6BcbF6907D4feEEe8a8875543249bEa9D308E8
* Accepted Token \(fDAIx\): 0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00



## Usage

From any account, start a flow using the _acceptedToken_ fDAIx, to the deployed contract.

Once you transfer the NFT, the flow will update automatically to the new Holy Grail holder.

More docs coming soon!

## Resources

* Find the source code for the Holy Grail and other Super Apps in [🛠️ Examples](../resources/examples.md)
* Video workshop for the Holy Grail: 



