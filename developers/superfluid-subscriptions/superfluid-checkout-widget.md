---
description: Using the Superfluid Checkout Widget for Web3-Native Subscriptions
---

# Superfluid Checkout Widget

{% hint style="info" %}
NOTE: **the checkout widget is in open alpha** and is subject to change. We are iterating quickly and are open to feedback!
{% endhint %}

## What is the Superfluid Checkout Widget?

The Superfluid **Checkout Widget** demonstrates a clean pattern for subscription UX in web3 using Superfluid, including all the core web3 interactions needed. Here are some highlights:

* It is minimally-opinionated and uses the most up to date web3 front end tooling
* It supports all Superfluid tokens and networks by default
* It automatically becomes a 1-click checkout if a payer already holds Super Tokens
* It can be styled as a widget, a full page view, or a modal itself
* Fonts, shapes, colors are all customizable

The widget is meant to be imported into existing Wagmi front ends using a React or Vue component. You can import the widget library, include JSON that defines your widget’s behavior in the props of the subscription checkout component, and your widget will behave as expected. You can create your own custom JSON with our [no code widget builder](https://superfluid-widget-builder.vercel.app/):

## Building Your Own Custom Checkout Widget

> Note: if you're looking to get started quickly, check out the [examples below](superfluid-checkout-widget.md#checkout-widget-examples) which will work with Web3Modal or RainbowKit.

To implement your checkout widget, you'll need to install the widget library, wagmi, and the Superfluid token list from your favorite package manager:

```bash
#npm
npm install --save @superfluid-finance/widget wagmi @superfluid-finance/tokenlist

#yarn
yarn add @superfluid-finance/widget wagmi @superfluid-finance/tokenlist
```

You can then import the widget into the component you'd like to render it in

```javascript
import { WagmiConfig } from "wagmi";
import SuperfluidWidget from '@superfluid-finance/widget';
```

Before you include the widget in your file, you'll need to generate a Widget JSON that you'll pass as a prop to the widget component. This Widget JSON specifies most of your widget's properties, and you can use our hosted, no code widget builder to visually see what your widget will look like. You can find the widget builder [here](https://superfluid-widget-builder.vercel.app/).

{% embed url="https://checkout-builder.superfluid.finance/" %}

<figure><img src="../../.gitbook/assets/Recording 2023-05-31 at 10.21.31.gif" alt=""><figcaption><p>The widget builder in action.</p></figcaption></figure>

<details>

<summary>User Data in the Widget JSON</summary>

Having users provide [user data](../super-apps/user-data/#in-conclusion) with their streams can enhance on-chain traceability, help with record keeping, and be useful for Super Apps. Here's how you can set default user data for streams created through your Superfluid Widget

1. Customize the Superfluid Widget to your liking on the [Checkout Builder page](https://checkout-builder.superfluid.finance/).
2. On the top right of the Checkout Builder page, you'll find a JSON Editor. Open it to view your Widget JSON.
3. In for each Payment Option, you can insert a `userData` field

```json
  "paymentDetails": {
    "paymentOptions": [
      {
        "receiverAddress": "0x...",
        "chainId": 5,
        "superToken": {
          "address": "0x..."
        },
        "flowRate": {
          "amountEther": "1",
          "period": "month"
        },
        "userData": ( your user data goes here )     <-- !!
      }
    ]
  }
```

3. `userData` must be provided as a bytestring - this is most conveniently generated using viem's [toHex](https://viem.sh/docs/utilities/toHex.html) function.

</details>

Once you have your JSON, you add the file to your project, import it, and use the javascript spread operator to pass it as props to your widget component. See `{...data}` here:

<pre class="language-jsx"><code class="lang-jsx">import { WagmiConfig } from "wagmi";
import SuperfluidWidget from '@superfluid-finance/widget';
import superTokenList from "@superfluid-finance/tokenlist";

<strong>
</strong><strong>export function MyComponent() {
</strong><strong>
</strong><strong> return (
</strong><strong>   &#x3C;div>
</strong>    &#x3C;WagmiConfig config={wagmiConfig}>
        &#x3C;SuperfluidWidget
          {...data}
          tokenList={superTokenList}
          type="dialog"
          walletManager={walletManager}
        >
        {({ openModal }) => (
          &#x3C;button onClick={() => openModal()}>Open Superfluid Widget&#x3C;/button>
        )}
        &#x3C;/SuperfluidWidget>
      &#x3C;/WagmiConfig>
    &#x3C;/div>
  )
</code></pre>

You'll also need a few more props:`tokenList`, `type`, and `walletManager.`

The `tokenList` allows the widget to support all listed Super Tokens. You should have the Superfluid token list already installed it if you used the [above npm or yarn commands](superfluid-checkout-widget.md#building-your-widget)! You'll just need to include it as a prop like this:&#x20;

`tokenList={superTokenList}`

The `type` prop allows us to specify what kind of widget we want to create. We have a few supported types:

* drawer
* dialog
* full-screen

Finally, the `walletManager` prop is necessary to ensure that the widget works properly with wallet connection libraries such as RainbowKit, Web3Modal, & more. It is recommended that you use the `useMemo` hook from react to set the `walletManager` variable & associated prop:

```jsx
  const walletManager = useMemo(
    () => ({
      open,
      isOpen,
    }),
    [open, isOpen]
  );
```

### Checkout Widget Examples

All examples can be found in [this repo.](https://github.com/superfluid-finance/widget)

RainbowKit Example:&#x20;

{% embed url="https://github.com/superfluid-finance/widget/tree/master/examples/widget-vite-react-rainbowkit" %}

Web3Modal Example:

{% embed url="https://github.com/superfluid-finance/widget/tree/master/examples/widget-vite-react-web3modal" %}

IPFS Hosted + Full Page Example:

{% embed url="https://github.com/superfluid-finance/widget/tree/master/apps/hosted-widget" %}

#### Reference Documentation

{% embed url="https://superfluid-widget-reference-docs.vercel.app/variables/cfAv1ForwarderAddress.html" %}
