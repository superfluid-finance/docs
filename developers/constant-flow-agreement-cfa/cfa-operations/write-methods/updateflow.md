# updateFlow

Lets a sender update an existing stream to a receiver to a new flow rate

```javascript
//load the token you'd like to use like this 
//note that tokens may be loaded by symbol or by address
const daix = await sf.loadSuperToken("DAIx");

let flowOp = daix.updateFlow({
  sender: string,
  receiver: string,
  flowRate: string,
  userData?: string
});

await flowOp.exec( <<ethers signer>> ); // should have same address as `sender`
```

### Parameters

| Parameter  | Type     | Description                                                                                        |
| ---------- | -------- | -------------------------------------------------------------------------------------------------- |
| `sender`   | `string` | Address of sender                                                                                  |
| `receiver` | `string` | Address of receiver                                                                                |
| `flowRate` | `string` | New desired wei/second flow rate at which the `sender` wants to be streaming to the `receiver`     |
| `userData` | `string` | _Optional_ [user data](https://docs.superfluid.finance/superfluid/developers/super-apps/user-data) |

### Example Usage

{% embed url="https://github.com/superfluid-finance/super-examples/blob/main/projects/borrow-against-salary/test/EmploymentLoan.test.js#L174" %}

### Additional Considerations

* If `updateFlow` is called with a `flowRate` that is the same as the current flow rate, it will _not_ revert.
