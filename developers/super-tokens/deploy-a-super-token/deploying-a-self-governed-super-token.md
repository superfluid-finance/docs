# Deploying a Self Governed Super Token

Self Governed Super Tokens are Super Tokens where logic upgrades are controlled by you. This lets you have the ability to apply token logic upgrades provided by Superfluid governance to your Super Token contract and also apply custom code implementations at your leisure.

## Execute `createERC20Wrapper`&#x20;

Head to the [Protocol Directory](https://console.superfluid.finance/matic/protocol) and head to the Etherscan page of the SuperTokenFactory on the network of your choosing.

Head to the "Write as Proxy" tab in the "Contract" tab and go to the `createERC20Wrapper` function that has the `admin` parameter.

`admin` is the account that's permitted to call the Super Token logic updates with `updateCode`.

{% hint style="info" %}
We are currently in the process of rolling out the createERC20Wrapper function with the admin parameter on more networks. For an example of the function live, see the [implementation](https://testnet.snowtrace.io/address/0x1C92042426B6bAAe497bEf461B6d8342D03aEc92#writeProxyContract) on Avalanche C-Chain.
{% endhint %}

## Update Logic

Head to the `updateCode` function.

You can pass in the address of your custom logic contract (documentation on this coming soon!) or just the address of the latest Superfluid token contract.&#x20;

{% hint style="info" %}
The address of the latest Superfluid token contract can be found with the `getSuperTokenLogic` function on the SuperTokenFactory ([for example](https://polygonscan.com/address/0x2C90719f25B10Fc5646c82DA3240C76Fa5BcCF34#readProxyContract)).
{% endhint %}

After execution, your Super Token logic has been updated.

**For more info, check out our** [**Wiki**](https://github.com/superfluid-finance/protocol-monorepo/wiki/Self-Governed-Super-Token) **or reach out to us on** [**Discord**](https://discord.superfluid.finance/)**.**
