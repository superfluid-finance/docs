# Read Methods

### Getting Stream Data

To view stream data, you can use the following functions

```solidity
// Get the flow data between `sender` and `receiver` of `token`
token.getFlowInfo(
    address sender,
    address receiver
) external view returns (
    uint256 timestamp,     // when the stream was started
    int96 flowRate,        // wei/second flow rate between sender and receiver
    uint256 deposit,       // security buffer held during the lifetime of the flow
    uint256 owedDeposit    // Extra deposit amount borrowed to a SuperApp receiver by the flow sender
);

token.getFlowRate(
    address sender,
    address receiver
) external view returns (
    int96 flowRate      // wei/second flow rate between sender and receiver
);


// Get the net flow rate of the account, accounting for all inbound/outbound streams
token.getNetFlowRate(
    address account
) external view returns (
    int96 flowRate         // net flow rate
);
```
