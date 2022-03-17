---
description: >-
  The CFAv1 Library is a thin layer of abstraction on the Constant Flow
  Agreement V1. This guide covers how to import, initialize, and use the
  library, as well as documentation for each function.
---

# CFAv1 Library

### The CFA Library

The [Constant Flow Agreement library](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/apps/CFAv1Library.sol) (`CFAv1Library.sol)` makes working with the CFA much simpler. Instead of following the `host.callAgreement(...)` pattern, you can make calls to the protocol in fewer lines of code. If you've already looked at the Superfluid [core-sdk](https://github.com/superfluid-finance/protocol-monorepo/tree/dev/packages/sdk-core), then the syntax for creating, updating, and deleting flows will look similar to what you may have already seen. For a more advanced set of examples using the CFA Library, you can refer to [this mock contract](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/mocks/CFALibraryMock.sol).

### Initializing the Library

```
// initializing the CFA Library
pragma solidity ^0.8.0

import { 
    ISuperfluid 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol"; //"@superfluid-finance/ethereum-monorepo/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import { 
    IConstantFlowAgreementV1 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import {
    CFAv1Library
} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

contract CFALibraryMock {

    using CFAv1Library for CFAv1Library.InitData;
    
    //initialize cfaV1 variable
    CFAv1Library.InitData public cfaV1;
    
    constructor(
        ISuperfluid host
    ) {
    
    //initialize InitData struct, and set equal to cfaV1
    cfaV1 = CFAv1Library.InitData(
        host,
        //here, we are deriving the address of the CFA using the host contract
        IConstantFlowAgreementV1(
            address(host.getAgreementClass(
                    keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1")
                ))
            )
        );
    }
    
    //your contract code here...
}
```

### Using the CFA Library

After initializing the library, it gets very simple to create, update, and delete flows:

```
// CFA CRUD functionality
cfaV1.createFlow(receiver, token, flowRate);
cfaV1.updateFlow(receiver, token, flowRate);
cfaV1.deleteFlow(sender, receiver, token);
```

If you'd like, you can also add user data as an optional parameter to each call to the CFA:

```
// with user data
cfaV1.createFlow(receiver, token, flowRate, userData);
cfaV1.updateFlow(receiver, token, flowRate, userData);
cfaV1.deleteFlow(sender, receiver, token, userData);
```

However, it's worth noting that the parameters passed to each function in the library need to be of the same type as the parameters used in the vanilla solidity syntax seen in the beginning of this page:

**`receiver`** - the `address` of the receiver

**`token`** - the `ISuperToken` used in the flow

**`flowRate`** - an `int96` variable which represents the total amount of the `token` you'd like to send per second, denominated in `wei`

**`userData`** - an optional `bytes` value which represents additional data you'd like to pass along with your function call. You can learn more about user data [here](../guides/user-data/).

### Using the CFA Library inside of a Super App

If you need to perform operations with the Constant Flow Agreement inside of Super App callbacks, the syntax for using the library will look somewhat different. You'll need to use the **withCtx** versions of each function. For more on why this is, you can see this section on [callAgreement vs callAgreementWithContext](../super-apps/super-app-callbacks/calling-agreements-in-super-apps.md).

```
// with Ctx - to be used inside of super app callbacks
// NOTE: ctx is a bytes value
cfaV1.createFlowWithCtx(ctx, receiver,token, flowRate);
cfaV1.updateFlowWithCtx(ctx, receiver,token, flowRate);
cfaV1.deleteFlowWithCtx(ctx, sender, receiver,token);

//withCtx & userData - to be used inside of super app callbacks
cfaV1.createFlowWithCtx(ctx, receiver, token, flowRate, userData);
cfaV1.updateFlowWithCtx(ctx, receiver, token, flowRate, userData);
cfaV1.deleteFlowWithCtx(ctx, sender, receiver,token, userData);
```

All other variable fields will are the same as detailed in the previous section, but `ctx` will be the `ctx` which is passed in to the Super App callback by the framework where these functions are being called. This `ctx` value is of type **`bytes`**. For example, in the afterAgreementCreated callback:

```
//in super app callback
function afterAgreementCreated(
    ISuperToken superToken,
    address agreementClass,
    bytes32, // _agreementId,
    bytes calldata /_agreementData/,
    bytes calldata ,// _cbdata,
    bytes calldata ctx
) external returns (bytes memory newCtx) {
    
    //this function takes the callback's ctx value as the first param
    //and returns an updated ctx value upon completion
    return cfaV1.createFlowWithCtx(ctx, receiver,token, flowRate);
}
```

The final parameter passed into the callback - `ctx`, will be passed as the `ctx` value to the withCtx functions within the library.

Each withCtx function in the library also returns a new ctx value as well, which you will need to return inside of the super app callback. Again, more information on this can be found in this section on [callAgreement vs callAgreementWithContext](../super-apps/super-app-callbacks/calling-agreements-in-super-apps.md#callagreement-vs-callagreementwithcontext).

###
