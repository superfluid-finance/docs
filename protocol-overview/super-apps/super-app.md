---
description: Using Super Apps To Create Programmable Cashflows
---

# 📖 Super Apps in Depth

### **What is a Super App?**

A Super App is a contract that reacts on-chain to changes within super agreements that the contract is associated with. They may be used in conjunction with the Superfluid Constant Flow Agreement (CFA) to create truly programmable cashflows.

Super Apps allow us to build smart contracts that are fully integrated with Superfluid at the protocol level. If you've looked at our [Tradeable Cashflow](https://docs.superfluid.finance/superfluid/protocol-tutorials/super-apps) tutorial or our [User Data](https://docs.superfluid.finance/superfluid/docs/user-data) tutorial, we are using a Super App in each of those sample applications.

![The Tradeable Cashflow NFT](<../../.gitbook/assets/image (29) (1).png>)

For example, the tradeable cashflow NFT contract receives a stream, and then uses special callbacks within the SuperApp to automatically open up a new stream from the NFT to the owner of the NFT. The contract 'listens' for a call to a Superfluid super agreement contract (the Constant Flow Agreement contract), and runs a single callback function in response to the following 3 actions:

1. A flow is opened with the Super App as the `receiver`
2. A flow is updated which has the Super App as the `receiver`
3. A flow is closed by the Super App's counter party (i.e. if either the _sender_ of a flow into the Super app or the _recipient_ of a flow from the Super App deleted the flow, a callback will be run). As of today, this is only relevant for the case of canceled flows.

When a stream is created into a Super App (this will make the Super App the `receiver` ), the `beforeAgreementCreated` and the `afterAgreementCreated` callback may be run. These callbacks can execute any arbitrary logic, as long as this logic fits within the rules of standard smart contract development and the rules of Super Apps (which are explained further later on in this section).

In the case of the tradeable cashflow contract, the logic we include inside of the `afterAgreementCreated` callback will open up a money stream from the app to the NFT's owner in an amount that is equal to the `flowRate` into the app.

Super Apps like the tradeable cashflow example keep their callback logic simple, while others get more advanced and leverage items like `userData` for additional functionality.

Some of the most interesting projects in our ecosystem, such as Ricochet Exchange, make heavy use of Super App callbacks.

### Super App Configuration

