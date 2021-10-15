---
description: Deploying Super Apps and the Superfluid Framework
---

# Deploying Contracts

## Testing

### Hardhat

Website: [https://hardhat.org/](https://hardhat.org)

Docs: [https://hardhat.org/getting-started/](https://hardhat.org/getting-started/)

🚧 Docs Under Construction. More coming soon 🚧 

### Truffle

> :warning:  New developers are recommended to use Hardhat instead of Truffle.

The `@superfluid-finance/ethereum-contracts` package includes helpful scripts for deploying the framework using Truffle + Ganache. 

```javascript
const deployFramework = require("@superfluid-finance/ethereum-contracts/scripts/deploy-framework");
const deployTestToken = require("@superfluid-finance/ethereum-contracts/scripts/deploy-test-token");
const deploySuperToken = require("@superfluid-finance/ethereum-contracts/scripts/deploy-super-token");

contract("My Test", accounts => {
    const [admin, bob, carol, dan] = accounts;

    before(async () => {
        await deployFramework(errorHandler, {
            web3,
            from: admin
        });
    });

    beforeEach(async function() {
        await deployTestToken(errorHandler, [":", "fDAI"], {
            web3,
            from: admin
        });
        await deploySuperToken(errorHandler, [":", "fDAI"], {
            web3,
            from: admin
        });
    });
    
    //...
```

## Production

Anyone can deploy the Superfluid Framework contracts to any EVM compatible network using the Superfluid Protocol Deployment Guide (link to be released). Potential candidates for production deployment include:

* xDAI Chain
* Polygon Network (Matic)

More networks are coming soon. Please reach out to us if you want your network added!

Once the contracts are deployed, ownership of the governance contracts should be transfered to a Superfluid-controlled account. This will allow the Superfluid team to manage security upgrades (if necessary), add new Agreements, and improve the core protocol. The governance process will be improved over time, as the community grows and matures.
