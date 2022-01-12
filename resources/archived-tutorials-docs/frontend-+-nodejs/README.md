---
description: Using the Superfluid JS-SDK - the Precursor to the SDK-Core
---

# 📦 @superfluid-finance/js-sdk

## **Overview**

* Use `@superfluid-finance/js-sdk` with goerli testnet
* Obtain Super Tokens
* Check Super Token balances

> **NOTE**: The JS-SDK is a legacy SDK. We recommend that new developers use the SDK-Core or SDK-Redux.

## Set up

The js-sdk can be used with both `web3.js` and `ethers`. A peer dependency for contract loading is required, so make sure to include it when you install the SDK!

{% tabs %}
{% tab title="ethers" %}
```bash
yarn add @superfluid-finance/js-sdk @ethersproject/contracts
```
{% endtab %}

{% tab title="web3" %}
```
yarn add @superfluid-finance/js-sdk @truffle/contract
```
{% endtab %}
{% endtabs %}

Now in our application, we can create the `SuperfluidSDK` object and initialize.

{% tabs %}
{% tab title="ethers" %}
```javascript
const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const { Web3Provider } = require("@ethersproject/providers");

const sf = new SuperfluidSDK.Framework({
    ethers: new Web3Provider(window.ethereum)
});
await sf.initialize()
```
{% endtab %}

{% tab title="web3" %}
```javascript
const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const Web3 = require("web3");

const sf = new SuperfluidSDK.Framework({
    web3: new Web3(window.ethereum),
});
await sf.initialize()
```
{% endtab %}
{% endtabs %}

By default, the SDK will load Version 1 of the contracts, for whichever network the wallet is connected to. See [🔗 Network Directory](../../../protocol-developers/networks/) for the full list of contract addresses.

### Create a User

Now let's make a request to unlock our ethereum wallet and create a User object.

```javascript
const walletAddress = await window.ethereum.request({
  method: 'eth_requestAccounts',
  params: [
    {
      eth_accounts: {}
    }
  ]
});
    
const carol = sf.user({
    address: walletAddress[0],
    token: '0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00'
});
```

You'll notice we passed a token address when we created the User. Over in [🔗 Network Directory](../../../protocol-developers/networks/) we can see this is the `fDAIx` token, which is a test **Super Token** on Goerli network.

What's a Super Token? It's just a "wrapped" or **upgraded** ERC20 token. This is what enables the cool super-powers like streaming, batch calls, and more.

![](<../../../.gitbook/assets/image (8) (1).png>)

After upgrading an ERC20 to Super Token, it will have a new token address. To denote this, we just append "x" to the token symbol. Since the fDAI in our example is named "Fake DAI", it now becomes "Super Fake DAI"... pretty funny name right?

Now let's inspect our user, to see if they are interacting with the fDAIx token.

```javascript
const details = await carol.details();
console.log(details);

// {
//    cfa: {
//         flows: { ... }
//         netFlow: "0"
//   ...
// }
```

In this example Carol has no flows of fDAIx, since her **netFlow** is 0. Let's get some tokens so we can start flowing! :man\_surfing:

### Test Tokens

Head to [app.superfluid.finance](https://app.superfluid.finance). During log-in you'll be prompted to receive some goerli ETH and test tokens. Once you receive these normal ERC20 tokens, we need to upgrade them to \*\*Super Tokens. \*\*Open the _Currencies tab_ and click the "+" _Upgrade button_.

If you're using the fDAIx token as shown in this guide, the you need to upgrade your DAI (token symbols don't always match exactly on testnet).

![](<../../../.gitbook/assets/image (7).png>)

You'll be prompted to "Allow Superfluid to spend your DAI". Then you'll call the upgrade function, which will take the DAI token from your wallet, and send back the same amount of DAIx. Use the handy "Add to Metamask" button to see DAIx in your wallet.

### Start a Flow

Now that you have some tokens, let's start streaming them. Use a different wallet adddress for the **recipient** (you cannot flow to yourself), and set \*\*flowRate \*\*to 385802469135802 tokens per second. This flow rate is equivalent to 1000 tokens per month, for a token with 18 decimals.

```javascript
await carol.flow({
    recipient: '0xA8f3447922d786045CB582B0C825723B744a54df',
    flowRate: '385802469135802'
});

const details = await carol.details();
console.log(details);

// {
//    cfa: {
//         flows: { ... }
//         netFlow: "-385802469135802"
//   ...
// }
```

\*\*🎉 Excellent work, you just started your first Superfluid Flow! \*\*Carol now has a negative \*\*netFlow \*\*which means she is sending tokens out from her wallet.

We can call it again to change the flow rate, or stop it by passing a `0` flowRate:

```javascript
await carol.flow({
  recipient: '0xA8f3447922d786045CB582B0C825723B744a54df',
  flowRate: '1000000000000000' // 2592 DAIx per month
});

await carol.flow({
  recipient: '0xA8f3447922d786045CB582B0C825723B744a54df',
  flowRate: '0' 
});
```

You just used a Superfluid Agreement to create a flow. Let's dive a bit more into what an agreement actually is.