For a Super App to be able to use callbacks, it must first be 'registered' with the protocol. This is done using a pattern similar to the [ERC1820 registry system](https://eips.ethereum.org/EIPS/eip-1820) (which is also used to enable ERC777 callbacks - something you can also access within Super Tokens). To register a Super App, you need to add the following code to your Super App's constructor:

```
// by default, all 6 callbacks defined in the ISuperApp interface
// are forwarded to a SuperApp.
// If you inherit from SuperAppBase, there's a default implementation
// for each callback which will revert.
// Developers will want to avoid reverting in Super App callbacks, 
// In particular, you want to avoid reverting within the termination callback
// (see rules below regarding the termination callback for more info)
// you need to make sure only those actually implemented (overridden)
// are ever invoked. That's achieved by setting the _NOOP flag for those
// callbacks which you don't need and didn't implement.
uint256 configWord =
            SuperAppDefinitions.APP_LEVEL_FINAL |
            SuperAppDefinitions.BEFORE_AGREEMENT_CREATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_UPDATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP;

// can be an empty string in dev or testnet deployments
string memory registrationKey = "";

        _host.registerAppWithKey(configWord, registrationKey);
```

Running `_host.registerAppWithKey` and passing in the `configWord` will enable your Super App to be registered within the Superfluid host contract's Super App manifest. This will allow it to be managed under basic Superfluid governance parameters and ensure that callbacks are run as intended.

The `APP_LEVEL_FINAL` must be set as seen above for now. This parameter refers to which (and how many) callbacks will be run within a hypothetical chain of Super Apps. During the creation of the protocol, we had to decide how Super Apps would behave if a chain of callbacks could have the potential to execute in succession.

For example, if a user calls a Super app, then that app calls another Super App, do the Super App callbacks run in both contracts, the second contract in the chain of events, or the first contract in the chain of events? The answer to this question, as of Q4 2021, is that the callbacks are run within the **first app only.** However, this is a parameter which will be subjected to Superfluid governance moving forward, and may change. Developers should build with this in mind. How could your app be impacted by multiple callbacks being able to run in succession in multiple apps?

The `_NOOP` designations are also important as they allow you to specify which callbacks you'd like to use in your Super App. Callbacks can run **before** and/or **after** an agreement function runs. You can have logic that runs in either or both cases, and also choose not to implement certain callbacks.

As we explain in the comments within the code sample above, If you inherit from the [SuperAppBase](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/apps/SuperAppBase.sol) contract, there's a default implementation for each callback which will revert. SuperApps are jailed when a revert happens, so it's critical to ensure you have a well-tested implementation for each callback, and that you use the `_NOOP` pattern to prevent the callbacks you _don't_ wish to use from running. In the case of an app that only uses the `afterAgreement` callbacks, you'll want to add the `_NOOP` flag to each callback you won't be using - in this case the `beforeAgreement` callbacks. This can be done like so within your `configWord` variable.

```jsx
SuperAppDefinitions.BEFORE_AGREEMENT_CREATED_NOOP |
SuperAppDefinitions.BEFORE_AGREEMENT_UPDATED_NOOP |
SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP;
```

Finally, you can register your app using `_host.registerAppWithKey(configWord)` or with `_host.registerAppByFactory(app, configWord)`.

You can do this freely on testnets, but on mainnets pre-approval of Super Apps is needed for now.\
Navigate to [this guide](https://github.com/superfluid-finance/protocol-monorepo/wiki/Super-App-White-listing-Guide) in order to find out how to get that done.

### Super App Deposits

When a user first creates a Superfluid stream, the protocol will take a security deposit and hold it in escrow until the completion of the stream. These deposits are sized as follows:

* On testnets, when the flow is being sent to a recipient that is _not_ a Super App, this amount is 1hr x the `flowRate`
* On testnets, when the flow is being sent to a recipient that _is_ a Super App, the deposit amount can be up to 2hrs x the `flowRate`
* On mainnet, when the flow is being sent to a recipient that is _not_ a Super App, the deposit amount is 4hrs x the `flowRate`
* On mainnet, when the flow is being sent to a recipient that _is_ a Super App, the deposit can be up to 8hrs x the `flowRate`.

**Why is the deposit 2x when sending a stream to a Super App?**

Because Super Apps are designed to create programmable cashflows, the protocol needs to ensure that Super Apps don't execute logic that could render the protocol insolvent. The caller of the stream being sent to the super app is essentially covering the deposit of the Super App.

This higher deposit provides an extra incentive for the protocol to ensure that users sending streams into super apps maintain a balance > 0. It protects the protocol from cascading effects resulting from an insolvent Super App. There are additional requirements around Super App solvency that you'll find in the list of Super App rules we define below.

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

A `beforeAgreement` callback will be run before the call to the agreement contract will be run. For example, if there is logic inside of the `beforeAgreementCreated` callback within of a Super App, and a user opens a stream into that Super App contract, the logic inside of `beforeAgreementCreated` will run before the stream is created.

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

### Super App Rules (Jail System)

Super Apps are a powerful concept within the Superfluid ecosystem. They allow for new levels of creativity - specifically related to _programmable cash flows._

However, there are specific rules that have been encoded into the protocol which SuperApps must abide by.

Super App rules should be obeyed at all cost by developers, or they risk their contract being jailed by the protocol. What does it mean for an app to be 'jailed' exactly? We apply the term `jailed` to refer to a Super App that failed to comply with the set of rules encoded into the Superfluid framework. This does **not** mean that someone on the Superfluid team is exerting arbitrary control over your Super Apps.

These rules have been written into the protocol at the software level, and are simply designed to place basic security guardrails on Super Apps. Complex systems in our industry have constraints, and you can think of Super App rules as an extension of those constraints that apply to this subset of the protocol.

> 💡 These rules are a set of restrictions placed on Super Apps that are built into the protocol to protect users. However, these rules are not comprehensive and cannot guarantee that a SuperApp will be 100% safe. Each user should review the Super Apps they are interacting with, and developers should take care to write secure, well-tested Super App code.

#### **Here's an overview of each rule:**

1\) Super Apps cannot revert in the termination callback (`afterAgreementTerminated()`)

* Use the **trycatch** pattern if performing an action which interacts with other contracts inside of the callback. Doing things like transferring tokens without using the **trycatch** pattern is dangerous and should be avoided.
* Double check internal logic to find **any revert possibility.**

2\) Super Apps can't became insolvent.

* Check if any interaction can lead to **insolvency** situation.
* What is an **insolvency** situation? This occurs when a Super App tries to continue sending funds that it no longer has. Its super token balance must stay > 0 at minimum. You can learn more about liquidation & solvency [in our section on this topic.](https://docs.superfluid.finance/superfluid/docs/liquidations-and-toga)

3\) Gas limit operations within the termination callback (`afterAgreementTerminated()`)

* There is a limit of gas limit send in a callback function (_3000000 gas units)_
* If the Super App reverts on terminations calls because of an _out-of-gas_ error, it will be jailed.
* For legitimate cases where the app reverts for _out-of-gas_ (below the gas limit), the Super App is subject to user decision to send a new transaction with more gas. If the app still reverts, it will be jailed.
* To protect against these cases, **don't create Super Apps that require too much gas within the termination callback**.

4\) Incorrect ctx (short for **context)** data within the termination callback

* **Any attempt to tamper with the value of `ctx`** or failing to give the right **`ctx`** will result in a Jailed App.
* Any time a protocol function returns a `ctx`, that `ctx` should be passed to the next called function. It will repeat this process even in the return of the callback itself.
* For more information on `ctx` and how it works you can check out our tutorial on userData.

For good Super App examples, you can head to our examples repo, as well as the Super App tutorial and User Data tutorial. If you have a Super App you'd like to build, please reach out to us in the #developers channel of our discord and someone on our team will be there to help you get started.
