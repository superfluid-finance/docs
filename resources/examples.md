---
description: See how others implemented Superfluid in their application
---

# 🛠️ Examples

## Apps

There are several forkable apps which are available on Github

* **Dividend Rights Token -** Distribute IDA shares using an ERC20 token
* **Holy Grail -** Whoever holds this NFT receives a CFA stream
* **Continuous Auction** - The winner is whoever has the largest CFA stream
* **Developer Playground** - A full-stack playground built with RedwoodJS
* and more...

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/tree/dev/examples" caption="Superlfuid App Examples" %}

Want ideas? Check out _hack.superfluid.finance_ to connect with other community members and brainstorm ideas:

{% embed url="http://hack.superfluid.finance/" caption="Superfluid App Ideas" %}

## Code Snippets

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

