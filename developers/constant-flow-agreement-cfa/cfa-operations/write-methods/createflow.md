# createFlow

Lets a sender create a stream to a receiver.

<pre class="language-javascript"><code class="lang-javascript">//load the token you'd like to use like this 
//note that tokens may be loaded by symbol or by address
const daix = await sf.loadSuperToken("DAIx");
<strong>
</strong><strong>let flowOp = daix.createFlow({
</strong>  sender: string,
  receiver: string,
  flowRate: string,
  userData?: string
});

await flowOp.exec( &#x3C;&#x3C;ethers signer>> ); // should have same address as `sender`
</code></pre>

### Parameters

| Parameter  | Type     | Description                                                                                        |
| ---------- | -------- | -------------------------------------------------------------------------------------------------- |
| `sender`   | `string` | Address of sender                                                                                  |
| `receiver` | `string` | Address of receiver                                                                                |
| `flowRate` | `string` | Desired wei/second flow rate at which the `sender` wants to start streaming to the `receiver`      |
| `userData` | `string` | _Optional_ [user data](https://docs.superfluid.finance/superfluid/developers/super-apps/user-data) |

### Example Usage

{% embed url="https://github.com/superfluid-finance/super-examples/blob/main/projects/borrow-against-salary/test/EmploymentLoan.test.js#L447" %}
