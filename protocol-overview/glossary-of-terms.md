---
description: Terminology that will be referred to throughout these docs
---

# 📔 Glossary of Terms

### General Conceptual Terms

**Superfluid Ecosystem**: The ecosystem of Superfluid users and Super Apps that utilize and add utility to real-time finance.

**Real-Time Finance**: the second-by-second movement of money made possible on-chain through Superfluid’s smart contract framework

### Super Tokens

**Super Token**: tokens which may be used for any Superfluid related operation. There are 3 types of Super Tokens: ERC20 Wrapper Tokens, Pure Super Tokens, and Native Asset Super Tokens. More can be found on this in our[ section on Super Tokens](../developers/super-tokens/super-tokens/)

**Wrap**: Converting ERC20 tokens to wrapped super tokens. Wrapping will transfer underlying ERC20 assets into the wrapper contract, and mint an equivalent amount of super tokens which are sent back in exchange. You may also see this denoted as `upgrade` in our codebase or on block explorers

**Unwrap**: Converting wrapped super tokens to their underlying ERC20 asset. Unwrapping will transfer the underlying asset back to the caller, and burn an equivalent number of super tokens. You may also see this denoted as `downgrade` in our codebase or on block explorers

**Real Time Balance:** A calculation which determines the balance of a given account that takes into consideration dynamic balances which are determined Superfluid agreement logic as well as static token balances.

### Agreements

**Superfluid Agreement**: A supplementary value transfer functionality that is given to Super Tokens through the Superfluid protocol. These contracts contain logic for how super tokens may be used within the protocol. The two current Super Agreements are the Constant Flow Agreement and the Instant Distribution Agreement. More may be added in the future.

**Constant Flow Agreement (CFA)**: A Super Agreement that allows perpetual second-by-second movement of Super Tokens between addresses.

**Instant Distribution Agreement (IDA):** A Super Agreement that allows mass dispersion of Super Tokens to multiple addresses in accordance with distribution shares (or “units”) at a fixed gas cost.

**Flow**: A continuous stream of money that is sent from one address to another. A sender can only have a single flow open to the same receiver on each token. This term is often used interchangeably with `stream`.

**Flow Rate**: The number of tokens being sent in a stream, denominated in wei per second

**Net Flow Rate:** The net amount of tokens being sent or received per second, in wei, by a given account for a specific token

**ACL (Access Control List)**: A set of features which enables accounts to provide varying levels of control to operators that can `create`, `update`, or `delete` streams on their behalf.

**Index**: A pool that is created using the Instant Distribution Agreement

**Publisher**: The creator of a given Index

**Units**: These are shares which Denominate an address’s overall share of an IDA index. This term is often used interchangeably with `distribution shares`.

**Distribution**: An action that sends tokens to the addresses which own shares in an index. This distribution will be split amongst addresses that are a part of the index in accordance with the number of shares that they own. For example, say a publisher distributes 100 tokens to an index which has 100 shares. If you have 10 shares, you’ll be entitled to 10% of the pool, and in this case, 10 tokens.

### Protocol

**Callback**: A function that will run automatically when specific actions are taken. Super Apps are powerful because developers can implement logic in callbacks that run in response to Superfluid related actions

**User Data**: Arbitrary data which can be passed along with your calls to superfluid specific functions. This userData may be decoded within Super App callbacks, and used within application logic.

**Batch Calls**: A feature of Super Tokens which allow you to batch actions together so that they can all be executed in a single transaction

**The Superfluid Host**: The ‘brain’ of the protocol. Superfluid agreements are whitelisted by the host contract, and the host processes all function calls which intend to make use of features on specific agreements. The host also plays a critical role in protocol governance, and facilitates the execution of adjacent protocol features like Super App callbacks

**Resolver:** A helper contract which allows you to quickly find all the contract addresses which constitute the protocol

### Sentinels & Solvency

**Buffer**: The amount of tokens that an account must temporarily lock up when a stream is started.

**Liquidation**: Occurs when a stream is closed by a sentinel once an account's token balance hits zero while still streaming funds

**Sentinel**: A node that watches the Superfluid network & closes streams when they become critical or insolvent. Anyone can become a Sentinel by running a node

**PIC**: The Patrician in Charge who receives rewards each time a stream is closed in the priority period when an account goes critical

**TOGA**: the Transparent Ongoing Auction which allows anyone to become the Patrician in Charge (PIC) if they put up a higher staked amount than the previous PIC

**Stake**: The amount of funds locked in the TOGA contract by the Patrician in Charge (PIC)

**Top Up:** adding to your Super Token balance such that the address’s balance does not reach zero resulting in liquidation
