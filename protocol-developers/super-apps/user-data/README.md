---
description: Including additional metadata in your Super Apps
---

# 🔢 User Data

Another powerful component of the Superfluid protocol is the ability to pass in additional user data along with your calls to super agreements. Think of it like metadata that can accompany your streams or IDAs 😎

Before we look at user data, let's take a quick dive into a new element: **Context**.

Context is used for several key items within the Superfluid protocol such as gas optimization, governance, security, and SuperApp callbacks. One parameter that's also available for use within the context field is userData.

This is from the host interface ([ISuperfluid.sol)](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol) file inside of our interfaces folder in the Superfluid repo. On line 21, we see `userData`.

```

struct Context {
        //
        // Call context
        //
        // callback level
        uint8 appLevel;
        // type of call
        uint8 callType;
        // the system timestsamp
        uint256 timestamp;
        // The intended message sender for the call
        address msgSender;

        //
        // Callback context
        //
        // For callbacks it is used to know which agreement function selector is called
        bytes4 agreementSelector;
        // User provided data for app callbacks
        bytes userData;

        //
        // App context
        //
        // app allowance granted
        uint256 appAllowanceGranted;
        // app allowance wanted by the app callback
        uint256 appAllowanceWanted;
        // app allowance used, allowing negative values over a callback session
        int256 appAllowanceUsed;
        // app address
        address appAddress;
        // app allowance in super token
        ISuperfluidToken appAllowanceToken;
    }

```

Whenever you see `ctx` being moved around within the protocol, this struct is what's under the hood (it's just compiled down to bytes each time it's passed between functions).

As you can see, `userData` is one of the elements that makes up `Context`. For the sake of this tutorial, we're going to focus exclusively on **`userData`** for the time being.

#### Quick Review: How Are Super Agreements Called Again?

To call a function in a Super Agreement, you first need to use `abi.encode` to compile a function call to the super agreement you're looking to trigger. Then, you need to pass the agreement type, the bytecode of the previously compiled function call, and `userData` to `callAgreement` (we'll get to userData next). The whole process looks like this:

```
//solidity
//Matic Addresses for host and cfa

ISuperfluid host = "0x3E14dC1b13c488a8d5D310918780c983bD5982E7";
IConstantFlowAgreementV1 cfa = "0x6EeE6060f715257b970700bc2656De21dEdF074C";
//DAIx
ISuperToken acceptedToken = "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063";
//empty user data
bytes userData = "0x";

//$1000 DAI per month
int96 flowRate = "385802469135802";

//receiver is arbitrary
address receiver = "0x...";

host.callAgreement(
     cfa,
     abi.encodeWithSelector(
         cfa.createFlow.selector,
         acceptedToken,
				 receiver
         flowRate,
         new bytes(0) // placeholder
     ),
     userData,
);
```

> **Note**: `userData` is always passed into `callAgreement` as type `bytes` .&#x20;

```
//solidity 
//call agreement interface
function callAgreement(
   ISuperAgreement agreementClass,
   bytes calldata callData,
   bytes calldata userData
     )
     external
     //cleanCtx
     returns(bytes memory returnedData);
```

Behind the scenes, your `userData` variable is appended onto `Context`, which is then available to you as a developer in the SuperApp callbacks.

When you execute an operation in the CFA contract for example (and create, update, or delete a flow), you'll have access to the Context that's available after the initial call to the protocol was made. For example, if I pass in `userData` when a create a flow into a Super App, I can decode the `context` & this user data inside any of the super app callbacks, and re-use or manipulate this data as I please. For example, if I send a transaction where `receiver` is a SuperApp, and pass along an encoded string 'hello sir' as `userData`:

```
//solidity
string unformattedUserData = 'hello sir';
bytes userData = abi.encode(unformattedUserData);


host.callAgreement(
     cfa,
     abi.encodeWithSelector(
         cfa.createFlow.selector,
         acceptedToken,
         //receiver is a super app...
	 receiver
         flowRate,
         new bytes(0) // placeholder
     ),
     userData,
);
```

I can decode the context that's passed into the callback, which will give me the Context struct displayed above. Then, since userData is one of the fields on the struct, we can abi.decode userData get back my value of 'hello sir' on the other side:

```
//inside of the afterAgreementCreated Super App Callback

function afterAgreementCreated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32, // _agreementId,
        bytes calldata /*_agreementData*/,
        bytes calldata ,// _cbdata,
        bytes calldata _ctx
    )
        external override
        onlyExpected(_superToken, _agreementClass)
        onlyHost
        returns (bytes memory newCtx)
    {
        
        // decode Contex - this will return the entire Context struct
        ISuperfluid.Context memory decompiledContext = _host.decodeCtx(_ctx);

	//userData is a one of the fields on the Context struct
	//set decodedUserData variable to decoded value
	//this will return 'hello sir'
        decodedUserData = abi.decode(decompiledContext.userData, (string));
        
	//do some stuff with your decodedUserData
        return _doSomeStuff(decodedUserData);
    }
```

UserData can be _any_ arbitrary piece of data. Think of it as metadata that's associated with anything you do in a Super Agreement.

This metadata could be used for a wide variety of use cases:

* You could pass in data to accompany a salary or payment stream - perhaps employee info or product info
* You can send a message along with your distribution in an instant distribution agreement
* You could even pass in the byte code for another entire smart contract.

We invite you to be creative with this!

Next up: a tutorial on how to leverage UserData within your applications.
