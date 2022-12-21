# deleteFlow

Lets a sender delete an existing stream to a receiver

```javascript
//load the token you'd like to use like this 
//note that tokens may be loaded by symbol or by address
const daix = await sf.loadSuperToken("DAIx");

let flowOp = daix.deleteFlow({
  sender: string,
  receiver: string,
  userData?: string
});

await flowOp.exec( <<ethers signer>> ); // should have same address as sender
```

### Parameters

| Parameter  | Type     | Description                                                                                        |
| ---------- | -------- | -------------------------------------------------------------------------------------------------- |
| `sender`   | `string` | Address of sender                                                                                  |
| `receiver` | `string` | Address of receiver                                                                                |
| `userData` | `string` | _Optional_ [user data](https://docs.superfluid.finance/superfluid/developers/super-apps/user-data) |

### Example Usage

{% embed url="https://github.com/superfluid-finance/super-examples/blob/main/projects/borrow-against-salary/test/EmploymentLoan.test.js#L399" %}

### Additional Considerations

* If there is already no stream from sender to receiver, then `deleteFlow` will revert.
