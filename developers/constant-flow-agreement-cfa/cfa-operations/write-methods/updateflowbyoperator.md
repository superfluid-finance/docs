# updateFlowByOperator

Updates an existing stream from a `sender` to a `receiver` using [ACL permissions](../../cfa-access-control-list-acl/).

```javascript
//load the token you'd like to use like this 
//note that tokens may be loaded by symbol or by address
const daix = await sf.loadSuperToken("DAIx");

let flowOp = daix.updateFlowByOperator({
  sender: string,
  receiver: string,
  flowRate: string,
  userData?: string
});

await flowOp.exec( <<ethers signer>> );
```

### Parameters

| Parameter  | Type     | Description                                                                                        |
| ---------- | -------- | -------------------------------------------------------------------------------------------------- |
| `sender`   | `string` | Address of sender                                                                                  |
| `receiver` | `string` | Address of receiver                                                                                |
| `flowRate` | `string` | New desired wei/second flow rate that `sender` wants to start streaming at to the `receiver`       |
| `userData` | `string` | _Optional_ [user data](https://docs.superfluid.finance/superfluid/developers/super-apps/user-data) |

### Example Usage

[https://codesandbox.io/s/update-flow-as-operator-xceyyz?from-embed=\&file=/src/UpdateFlowAsOperator.js:935-999](https://codesandbox.io/s/update-flow-as-operator-xceyyz?from-embed=\&file=/src/UpdateFlowAsOperator.js:935-999)

### Additional Considerations

* If `updateFlowByOperator` is called with a `flowRate` that is the same as the current flow rate, it will _not_ revert.
