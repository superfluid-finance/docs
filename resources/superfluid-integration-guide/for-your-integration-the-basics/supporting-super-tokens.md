---
description: Supporting Super Tokens in Your App
---

# Supporting Super Tokens

{% hint style="info" %}
You can learn more about Super Tokens [here](../../../developers/super-tokens/).&#x20;
{% endhint %}

The first thing you’ll need to do is support Super Tokens in your application. You can think of Super Tokens as an _extension_ of the ERC20 standard. You still get all of the typical ERC20 methods (`transfer`, `approve`, `transferFrom`, `symbol`, etc), but Super Tokens implement additional logic when determining balances.

These tokens store all balance information for each holder, but they’re also plugged directly into Superfluid at the protocol level. The way that balances are calculated will reflect all of the _agreements_ that the token owner has engaged in. The two agreements currently used within Superfluid are the Constant Flow Agreement (CFA) and Instant Distribution Agreement (IDA).

For reference, the CFA is the agreement which mediates _money streaming,_ and the IDA enables _scalable one-to-many token distributions._ You can read more about them in our [docs](https://docs.superfluid.finance/superfluid/protocol-overview/in-depth-overview/super-agreements).

While you might initially think of a Super Token as a rebasing token, it isn’t one! Any account, when not using any agreements (i.e. not sending or receiving any streams or engaged in any instant distribution agreements), will behave exactly like a vanilla ERC20 token.

{% hint style="info" %}
💡 You can find the Super Token contract interface [here](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol), and complete docs on how they work [here](https://docs.superfluid.finance/superfluid/protocol-overview/in-depth-overview/super-tokens).
{% endhint %}

#### 3 General Types of Super Tokens

* **ERC20 wrapper tokens:** These are commonly denominated by the ‘x’ which is appended to the end of the token symbol, such as USDCx and DAIx. These are a wrapper around an existing ERC20 asset.
  * Calling `upgrade()` on this contract will wrap the underlying ERC20 token as a super token: the underlying asset is deposited into the contract and super tokens are burned in return.
  * Calling `downgrade()` on this contract will unwrap the underlying token: the super tokens are burned and the underlying asset is sent back.
* **Native asset wrapper tokens:** These tokens are wrappers around native assets such as AVAX or MATIC. They’re also denominated like ERC20 wrappers with the ‘x’ appended to the end of the token symbol: i.e. MATICx, ETHx. These have the same upgrade/downgrade methods as the ERC20 wrapper contracts, they’re just implemented slightly differently
  * Instead of `upgrade()`, you’ll use `upgradeByETH()`, and instead of `downgrade()` you’ll use `downgradeToETH()`.
  * `upgradeByETH()` takes no parameters - the amount you’d like to upgrade needs to be included as value along w the call (i.e. via `msg.value`).
  * `downgradeToETH()` takes one parameter - which is the amount of tokens you’d like to downgrade
  * Note that these functions are also calling `upgradeByETH` and `downgradeByETH` on non-ETH native assets like AVAXx and MATICx
* **Pure super tokens:** These are deployed natively as Super Tokens - i.e. without an underlying address at all. Wrapping & unwrapping is not necessary with these tokens because they come out of the box with Super Token functionality.

#### Super Tokens & ERC777 Methods

Super Tokens also implement many functionalities of ERC777, including functions like`send()` (i.e. `transfer` with a `userData` field, useful for payments as you can add an order id), patterns like using an `operator` (an alternative to approve), and hooks. However, Superfluid distances itself significantly from the canonical ERC777 standard because `transfer()` and `transferFrom()` do not implement hooks. There have been instances where the transfer and transferFrom hooks led to unintended behavior in other protocols, but this isn’t something you’ll need to concern yourself with when it comes to Superfluid. You still get all the beneficial features of ERC777, without the scary stuff :-)

#### Getting Super Token Balances

Just like with traditional ERC20 tokens, you can get an account’s balance by calling `balanceOf()`. The Super Token implementation of `balanceOf()` will make use of a function named `realTimeBalanceOf()`under the hood. You can learn more about the `realTimeBalanceOf()` function in our [docs](https://docs.superfluid.finance/superfluid/protocol-overview/in-depth-overview/super-tokens#real-time-balance), but all you really need to know is that `balanceOf()` will work exactly as expected and take into consideration all of the agreements that a given account is engaged in.

**You can get account balances in one of two ways:**

1\) Calling `balanceOf()` on the contract’s [ISuperToken interface](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol) as you normally would with any other token:

<figure><img src="../../../.gitbook/assets/Screen Shot 2022-08-04 at 1.26.57 PM.png" alt=""><figcaption></figcaption></figure>

2\) Using the Superfluid [SDK Core:](https://docs.superfluid.finance/superfluid/developers/sdk-initialization/sdk-core/super-token-operations)

```jsx
await usdcx.balanceOf({
  account: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});
```

**Other Important Things to Know About Super Tokens:**

* They’ll always have 18 decimals

{% hint style="info" %}
💡 We’re working on putting together a canonical super token list which will follow a similar standard as Uniswap’s token list & make the process of rendering super token data much easier. In the meantime, you can use our subgraph to query tokens for each network.
{% endhint %}
