# createFlow

Lets a sender create a stream to a receiver.

```
let flowOp = sf.cfaV1.createFlow({
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
| `flowRate`   | `string` | Desired wei/second flow rate at which the `sender` wants to start streaming to the `receiver`      |
| `userData`   | `string` | _Optional_ [user data](https://docs.superfluid.finance/superfluid/developers/super-apps/user-data) |

### Example Usage

{% embed url="https://github.com/superfluid-finance/super-examples/blob/311e5a95d3505dc8c5d8afd420e9edc8b5a57426/projects/borrow-against-salary/test/EmploymentLoan.test.js#L471" %}
