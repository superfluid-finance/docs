---
description: How to deploy the framework locally for testing in Foundry & Hardhat
---

# Testing Guide

Testing is a critical component of building any piece of software. When testing locally with Superfluid, you’ll need to deploy the framework first before running your tests. Below, you’ll find examples on how to do this in common web3 development environments. No matter what environment you choose to use, setting up a test suite for a Superfluid project has two components:

1. Deploying the framework
2. Minting fake super tokens to use within your tests

{% hint style="info" %}
💡 These examples reference the MoneyRouter contract which is covered in detail in [this video](https://www.youtube.com/watch?v=1mwbYQ429IU\&t=244s) on money streaming in solidity.
{% endhint %}

### Video Tutorial

For the visually inclined, we also have a video on this topic.

{% embed url="https://youtu.be/C_PGd8CPdfg" %}

### Hardhat Example

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

### Foundry Example

Within a foundry test file, you can call the SuperfluidFrameworkDeployer contract directly in your `setUp()` function.

```solidity
import "forge-std/Test.sol";
import "../../contracts/MoneyRouter.sol";
import {ISuperfluid} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {
    SuperfluidFrameworkDeployer,
    TestGovernance,
    Superfluid,
    ConstantFlowAgreementV1,
    CFAv1Library,
    SuperTokenFactory
} from "@superfluid-finance/ethereum-contracts/contracts/utils/SuperfluidFrameworkDeployer.sol";

contract StreamRebounderRandomTest is Test {

    StreamRebounder public streamRebounder;
    
    struct Framework {
        TestGovernance governance;
        Superfluid host;
        ConstantFlowAgreementV1 cfa;
        CFAv1Library.InitData cfaLib;
        InstantDistributionAgreementV1 ida;
        IDAv1Library.InitData idaLib;
        SuperTokenFactory superTokenFactory;
    }

    SuperfluidFrameworkDeployer.Framework sf;
    
    function setUp() public {
				
	address public owner;
	//DEPLOYING THE FRAMEWORK
        SuperfluidFrameworkDeployer sfDeployer = new SuperfluidFrameworkDeployer();
        sf = sfDeployer.getFramework();
				
	// DEPLOYING DAI and DAI wrapper super token

	vm.prank(owner);
	ISuperToken daix = sfDeployer.deployWrapperToken(
	    "Fake DAI", "DAI", 18, 10000000000000
	);
	
        MoneyRouter = new StreamRebounder(
            sf.host,
            owner
        );
    }

    //add other functions and test contracts...

}
```

When using foundry, you'll need to install `superfluid-finance/ethereum-contracts`. If you have issues when running `forge install`, try using the `--no-commit` flag.

### But what about truffle/brownie/other environment?

We have a legacy truffle example that you can find [here](https://github.com/superfluid-finance/protocol-monorepo/blob/chainshot/examples/archive/tradeable-cashflow-truffle/test/TradeableCashflow.test.js). It is very similar to the Hardhat example above, but with some minor differences in terms of imports & scripts used for framework deployment.

A brownie/python example is in the works. Stay tuned (:

If you have any questions on how to set up your tests for a Superfluid project, please contact us in discord.&#x20;

{% embed url="https://discord.superfluid.finance" %}
