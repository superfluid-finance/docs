# getNetFlow

Get the net flow rate value for an account

```
let res = await sf.cfaV1.getNetFlow({
  superToken: string,
  account: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});
```

### Parameters

| Parameter          | Type                                             | Description                                         |
| ------------------ | ------------------------------------------------ | --------------------------------------------------- |
| `superToken`       | `string`                                         | Address of Super Token being streamed               |
| `account`          | `string`                                         | Address of account you're getting net flow rate for |
| `providerOrSigner` | `ethers.providers.Provider` _or_ `ethers.Signer` | ethers provider or ethers signer object             |

### Return Value(s)

Returns a string with the below info:

| Type     | Description                                                                                                                                                                                                          |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `string` | <p>Net flow rate (wei/second) of <code>account</code> for the specified <code>superToken</code>. </p><p></p><p>Can be positive or negative as it's the sum of the account's inbound and outbound CFA flow rates.</p> |

### Example Usage

{% embed url="https://github.com/superfluid-finance/super-examples/blob/311e5a95d3505dc8c5d8afd420e9edc8b5a57426/projects/borrow-against-salary/test/EmploymentLoan.test.js#L150" %}
