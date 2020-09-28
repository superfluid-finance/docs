import React, { useReducer } from "react";

const initialState = { message: "", isModal: false, messageType: "success" };
const AccountDispatcherContext = React.createContext();
const AccountMessageStateContext = React.createContext();

function accountDispatcher(state, action) {
  switch (action.type) {
    case "success": {
      return { message: "Hello World", isModal: true, messageType: "success" };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function AccountMessageProvider({ children }) {
  const [state, dispatch] = useReducer(accountDispatcher, initialState);
  return (
    <AccountMessageStateContext.Provider value={state}>
      <AccountDispatcherContext.Provider value={dispatch}>
        {children}
      </AccountDispatcherContext.Provider>
    </AccountMessageStateContext.Provider>
  );
}

function useAccountMessageState() {
  const context = React.useContext(AccountMessageStateContext);
  if (context === undefined) {
    throw new Error("useAccountState must be used within a AccountProvider");
  }
  return context;
}

function useAccountDispatch() {
  const context = React.useContext(AccountDispatcherContext);
  if (context === undefined) {
    throw new Error("useAccountDispatch must be used within a AccountProvider");
  }
  return context;
}
