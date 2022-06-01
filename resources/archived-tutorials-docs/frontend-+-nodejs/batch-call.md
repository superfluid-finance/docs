---
description: Perform multiple steps in a single transaction
---

# Batch Calls with JS SDK

> #### IMPORTANT NOTE
>
> The _JS-SDK is a legacy SDK_ that is no longer being maintained We strongly recommend that new developers **use the** [**SDK-Core**](../../../developers/sdk-initialization/) **or** [**SDK-Redux.**](https://www.npmjs.com/package/@superfluid-finance/sdk-redux)\*\*\*\*

The Batch Call feature allows you to perform multiple steps in a single transaction, including calls for Super Tokens, Super Apps, and both at the same time.

The primary goal of the Batch Call is to provide you (and your users) with an easy on/off-ramp to your Super App. It allows smooth user-experiences, without spending precious resources on solidity research and engineering for ad-hoc multi-step transactions.

Instead, you can focus on writing your Super App quickly and intuitively. Once you're satisfied with the basic functionality, it's only a matter of "wrapping up" functions into a Batch Call.

### Example

To get a better understanding of what is possible, lets look at the canonical "Flow Lottery" example. In this app, when a new user wishes to participate in the lottery, they are required to perform the following steps:

1. Approve DAI spending by the Superfluid Host
2. Upgrade DAI to DAIx
3. Approve DAI spending by the app for the ticket fee
4. Call the app function `participate` to pay the ticket fee
5. Start a new flow of DAIx to the app

Since step #1 in the list above involves the DAI ERC20 contract, we cannot batch this. However, we can combine steps #2-5 into a single transaction, since the user is now within the Superfluid Framework.

```javascript
function createPlayBatchCall(upgradeAmount = 0) {
        return [
            [
                101, // upgrade 100 daix to play the game
                daix.address,
                web3.eth.abi.encodeParameters(
                    ["uint256"],
                    [toWad(upgradeAmount).toString()]
                )
            ],
            [
                1, // approve the ticket fee
                daix.address,
                web3.eth.abi.encodeParameters(
                    ["address", "uint256"],
                    [app.address, toWad("1").toString()]
                )
            ],
            [
                202, // callAppAction to participate
                app.address,
                app.contract.methods.participate("0x").encodeABI()
            ],
            [
                201, // create constant flow (10/mo)
                sf.agreements.cfa.address,
                web3.eth.abi.encodeParameters(
                    ["bytes", "bytes"],
                    [
                        sf.agreements.cfa.contract.methods
                            .createFlow(
                                daix.address,
                                app.address,
                                MINIMUM_GAME_FLOW_RATE.toString(),
                                "0x"
                            )
                            .encodeABI(), // callData
                        "0x" // userData
                    ]
                )
            ]
        ];
    }
    
    // Call the host with the batch call parameters
    await sf.host.batchCall(createPlayBatchCall(100))
```

To see full code, check out the [Flow Lottery example](https://github.com/superfluid-finance/protocol-monorepo/blob/0e2a60fc31ba4f62c024290747dc6775dc19a978/examples/flowlottery/test/LotterySuperApp.test.js#L88)

### Usage

In total, there are three main types of batch calls. Each type executes a function on either the host contract (Superfluid.sol), or a specific SuperToken. This table shows each possible combination:

| Type        | interface       | internal call                                                                            |
| ----------- | --------------- | ---------------------------------------------------------------------------------------- |
| Super Token | ISuperToken.sol | `operationApprove`, `operationTransferFrom`, `operationUpgrade`, or `operationDowngrade` |
| Agreement   | Superfluid.sol  | `_callAgreement`                                                                         |
| Super App   | Superfluid.sol  | `_callAppAction`                                                                         |

In order to select which operation you want, the `BatchOperation` helper library is provided, which just stores constants like this:

```javascript
library BatchOperation {
    uint32 constant internal OPERATION_TYPE_ERC20_APPROVE = 1;
    uint32 constant internal OPERATION_TYPE_ERC20_TRANSFER_FROM = 2;
    uint32 constant internal OPERATION_TYPE_SUPERTOKEN_UPGRADE = 1 + 100;
    // ...
}
```

Simply import the library and reference the appropriate constant:

```javascript
import {
    BatchOperation
} from "@superfluid-finance/ethereum-contracts/interfaces/superfluid/ISuperfluid.sol";

await sf.host.batchCall([
        BatchOperation.OPERATION_TYPE_ERC20_APPROVE,
        daix.address,
        web3.eth.abi.encodeParameters(
            ["address", "uint256"],
            [app.address, toWad("1").toString()]
        )
    ],
    [
        BatchOperation.OPERATION_TYPE_SUPERFLUID_CALL_APP_ACTION
        app.address,
        app.contract.methods.participate("0x").encodeABI()
    ]
)
```

Alternatively, you can manually enter the numerical value for the operation you want. Use the quick-reference table here to see all available options:

| Operation                                      | Value |
| ---------------------------------------------- | ----- |
| OPERATION\_TYPE\_ERC20\_APPROVE                | 1     |
| OPERATION\_TYPE\_ERC20\_TRANSFER\_FROM         | 2     |
| OPERATION\_TYPE\_SUPERTOKEN\_UPGRADE           | 101   |
| OPERATION\_TYPE\_SUPERTOKEN\_DOWNGRADE         | 102   |
| OPERATION\_TYPE\_SUPERFLUID\_CALL\_AGREEMENT   | 201   |
| OPERATION\_TYPE\_SUPERFLUID\_CALL\_APP\_ACTION | 202   |

For example in your Super App you would write the following:

```javascript
sf.host.batchCall([
        1, // OPERATION_TYPE_ERC20_APPROVE
        daix.address,
        web3.eth.abi.encodeParameters(
            ["address", "uint256"],
            [app.address, toWad("1").toString()]
        )
    ],
```

Depending on which operation you select, the host contract will execute the appropriate function. For `transferFrom` the host exectues the following:

```javascript
} else if (operationType == BatchOperation.OPERATION_TYPE_ERC20_TRANSFER_FROM) {
    (address sender, address receiver, uint256 amount) =
        abi.decode(operations[i].data, (address, address, uint256));
    ISuperToken(operations[i].target).operationTransferFrom(
        msgSender,
        sender,
        receiver,
        amount);
```

For an agreement call (IDA or CFA) thie host executes the following:

```
} else if (operationType == BatchOperation.OPERATION_TYPE_SUPERFLUID_CALL_AGREEMENT) {
    (bytes memory callData, bytes memory userData) = abi.decode(operations[i].data, (bytes, bytes));
    _callAgreement(
        msgSender,
        ISuperAgreement(operations[i].target),
        callData,
        userData);
```

### Putting it all together

Now that you understand what is possible, you should ask yourself the following questions. After answering these, you should be able to identify which parts of your app can be improved by combining multiple transactions into a Batch Call.

* **Onboarding**: What tokens does the user show up with? How can I quickly get them "into the system" with as few transactions as possible?
* **Ongoing Actions**: What types of transactions are users making often? Can I combine them together to reduce the user's burden?
* **Exiting**: Users should typically leave with a feeling of accomplishment. How can I leave a lasting impression on users while they are exiting.

### Other Resources

If you want a visual example on how batch calls can be used and stacked together, we'd highly suggest checking out [https://build-a-batchcall.com/](https://build-a-batchcall.com/). You can drag and drop batch call operations together with no code, and get a sense of how they can be used in practice 🤯

**Note**: the Build a Batch Call application is for educational purposes only and was created by [https://github.com/JoshuaTrujillo15/JoshuaTrujillo15](https://github.com/JoshuaTrujillo15/JoshuaTrujillo15) - an active member of the Superfluid community.
