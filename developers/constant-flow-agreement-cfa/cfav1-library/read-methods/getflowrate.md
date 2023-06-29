# getFlowRate

#### **Function Header**

```javascript
/**
 * @dev get flow rate between two accounts for given token
 * @param token The token used in flow
 * @param sender The sender of the flow
 * @param receiver The receiver of the flow
 * @return flowRate The flow rate
 */
function getFlowRate(ISuperToken token, address sender, address receiver)
    internal view returns(int96 flowRate)
```

#### Example Usage

{% embed url="https://github.com/superfluid-finance/super-examples/blob/0b90a34602dc9cab4a10ac59aefebef1bf5384cd/projects/flow-splitter/contracts/FlowSplitter.sol#L94" %}
