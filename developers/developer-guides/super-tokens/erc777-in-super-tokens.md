# ERC777 in Super Tokens

### What's an ERC777?

ERC777 is a token standard that extends the existing ERC20 standard to allow send/receive hooks as well as operator accounts.

**Send/Receive Hooks**

ERC777 tokens allow senders and recipients to define _hooks_ which enact custom logic upon the sending or receiving of the ERC777 token.

There are two hooks -  `tokensToSend` and `tokensReceived`.&#x20;

* `tokensToSend` is implemented by the sending account
* `tokensReceived` is implemented by the receiving account.&#x20;

When `transferFrom` or `send` on the ERC777 token is called to move tokens between accounts, the code in these hooks kick in.&#x20;

![](<../../../.gitbook/assets/image (10).png>)

You could imagine `tokensToSend` containing logic that handles what to do when tokens are sent and `tokensReceived` containing logic handling what to do when tokens are received.

**Operators**

An account may set operator accounts using the `authorizeOperator` function. Operators are able to call the `operatorSend` function to move tokens on behalf of an account. In doing so, they trigger the `tokensToSend` and `tokensReceived` hooks just like a normal send from a non-operator account.

This is in contrast to how with ERC20 tokens we can give any account an allowance with `approve` and that account can use `transferFrom` to move tokens on your behalf up until a set allowance.  An ERC777 operator is able to use `operatorSend` to move as many tokens as it sees fit with custom logic set in the `tokensToSend` hook.&#x20;

Note that the ability to use approve to set transfer allowances is still available in ERC777, so you can configure both operators as well as allowances.

### How is The Super Token ERC777 Implementation Different?

The Super Token overrides `transferFrom` on the ERC777 such that it does not trigger any hooks but leaves the `send` function as is.

You can see the `send` function exposed on the USDCx Super Token interface [**HERE**](https://polygonscan.com/address/0xCAa7349CEA390F89641fe306D93591f87595dc1F#writeProxyContract) on Polygonscan.

<figure><img src="../../../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>

### Example: Using Send to Interact With TOGA Contract

The TOGA Contract lets an account stake their Super Tokens in it to become a Patrician (like a "liquidator of choice") for the Superfluid Protocol.

In order to stake your Super Tokens, you use `send` to move tokens into the TOGA contract. The TOGA contract reacts to the incoming tokens with its `tokensReceived` hook. Using `transfer` or `transferFrom` will not work!

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/blob/b8455eab907c7df228d9155aa4df93b11af61ccc/packages/ethereum-contracts/contracts/utils/TOGA.sol#L331" %}

The `tokenReceived` hook engages code which determines if your stake was enough to become the Patrician and also picks out some optional user data which lets you customize the exit rate of the position (read more in [Liquidations & TOGA](https://docs.superfluid.finance/superfluid/sentinels/liquidations-and-toga)).



### ERC777 Resources

Ethereum.org's description of the ERC777

{% embed url="https://ethereum.org/en/developers/docs/standards/tokens/erc-777/" %}

More formal description in EIP-777

{% embed url="https://eips.ethereum.org/EIPS/eip-777" %}

See the transfer function code on OpenZeppelin's ERC777 contract

{% embed url="https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC777/ERC777.sol#L275" %}

See the SuperToken code and how it utilizes ERC777

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/superfluid/SuperToken.sol" %}
