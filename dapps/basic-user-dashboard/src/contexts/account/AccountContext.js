import React, { useEffect, useState } from "react";
import { getSuperTokenRealTimeBalance, loadNetwork } from "./AccountService";

const AccountStateContext = React.createContext();

export function AccountProvider({ drizzle, drizzleState, children }) {
  const [superFluidTokenAmount, setSuperFluidTokenAmount] = useState(
    "calculating..."
  );
  const [lastRefreshedTime, setLastRefreshedTime] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState(
    "0x0000000000000000000000000000000000000000"
  );
  const [networkType, setNetworkType] = useState();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (!drizzleState.currentBlock.timestamp) return;
    getSuperTokenRealTimeBalance(
      drizzle,
      drizzleState,
      lastRefreshedTime,
      setSuperFluidTokenAmount,
      selectedAccount,
      setLastRefreshedTime
    ).catch(console.error);
  }, [drizzleState.currentBlock.timestamp]);

  useEffect(() => {
    loadNetwork(drizzle).then(setNetworkType).catch(console.error);
  }, []);

  useEffect(() => {
    setIsDisabled(selectedAccount !== drizzleState.accounts[0]);
  }, [selectedAccount]);

  return (
    <AccountStateContext.Provider
      value={{
        drizzle: drizzle,
        drizzleState: drizzleState,
        superFluidTokenAmount: superFluidTokenAmount,
        selectedAccount: selectedAccount,
        networkType: networkType,
        setSelectedAccount: setSelectedAccount,
        isDisabled: isDisabled,
      }}
    >
      {children}
    </AccountStateContext.Provider>
  );
}

export function useAccountContext() {
  const context = React.useContext(AccountStateContext);
  if (context === undefined) {
    throw new Error("useAccountState must be used within a AccountProvider");
  }
  return context;
}
