---
description: Manage Flows and IDAs using a smart contract
---

# 🦾 Super Apps

A Super App can "manage" agreements and respond to changes. This is where you can write your own custom logic/behavior. In this section we will deploy a new Super App using Remix. 

![](../.gitbook/assets/image%20%2812%29.png)

So what will our app do? Our app will accept incoming CFA flows, and use some internal logic to determine where to redirect it. The reciever of all the incoming flows will be decided by whoever owns a ERC721 Non-fungible Token \(NFT\). 

_If the NFT is transferred to a new owner, all token flows are redirected to the new owner_. 

We will call the app **Holy Grail**, since whoever is in possession of the NFT is blessed with great power.

![A chalice is handed to another person \(https://unsplash.com/@reskp\)](../.gitbook/assets/image%20%2821%29.png)

## Prerequisites

Before starting this tutorial you should: 

* Have some goerli ETH and tokens in your wallet from the dashboard [https://app.superfluid.finance](https://app.superfluid.finance)

## Setup

Click the link to load the contracts in Remix:

{% embed url="https://remix.ethereum.org/\#gist=2d2c1e51a21ff5496c69397454c1eee5&call=fileManager//open//browser/gists/2d2c1e51a21ff5496c69397454c1eee5/TradeableCashflow.sol&version=soljson-v0.7.0+commit.9e61f92b.js" caption="Holy Grail Super App" %}

Once it loads, you should see `TradeableCashflow.sol` in the editor window. 

![](../.gitbook/assets/image%20%281%29.png)

In the file explorer, click to expand gist "2d2c1..." to view both contracts. `TradeableCashflow.sol` is our main contract, which inherits `RedirectAll` from the local file, and the `ERC721` contract from the Open Zeppelin Github repo.

The two main concepts of `TradeableCashflow.sol` are:

1. Create a new ERC721 contract, and mint a single NFT to be the Holy Grail
2. Whenever the NFT is transferred, the `_beforeTokenTransfer()` hook calls `_changeReceiver()` which will redirect the incoming flows.

## Calling Agreements

In order for our app to redirect flows, it must be able to call the Superfluid Agreements.

Let's look at what `_changeReceiver()` does in the contract `RedirectAll.sol`. The first step is to delete the current flow from the Super App to the current reciever.

```javascript
    // @dev Change the Receiver of the total flow
    function _changeReceiver( address newReceiver ) internal { 
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
```

This is the first time we are introducing examples of how to interact with the Framework contracts directly. Don't worry about understanding every part right now, you can just skim to get an idea. 

Here's how the same code would look if we were using the`@superfluid-finance/js-sdk` to perform the same action:

```javascript
await flow({recipient: currentRecipient, flowRate: "0" });
```

In the next part of `_changeReveiver()`, the Super App starts a new flow to the new reciever, or new NFT owner:  

```javascript
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

Again for comparison, here is how it would look if we used the `superfluid-finance/js-sdk` instead:

```javascript
// Get the new incoming flow rate
const newFlowRate = await sf.cfa.getNetFlow({ 
                        superToken: _acceptedToken,
                        account: myContract.address
                      })
                      
// Start a flow to the new recipient
await flow({recipient: newRecipient, flowRate: newFlowRate });

// Reassign the recipient to the newRecipient
currentRecipient = newRecipient

```

This is how we can call an Agreement to start a flow in a contract. But what about reacting to incoming flows automatically? To respond to changes in an Agreement, we need to use Super App **callbacks**.

## Callbacks

Super Apps can respond to changes in Agreements using callbacks. This can be done _without needing to call a function in your contract_. 

When anyone creates a new flow to the Holy Grail contract, we need to "catch" this transaction, and automatically redirect the flow to the receiver.

Around line 170 in `RedirectAll.sol` we can start to see all the callbacks. The fist one is `afterAgreementCreated()`. This function is called any time a new agreement is created which involves the SuperApp. 

```javascript
    function afterAgreementCreated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32, // _agreementId,
        bytes calldata /*_agreementData*/,
        bytes calldata ,// _cbdata,
        bytes calldata _ctx
    )
        external override
        onlyExpected(_superToken, _agreementClass)
        onlyHost
        returns (bytes memory newCtx)
    {
        return _updateOutflow(_ctx);
    }
```

Using the modifier `onlyExpected` allows use to only execute this when the agreement is a Constant Flow Agreement, and the token address matches the `_superToken` .

Assuming all the checks pass, then we can trigger `_updateOutFlow` which combines the new incoming flow and creates the new flow

![](../.gitbook/assets/image%20%2818%29.png)

Now that you understand the two main components of a Super App, its time to deploy it!

## Deployment

Switch back to `TradeableCashflow.sol` in the editor window. 

Now in the Compiler tab, make sure you're using compiler version `0.7.0` and hit "compile".

![](../.gitbook/assets/image%20%2816%29.png)

Once compilation is complete, switch to the "Deploy and Run Transactions" tab. Select Environment “Injected Web3”, and in your wallet switch to Goerli test network. 

![](../.gitbook/assets/image%20%2824%29.png)

Next select the **TradeableCashflow** contract to deploy, and use the following parameters to deploy:

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameter</th>
      <th style="text-align:left">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">OWNER</td>
      <td style="text-align:left">(Use your address)</td>
    </tr>
    <tr>
      <td style="text-align:left">_NAME</td>
      <td style="text-align:left">Holy Grail</td>
    </tr>
    <tr>
      <td style="text-align:left">_SYMBOL</td>
      <td style="text-align:left">GRAIL</td>
    </tr>
    <tr>
      <td style="text-align:left">
        <p></p>
        <p>Host</p>
      </td>
      <td style="text-align:left">
        <p></p>
        <p>0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">CFA</td>
      <td style="text-align:left">0xEd6BcbF6907D4feEEe8a8875543249bEa9D308E8</td>
    </tr>
    <tr>
      <td style="text-align:left">ACCEPTEDTOKEN</td>
      <td style="text-align:left">0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00</td>
    </tr>
  </tbody>
</table>

This will deploy the Holy Grail contract, mint a single NFT, and transfer it to the owner. Once the transaction is confirmed, copy the address of the deployed contract. 

![](../.gitbook/assets/image%20%2817%29%20%281%29%20%281%29.png)



## Usage

Now comes the magic part. Since we used **callbacks** in our Super App, we can create a new flow from the Superfluid Dashboard. Our Super App will react to this automatically. 

Using the address you copied in the previous step, start a new flow using fDAIx \(shown as DAIx in the Dashboard\) to your Super App.

![](../.gitbook/assets/image%20%2820%29.png)

After the transaction is confirmed, you will see both an incoming and outgoing flow from the same address. This is because you are the owner of the NFT, __so you're effectively streaming to yourself via the Super App. 

![](../.gitbook/assets/image%20%2819%29.png)

Now let's transfer the Holy Grail NFT to someone else using `transferFrom()`. Since there is only a single NFT, the `tokenId` will be always be `1`.

![](../.gitbook/assets/image%20%2823%29.png)

Upon transfer, all incoming flows will be re-directed to the new NFT holder. You can verify this by logging into the Superfluid Dashboard using the receiver's account.

Excellent! Now you know how a Super App works. In the next section we will discuss deploying the Superfluid Framework so you can easily test your own Super App using a local blockchain.

