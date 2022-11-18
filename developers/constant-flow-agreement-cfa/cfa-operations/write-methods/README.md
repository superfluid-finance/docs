# Write Methods

## Using SDK Core Write Operations

Write operations are instantiated and then executed with the `exec` function. See below 👇

```javascript
// 1) Instantiate operation to create a 100,000 wei/second stream
let createFlowOp = sf.cfaV1.createFlow({
  sender: "0xAbC...",
  receiver: "0xXyZ...",
  superToken: daix.address,
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

sf.cfaV1.createFlow({
  sender: string,
  receiver: string,
  superToken: string,
  flowRate: string,
  userData?: string
});

sf.cfaV1.updateFlow({
  sender: string,
  receiver: string,
  superToken: string,
  flowRate: string,
  userData?: string
});

sf.cfaV1.deleteFlow({
  sender: string,
  receiver: string,
  superToken: string,
  userData?: string
});

//ACL Usage

sf.cfaV1.updateFlowOperatorPermissions({
  flowOperator: string,
  permissions: number, // should enter 1-7
  flowRateAllowance: string,
  superToken: string
});

sf.cfaV1.revokeFlowOperatorPermissions({
  flowOperator: string,
  superToken: string
})

sf.cfav1.createFlowByOperator({
  sender: string,
  receiver: string,
  flowRate: string,
  superToken: string,
  userData?: string
});

sf.cfaV1.updateFlowByOperator({
  sender: string,
  receiver: string,
  flowRate: string,
  superToken: string,
  userData?: string
});

sf.cfaV1.deleteFlowByOperator({
  sender: string,
  receiver: string,
  superToken: string,
  userData?: string
})
```
