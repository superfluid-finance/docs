# Foundry Testing

**Video Tutorial**

For the visually inclined, view our video explainer [**HERE**](https://youtu.be/C\_PGd8CPdfg?t=485).

**Example Code**

{% embed url="https://github.com/superfluid-finance/super-examples/blob/main/projects/money-streaming-intro/money-streaming-intro-foundry/test/MoneyRouter.t.sol" %}
Foundry test suite from our Money Router example
{% endembed %}

## Foundry Example

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
