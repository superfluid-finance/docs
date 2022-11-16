---
description: Set yourself to easily test with Superfluid on a Hardhat fork
---

# Hardhat Mainnet Fork Testing

All that's needed here is to set up your SDK Core Framework object and you'll be on your way to easily simulating mainnet Superfluid actions the way you would [normally](../../sdk-core/functionality.md).

First, make sure you have these required imports and make yourself an `sf` global variable for your Framework object.

```
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers } = require("hardhat");

// Superfluid Global Variable
let sf;
```

Then, create the Framework object, finding the Resolver address from your desired chain on the [Contract Addresses](../../networks.md) page.

```
before(async function () {

    sf = await Framework.create({
        provider: ethers.provider,  
        resolverAddress: <<resolver address from your desired chain>>,
        networkName: "hardhat",
        dataMode: "WEB3_ONLY",
        protocolReleaseVersion: "v1",
        chainId: 31337
    });
    
    ...
```

#### Now You're All Set!

Notice that there was no need to deploy the Framework is already exists on the chain you are testing.
