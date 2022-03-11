---
description: Deploying Super Apps and the Superfluid Framework
---

# Deploying Contracts

## Testing

### Truffle/Hardhat

The `@superfluid-finance/ethereum-contracts` package includes helpful scripts for deploying the framework using Truffle + Ganache. These deployment scripts can also be used within a Hardhat environment. You can find examples for writing tests using the Superfluid SDK core in our examples repository:

* [Hardhat Example](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/examples/tradeable-cashflow-hardhat/test/TradeableCashflow.test.js)
* [Truffle Example](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/examples/tradeable-cashflow-truffle/test/TradeableCashflow.test.js)&#x20;

```javascript
//example truffle test setup

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

Anyone can deploy the Superfluid Framework contracts to any EVM compatible network using the [Superfluid Protocol Deployment Guide](https://github.com/superfluid-finance/protocol-monorepo/wiki/Framework-Deployment-Guide). Potential candidates for production deployment include:

* xDAI Chain
* Polygon Network (Matic)

More networks are coming soon. Please reach out to us if you want your network added!

Once the contracts are deployed, ownership of the governance contracts should be transfered to a Superfluid-controlled account. This will allow the Superfluid team to manage security upgrades (if necessary), add new Agreements, and improve the core protocol. The governance process will be improved over time, as the community grows and matures.
