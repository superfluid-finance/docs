---
description: Example apps that show how Superfluid can be used
---

# 🛠 Example Projects

## 🟢 Official Examples

Fork-able apps from the main repo:

* **Dividend Rights Token -** Distribute IDA shares using an ERC20 token
* **Holy Grail -** Whoever holds this NFT receives a CFA stream (see [🦾 Super Apps](../../protocol-developers/super-apps/))
* **Continuous Auction** - The winner is whoever has the largest CFA stream
* **Developer Playground** - A full-stack playground built with RedwoodJS
* and more...

Click here to see all the official examples:

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/tree/dev/examples" %}
Fork me!
{% endembed %}

## 🧑‍🤝‍🧑 Community Examples

Show off your app here! We don't maintain these, so if you run into problems, be sure to check package versions.

* **Stream Rent** -  _Create NFTs using offchain resources, and gain income by renting them out_
  * Hackathon submission: [https://devfolio.co/submissions/stream-rent-d208](https://devfolio.co/submissions/stream-rent-d208)
  * Source: [https://github.com/Jayashrri/StreamRent](https://github.com/Jayashrri/StreamRent)
* more soon!

## 💡 Ideas

Want ideas? Check out **** [**hack.superfluid.finance**](http://hack.superfluid.finance) to connect with other community members and brainstorm ideas.

## ✂️ Code Snippets

### Constant Flow Agreement

```javascript
import SuperfluidSDK from '@superfluid-finance/js-sdk';
import { Web3Provider } from '@ethersproject/providers';

const testFlow = async () => {
    const walletAddress = await window.ethereum.request({
      method: 'eth_requestAccounts',
      params: [
        {
          eth_accounts: {}
        }
      ]
    });
    const sf = new SuperfluidSDK.Framework({
      ethers: new Web3Provider(window.ethereum),
      tokens: ['fDAI']
    });
    await sf.initialize();
    const carol = sf.user({
      address: walletAddress[0],
      token: '0x8ae68021f6170e5a766be613cea0d75236ecca9a'
    });
  
    await carol.flow({
      recipient: '0xA8f3447922d786045CB582B0C825723B744a54df',
      flowRate: 385802469135802
    });
    
    const details = await carol.details();
    console.log(details);
};

testFlow();
```

### Instant Distribution Agreement

```javascript
import SuperfluidSDK from '@superfluid-finance/js-sdk';
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';

const testPool = async () => {
    const walletAddress = await window.ethereum.request({
      method: 'eth_requestAccounts',
      params: [
        {
          eth_accounts: {}
        }
      ]
    });
    const sf = new SuperfluidSDK.Framework({
      ethers: new Web3Provider(window.ethereum),
      tokens: ['fDAI']
    });
    await sf.initialize();
    const carol = sf.user({
      address: walletAddress[0],
      token: '0x8ae68021f6170e5a766be613cea0d75236ecca9a'
    });
    await carol.createPool({ poolId: 1 });
    await carol.giveShares({
      poolId: 1,
      shares: 100,
      recipient: '0xA8f3447922d786045CB582B0C825723B744a54df'
    });
    await carol.distributeToPool({
      poolId: 1,
      amount: BigNumber.from(100).toString()
    });
  };
  
testPool();
```
