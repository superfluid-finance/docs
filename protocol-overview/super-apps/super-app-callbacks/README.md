---
description: Making use of hooks that run before or after an agreement is called
---

# ☎ Super App Callbacks

### Super App Callbacks

Super App callbacks are run when a Super App is on the receiving end of a transaction that creates, updates, or deletes a stream in relation to that app.

**When Will Super App Callbacks Run?**

A Super App callback will run when a stream is created or updated where the app is the `receiver` of the stream. It will also run when a stream is deleted by a user or contract that is external to the Super App. While streams can only be created or updated by the sender of the stream, a stream may be deleted by _either the sender or the receiver_ of that stream. This means that the `beforeAgreementTerminated` or `afterAgreementTerminated` callback will run if a stream that was being sent into the Super App was deleted by the sender, or if a stream being sent from the Super App to another address was deleted by the receiver of that stream.

**Who is Calling the Super App Callback?**

Callbacks are called entirely on chain by the Superfluid protocol in response to events. Each time an action is taken inside of the Constant Flow Agreement contract, the protocol will check the Super App registry to determine whether or not the stream will be sent to a Super App (or if the stream being deleted involves a Super App in the event of deletion). If it doesn't involve a Super App, there are no callbacks to run, so the stream is created, updated, or deleted without any other operation. However, if the protocol finds that the stream indeed does involve a Super App after a check to the Superfluid Super App manifest, it will call the necessary callback(s).

#### The Anatomy of Super App Callbacks:

```
function beforeAgreementCreated(
        ISuperToken /*superToken*/,
        address /*agreementClass*/,
        bytes32 /*agreementId*/,
        bytes calldata /*agreementData*/,
        bytes calldata /*ctx*/
    )
        external
        view
        virtual
        override
        returns (bytes memory /*cbdata*/)
    {
        revert("Unsupported callback - Before Agreement Created");
    }

```

```
    function afterAgreementCreated(
        ISuperToken /*superToken*/,
        address /*agreementClass*/,
        bytes32 /*agreementId*/,
        bytes calldata /*agreementData*/,
        bytes calldata /*cbdata*/,
        bytes calldata /*ctx*/
    )
        external
        virtual
        override
        returns (bytes memory /*newCtx*/)
    {
        revert("Unsupported callback - After Agreement Created");
    }
```

A `beforeAgreement` callback will be run before the call to the agreement contract will be run. For example, if there is logic inside of the `beforeAgreementCreated` callback within of a Super App, and a user opens a stream into that Super App contract, the logic inside of `beforeAgreementCreated` will run before the stream is created.&#x20;

Similarly, an `afterAgreement` callback will be run after the call to the agreement contract is run. For example, if there is logic inside of the `afterAgreementCreated` callback within a Super App, and a user opens a stream into that Super App contract, the logic inside of `afterAgreementCreated` will run after the stream is created.

One additional thing to note about the `beforeAgreement` callbacks is that they are `view` functions. So, if you want to, for example, save a variable to state in response to something that happens in the `beforeAgreement` callback, you should do the following:

1. Return the data that you want to save inside the `beforeAgreement` callback (this returned value will be passed to the `afterAgreement` callback as `cbdata`, which we explain below)
2. Save the variable to state inside of the `afterAgreement` callback
3. Make sure that you have an implementation for both the `beforeAgreement` and `afterAgreement` callbacks

**Breaking Down Each Variable**

**`ISuperToken`** - the protocol will pass the Super Token that's being used in the call to the constant flow agreement contract here.

**`address`** - this will be the address of the Constant Flow Agreement contract on the network you're interacting with. You can find more details around these networks inside of the Superfluid network directory.

**`agreementId`** - a bytes32 value that is a hash of the sender and receiver's address of the flow that was created, updated, or deleted.

**`agreementData`** - the address of the sender and receiver of the flow that was created, updated, or deleted - encoded using solidity's `abi.encode()` built in function

**`cbdata` -** this contains data that was returned by the `beforeAgreement` callback _if_ it was run prior to the calling of `afterAgreement` callback. **Note**: this is only passed to the `afterAgreement` callback

**`ctx`** - this contains data about the call to the constant flow agreement contract itself. 'Ctx' is short for 'context' and is explained in depth inside of our tutorial on userData (which you can access inside of the `ctx` value).

###
