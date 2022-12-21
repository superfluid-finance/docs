# Write Methods

## Using SDK Core Write Operations

Write operations are instantiated and then executed with the `exec` function. See below 👇

```javascript
//load the token you'd like to use like this 
//note that tokens may be loaded by symbol or by address
const daix = await sf.loadSuperToken("DAIx");

// 1) Instantiate operation to create a 100,000 wei/second stream
let createFlowOp = daix.createFlow({
  sender: "0xAbC...",
  receiver: "0xXyZ...",
  flowRate: "100000",
});

// 2) Execute operation on aliceSigner
await createFlowOp.exec(aliceSigner);
```

Conveniently, this lets you recycle the operation. Say you want to call the same `createFlow` operation again - you can reuse the operation object on `aliceSigner`!

```javascript
// 3) USe the same operation object to create 100,000 wei/second stream again
await createFlowOp.exec(aliceSigner);
```

## Method Catalog

```javascript
// Regular Usage

//load the token you'd like to use like this 
//note that tokens may be loaded by symbol or by address
const daix = await sf.loadSuperToken("DAIx");

daix.createFlow({
  sender: string,
  receiver: string,
  flowRate: string,
  userData?: string
});

daix.updateFlow({
  sender: string,
  receiver: string,
  flowRate: string,
  userData?: string
});

daix.deleteFlow({
  sender: string,
  receiver: string,
  userData?: string
});

//ACL Usage

daix.updateFlowOperatorPermissions({
  flowOperator: string,
  permissions: number, // should enter 1-7
  flowRateAllowance: string
});

daix.revokeFlowOperatorPermissions({
  flowOperator: string
})

daix.createFlowByOperator({
  sender: string,
  receiver: string,
  flowRate: string,
  userData?: string
});

daix.updateFlowByOperator({
  sender: string,
  receiver: string,
  flowRate: string,
  userData?: string
});

daix.deleteFlowByOperator({
  sender: string,
  receiver: string,
  userData?: string
})
```
