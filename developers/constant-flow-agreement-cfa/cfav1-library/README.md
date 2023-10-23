---
description: The Super Token Library allows you to work with money streams in Solidity
---

# Solidity

#### **SuperTokenV1Library Contract**

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol" %}

#### **Quickstart Guide**

{% embed url="https://ethglobal.com/guides/introduction-to-superfluid-protocol-be10i#1-introduction" %}
Make a contract that streams money in under 10 minutes!
{% endembed %}

#### **Example Code**

{% embed url="https://github.com/superfluid-finance/super-examples/blob/main/projects/money-streaming-intro/money-streaming-intro-hardhat/contracts/MoneyRouter.sol" %}

## Getting Set To Start Streams

Initialize the SuperTokenV1Library in your constructor with the below code.

### Initializing the Library

```solidity
// initializing the CFA Library
pragma solidity 0.8.14;

import { 
    ISuperfluid 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import { 
    ISuperToken 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";

import {
    SuperTokenV1Library
} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

contract SomeContractWithSuperTokenV1Library {

    using SuperTokenV1Library for ISuperToken;
    ISuperToken public token;
    
    constructor(ISuperToken _token) {
        token = _token;
    }
    
    // your contract code here...
    
}
```

## Interacting With The CFA

{% content-ref url="read-methods/" %}
[read-methods](read-methods/)
{% endcontent-ref %}

{% content-ref url="write-methods/" %}
[write-methods](write-methods/)
{% endcontent-ref %}
