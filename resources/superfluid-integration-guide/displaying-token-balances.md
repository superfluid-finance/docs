---
description: Getting Super Token Balances - Both Static and Dynamic
---

# Displaying Token Balances

## Getting Standard Account Balances

To get an account’s balance, you can call `balanceOf()` on each individual Super Token contract, and pass in the address of the account you’re looking to query as the lone param. This works just like an ERC20 `balanceOf()` call.

## Displaying an Account’s Streaming Balance in Your Own App

Our guess is that you want to display something like this in your own app:

<figure><img src="../../.gitbook/assets/ethxstream (1).gif" alt=""><figcaption><p>we love a good streaming balance</p></figcaption></figure>

`balanceOf()`will give you the balance of the token holder as of the most recent `block.timestamp` value, but you won’t be able to call this function fast enough to render a truly by-the-second real time balance animation in your application. As such, we recommend using a combination of an animation which takes into consideration the static balance of the user, the netflow of the user for each token, and regular polling of the Superfluid subgraph to check for updates to a user’s net flow.

What we’ve seen other teams do is take into consideration the static balance & dynamic balance of each user by listening for `flowUpdatedEvents`, `indexUpdatedEvents`, `transferEvents`, and `upgrade`/`downgrade` events to generate the correct up to date token balance. From here, if a user is actively sending or receiving streams for a token, an animation helps to bring this to life & usually gets really positive reviews.

If you’re interested in seeing an example of how the streaming animation works via our console, you should take a look at this component:

{% embed url="https://github.com/superfluid-finance/superfluid-console/blob/master/src/components/FlowingBalance.tsx" %}
