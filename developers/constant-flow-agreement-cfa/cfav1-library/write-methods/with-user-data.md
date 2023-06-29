# With User Data

Superfluid offers you the option to provide additional data you'd like to pass along with your function call via the userData parameter which is overloaded onto the create/update/delete-Flow functions.

<pre class="language-solidity"><code class="lang-solidity">// Same function call just with additional parameter for user data
<strong>token.createFlow(address receiver, int96 flowRate, bytes memory userData);
</strong>token.updateFlow(address receiver, int96 flowRate, bytes memory userData);
token.deleteFlow(address sender, address receiver, bytes memory userData);
</code></pre>

You can learn more about the usefulness of user data [here](../../../super-apps/user-data/).
