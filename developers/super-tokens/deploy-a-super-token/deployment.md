---
description: Let's make a Super Token Wrapper for your ERC20 token
---

# Deploying a Wrapper Super Token

{% hint style="info" %}
You can learn more about what Wrapper Super Tokens are [HERE](../types-of-super-tokens.md#1.-wrapper-super-tokens).
{% endhint %}

Anyone can deploy a Wrapper Super Token for any ERC20 token. The deployer account doesn't receive any control or admin powers, and all Super Token logic upgrades are handled by Superfluid Protocol Governance.

### Deploying Using Community Deployer Interface

This web app by community member [serox.eth](https://twitter.com/seroxdesigns) provides an easy way to deploy a wrapper

{% embed url="https://deploy-supertoken-deployment.vercel.app/" %}

### Deploying Using Block Explorer

1\. Head to Super Token Factory contract for appropriate network 👇

* [**Ethereum Mainnet**](https://etherscan.io/address/0x0422689cc4087b6B7280e0a7e7F655200ec86Ae1#writeProxyContract)
* [**Polygon**](https://polygonscan.com/address/0x2C90719f25B10Fc5646c82DA3240C76Fa5BcCF34#writeProxyContract)
* [**Gnosis Chain**](https://gnosisscan.io/address/0x23410e2659380784498509698ed70E414D384880#writeProxyContract)
* [**Optimism**](https://optimistic.etherscan.io/address/0x8276469a443d5c6b7146bed45e2abcad3b6adad9#writeProxyContract)
* [**Arbitrum**](https://arbiscan.io/address/0x1C21Ead77fd45C84a4c916Db7A6635D0C6FF09D6#writeProxyContract)
* [**Avalanche**](https://snowtrace.io/address/0x464AADdBB2B80f3Cb666522EB7381bE610F638b4#writeProxyContract)
* [**BNB Chain**](https://bscscan.com/address/0x8bde47397301f0cd31b9000032fd517a39c946eb#writeProxyContract)
* [**Celo**](https://celoscan.io/address/0x36be86dEe6BC726Ed0Cbd170ccD2F21760BC73D9#writeProxyContract)
* [**Base**](https://basescan.org/address/0xe20B9a38E0c96F61d1bA6b42a61512D56Fea1Eb3#writeProxyContract)
* [**Mumbai (testnet)**](https://mumbai.polygonscan.com/address/0x200657E2f123761662567A1744f9ACAe50dF47E6#writeProxyContract)
* [**Goerli (testnet)**](https://goerli.etherscan.io/address/0x94f26B4c8AD12B18c12f38E878618f7664bdcCE2#writeProxyContract)

If a network is missing here, head over to the [Superfluid Console](https://console.superfluid.finance/matic/protocol), select the network and click the explorer link for the `SuperTokenFactory` contract address.

2\. Connect wallet.

![](<../../../.gitbook/assets/image (68).png>)

3\. Find the `createERC20Wrapper` function. Refer to the below image and provide the required parameters with **no additional characters**.

![](<../../../.gitbook/assets/image (54).png>)

4\. Click `Write` and confirm through your wallet. Congrats, you've created a new Wrapper Super Token!

5\. To find the address of your new Wrapper Super Token, go to the transaction hash and click on the "Logs" tab. The address is in the "InterfaceImplementerSet" event log ([SUNNYx example](https://polygonscan.com/tx/0xd23df49ac21f5c92049ede689e835d5dcbbd3c9670428ce7dd22f391fd5f9564#eventlog)).

![](<../../../.gitbook/assets/image (29).png>)

Alternatively, search your token in the top right search bar and find it in the drop down

![](<../../../.gitbook/assets/image (31) (1).png>)

### Deploying Using Deployment Scripts

We've created some handy scripts for deploying the ERC20 Wrapper contract.

```bash
git clone https://github.com/superfluid-finance/protocol-monorepo/
yarn install --frozen-lockfile
yarn build
cd packages/ethereum-contracts
cp .env.template .env

# edit .env file and configure the correct mnemonic and rpc endpoint
# check truffle-config.js for what environment variables are required
```

Now you can use the `deploy-unlisted-super-token.js` script to deploy the wrapper:

```bash
RELEASE_VERSION=v1 npx truffle --network <xdai or matic> \
exec ops-scripts/deploy-unlisted-super-token.js : \
<Underlying Token Address> \
<SuperToken Name> \
<SuperToken Symbol>
```

If you are wrapping an existing token, like DAI or USDC, please use suffix "x" in the SuperToken symbol.

### Adding Token to Superfluid Dashboard

Congrats on deploying your Super Token! If you'd like to see it listed on the [Superfluid Dashboard](https://app.superfluid.finance/), check out this page 👇

{% content-ref url="../../../resources/token-dashboard-submission.md" %}
[token-dashboard-submission.md](../../../resources/token-dashboard-submission.md)
{% endcontent-ref %}
