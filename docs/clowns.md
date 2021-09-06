CLOWNS stands for _Chief Liquidation Officer Winner Nomination System_.

# Purpose

Background:  
CFAv1 type agreements (aka streams) require monitoring of the sender solvency. If a sender's balance goes below a protocol defined and flowrate dependent threshold, the protocol allows forced closure of the stream.  
The CLOWNS system provides a framework which was designed to incentivize participation in this process, with the following goals in mind:
* Have a quantifiable safety mechanism
* Avoid inefficiencies and possible griefing attacks due to failed transactions cause by competing solvency agents or frontrunning
* Have several layers backstopping each other

# How it works

## CLO
At the core of the system there is a contract which implements continuous tendering of the _CLO_ role for a SuperToken.  
The acting CLO is granted exclusive permission to liquidate streams during the _priority period_.  
The priority period is the 15 minute time window after a stream becomes critical. In order to gain this privilege, the CLO needs to deposit a bond denominated in the relevant SuperToken.  
Anybody can make a bid for the CLO role at any time. A bid succeeds if the offered bond amount exceeds the bond amount currently in place.  
There's 3 ways for the deposited bond to leave the CLOWNS contract:
* the bond is continuosly streamed to the current CLO with the flowrate set to the _exitRate_ defined by the successful bid
* if a stream denominated in the relevant SuperToken becomes insolvent, the missing amount is taken from the bond once the stream gets eventually closed
* if a higher bid causes the CLO role to be taken over, the previously remaining bond is transferred to the previous CLO

When the CLO terminates a critical stream during the priority period, the remainder of the sender's deposit is transferred to the CLOWNS contract and added to the deposited bond.  

Bidders for the CLO role also need to specify an _exitRate_ which defines the speed at which the deposited bond (+ added rewards) will be streamed back to themselves.  
The protocol defines a lower bound for a valid exitRate relativ to the bond amount in order to encourage some continuity in the CLO role.

## Plebs
If the CLO misses its exclusive time window, anybody is allowed to close the critical stream and get the remainder of the sender deposit as reward.  
Anybody can be a pleb for any token at any time.

## Pirates
If neither the CLO nor a pleb close a stream before it gets insolvent, the pirates can take over.  
Just like with the plebs role, anybody can be a pirate.  
When a pirate closes an already insolvent stream, the streamed amount not covered by the sender balance is taken from the CLOs bond and burned in order make up for the excess tokens in the system.  
Additionally, an amount worth 4 hours of the flowrate of the relevant stream are taken from the bond and transferred to the pirate as a reward.

# How to participate

TODO
