import React, { createContext, useContext } from "react";

import useProductActions from "../actions/productActions";
import useCategoryActions from "../actions/categoryActions";
import useModalActions from "../actions/modalActions";
import useSnackBarActions from "../actions/snackBarActions";
import useLoginActions from "../actions/loginActions";

const StoreContext = createContext();

function StoreProvider({ children }) {
  const useProductStore = useProductActions();
  const useCategoryStore = useCategoryActions();
  const useModalStore = useModalActions();
  const useSnackBarStore = useSnackBarActions();
  const useLoginStore = useLoginActions();

  const stores = {
    useProductStore,
    useCategoryStore,
    useModalStore,
    useSnackBarStore,
    useLoginStore
  };

  return (
    <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
  );
}

// This hook will be used to inject the stores on the component we want

export function useStore(storeName) {
  const stores = useContext(StoreContext);

  return stores[storeName];
}

export default StoreProvider;
