---
description: How to use the SDK Core to write subgraph queries and get account data
---

# Getting Data

When working on a Superfluid related application, you’ll likely need to use the graph to query data about what’s happening with your users & Superfluid agreements.

Luckily, the SDK-Core has functionality which will allow you to easily query the graph to get data about accounts & their interaction with the Superfluid protocol. You can also use the CFAV1 & IDAV1 methods to get data that is specific to those agreements. In this section, we’ll show allow you to get this data. If you'd like to go deeper on the topic, we'd recommend reading through our section on the Superfluid [Subgraph](../subgraph.md).

## Pre-Defined Subgraph Queries

Here is a list of pre defined queries you can use via the sdk. Once the framework is initialized, you can use the pattern modeled below to run each query (i.e. `sf.query.INSERT_QUERY` ).

```javascript
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers } = require("ethers");

const provider = new ethers.providers.InfuraProvider(
  "matic",
  "<INFURA_API_KEY>"
);
const sf = await Framework.create({
  networkName: "matic",
  provider
});

type Paging = { take: number, skip?: number, lastId?: string };

const pageResult = await sf.query.
  // The different queries can take different order by properties 
  // given the properties that exist on the entity itself.
  listAllSuperTokens({ isListed?: boolean },
    paging: Paging,
    ordering: Ordering<Token_OrderBy>
  );

  listIndexes({ indexId?: string, publisher?: string, token?: string },
    paging: Paging,
    ordering: Ordering<Index_OrderBy>
  );

  listIndexSubscriptions({ subscriber?: string, approved?: boolean },
    paging: Paging,
    ordering: Ordering<IndexSubscription_OrderBy>
  );

  listStreams({ sender?: string, receiver?: string, token?: string },
    paging: Paging,
    ordering: Ordering<Stream_OrderBy>
  );

  listUserInteractedSuperTokens({ account?: string, token?: string },
    paging: Paging,
    ordering: Ordering<AccountTokenSnapshot_OrderBy>
  );

  listEvents({ account?: string, timestamp_gt?: number },
    paging: Paging,
    ordering: Ordering<Event_OrderBy>
  );

  // A subscription function which allows you to subscribe to events via polling.
  on(
        callback: (events: AllEvents[], unsubscribe: () => void) => void,
        ms: number,
        account?: string,
        timeout?: number
    )
```

### Direct Initialization

If you'd like, you can also initialize the `Query` class as a standalone class like so:

```javascript
import { Query } from "@superfluid-finance/sdk-core";
const query = new Query({
  customSubgraphQueriesEndpoint: "<A_CUSTOM_ENDPOINT>",
  dataMode: "SUBGRAPH_ONLY" | "SUBGRAPH_WEB3" | "WEB3_ONLY"
});
```

### Pagination

All of the pre-defined query functions will accept pagination options: `({ skip: number, take: number })`, if you don't pass anything in, it will use a default of: `{ skip: 0, take: 100 }`. You can also paginate by `lastId`, this allows you to bypass the limitation of the max skip of 5000 entities.

> **Note**: this example uses the `graphql-request` library, but you just need to provide a valid query which is a string.

### Ordering

You can also pass in an ordering object for the different queries, each query function will accept different ordering properties depending on the properties on the entity. We have different defaults for each so you don't need to actually pass anything in.

#### Example Usage:

```javascript
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers } = require("ethers");

const provider = new ethers.providers.InfuraProvider(
	"matic",
	"<INFURA_API_KEY>"
);
const sf = await Framework.create({
  networkName: "matic",
	provider
});
const results = await sf.query.listAllSuperTokens(
  { isListed: true },
  { skip: 5, take: 150 },
  {
    orderBy: "createdAtBlockNumber",
    orderDirection: "desc"
  });
```

## Getting Data from Agreements

#### CFAV1 Read Operations

```javascript
// Read functions
await sf.cfaV1.getFlow({
  superToken: string,
  sender: string,
  receiver: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});

await sf.cfaV1.getAccountFlowInfo({
  superToken: string,
  account: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});

await sf.cfaV1.getNetFlow({
  superToken: string,
  account: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});
```

#### IDAV1 Read Operations

```javascript
// Read functions
await sf.idaV1.getSubscription({
  superToken: string,
  publisher: string,
  indexId: string,
  subscriber: string,
  providerOrSigner: string
});

await sf.idaV1.getIndex({
  superToken: string,
  publisher: string,
  indexId: string,
  providerOrSigner: string
});
```

#### Super Token Read Operations

```javascript
// Read functions
await usdcx.balanceOf({
  account: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});

await usdcx.allowance({
  owner: string,
  spender: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});

await usdcx.name({
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});

await usdcx.symbol({
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});

await usdcx.totalSupply({
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});
```
