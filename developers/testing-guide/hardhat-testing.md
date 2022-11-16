# Hardhat Testing

**Video Tutorial**

For the visually inclined, view our video explainer [**HERE**](https://www.youtube.com/watch?v=C\_PGd8CPdfg).

**Example Code**

{% embed url="https://github.com/superfluid-finance/super-examples/blob/main/projects/money-streaming-intro/money-streaming-intro-hardhat/test/MoneyRouter.test.js" %}
Hardhat test suite from our Money Router example
{% endembed %}

## Hardhat Example

We recommend including the following imports and deployment scripts when setting up your hardhat tests. The `deployTestFramework()` script will allow you to deploy the framework using the [SuperfluidFrameworkDeployer](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/utils/SuperfluidFrameworkDeployer.sol) contract, and to call `deploySuperTokenWrapper()` to mint fake Super Tokens for your tests.

Dependencies you'll need are listed at the top of the file, but if you already have a hardhat project set up, you'll likely only need `@superfluid-finance/sdk-core` and `@superfluid-finance/ethereum-contracts`.

```javascript
const { expect } = require("chai");
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers } = require("hardhat");
const deployTestFramework = require("@superfluid-finance/ethereum-contracts/scripts/deploy-test-framework");
const TestToken = require("@superfluid-finance/ethereum-contracts/build/contracts/TestToken.json");

let sfDeployer;
let contractsFramework;
let sf;
let moneyRouter;
let dai;
let daix;

// Test Accounts
let owner;
let account1;
let account2;

// Constants
//for usage in IDA projects
const expecationDiffLimit = 10; // sometimes the IDA distributes a little less wei than expected. Accounting for potential discrepency with 10 wei margin
//useful for denominating large units of tokens when minting
const thousandEther = ethers.utils.parseEther("10000");

before(async function () {
    // get hardhat accounts
    [owner, account1, account2] = await ethers.getSigners();

    sfDeployer = await deployTestFramework();

    // GETTING SUPERFLUID FRAMEWORK SET UP

    // deploy the framework locally
    contractsFramework = await sfDeployer.getFramework();

    // initialize framework
    sf = await Framework.create({
        chainId: 31337,
        provider: owner.provider,
        resolverAddress: contractsFramework.resolver,
        protocolReleaseVersion: "test"
    });

    // DEPLOYING DAI and DAI wrapper super token
    tokenDeployment = await sfDeployer.deployWrapperSuperToken(
        "Fake DAI Token",
        "fDAI",
        18,
        ethers.utils.parseEther("100000000").toString()
    );

    daix = await sf.loadSuperToken("fDAIx");
    dai = new ethers.Contract(daix.underlyingToken.address, TestToken.abi, owner);
    

    // minting and wrapping test DAI to all accounts
    await dai.mint(owner.address, thousandEther);
    await dai.mint(account1.address, thousandEther);
    await dai.mint(account2.address, thousandEther);

    // approving DAIx to spend DAI (Super Token object is not an ethers contract object and has different operation syntax)
    await dai.approve(daix.address, ethers.constants.MaxInt256);
    await dai.connect(account1).approve(daix.address, ethers.constants.MaxInt256);
    await dai.connect(account2).approve(daix.address, ethers.constants.MaxInt256);
    // Upgrading all DAI to DAIx
    const ownerUpgrade = daix.upgrade({amount: thousandEther});
    const account1Upgrade = daix.upgrade({amount: thousandEther});
    const account2Upgrade = daix.upgrade({amount: thousandEther});

    await ownerUpgrade.exec(owner);
    await account1Upgrade.exec(account1);
    await account2Upgrade.exec(account2);

    //DEPLOY YOUR CONTRACT 
    //you can find this example at https://github.com/superfluid-finance/super-examples/tree/main/projects/money-streaming-intro/test
    let MoneyRouter = await ethers.getContractFactory("MoneyRouter", owner);
    moneyRouter = await MoneyRouter.deploy(
        sf.settings.config.cfaV1ForwarderAddress,
        owner.address
    );
    await moneyRouter.deployed();
});

//Write your tests...
```
