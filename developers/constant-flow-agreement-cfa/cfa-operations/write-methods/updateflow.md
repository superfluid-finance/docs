# updateFlow

Lets a sender update an existing stream to a receiver to a new flow rate

```
let flowOp = sf.cfaV1.updateFlow({
  superToken: string,
  sender: string,
  receiver: string,
  flowRate: string,
  userData?: string
});

await flowOp.exec( <<ethers signer>> ); // should have same address as `sender`
```

### Parameters

| Parameter    | Type     | Description                                                                                        |
| ------------ | -------- | -------------------------------------------------------------------------------------------------- |
| `superToken` | `string` | Address of Super Token being streamed                                                              |
| `sender`     | `string` | Address of sender                                                                                  |
| `receiver`   | `string` | Address of receiver                                                                                |
| `flowRate`   | `string` | New desired wei/second flow rate at which the `sender` wants to be streaming to the `receiver`     |
| `userData`   | `string` | _Optional_ [user data](https://docs.superfluid.finance/superfluid/developers/super-apps/user-data) |

### Example Usage

{% embed url="https://github.com/superfluid-finance/super-examples/blob/311e5a95d3505dc8c5d8afd420e9edc8b5a57426/projects/borrow-against-salary/test/EmploymentLoan.test.js#L178" %}

### Additional Considerations

* If `updateFlow` is called with a `flowRate` that is the same as the current flow rate, it will _not_ revert.
