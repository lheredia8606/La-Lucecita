import { ReactNode, useSearch } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState } from "react";
import { apiOrders, TOrder } from "../utils/ApplicationTypesAndGlobals";
import { useQuery } from "@tanstack/react-query";

type TOrderContextProps = {
  allOrders: TOrder[];
  setAllOrders: (newOrders: TOrder[]) => void;
  isAllOrdersFetchError: boolean;
  allOrdersFetchError: Error | null;
  isLoadingFetchAllOrders: boolean;
};
const OrderContext = createContext<TOrderContextProps>(
  {} as TOrderContextProps
);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [allOrders, setAllOrders] = useState<TOrder[]>([]);
  const {
    data: fetchedOrders,
    isError: isAllOrdersFetchError,
    error: allOrdersFetchError,
    isLoading: isLoadingFetchAllOrders,
  } = useQuery({
    queryKey: ["getAllOrders"],
    queryFn: () => apiOrders.getAll(),
  });
  useEffect(() => {
    if (fetchedOrders) {
      setAllOrders(fetchedOrders);
    }
  }, [fetchedOrders]);
  return (
    <OrderContext.Provider
      value={{
        allOrders,
        setAllOrders,
        allOrdersFetchError,
        isAllOrdersFetchError,
        isLoadingFetchAllOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder should be used inside OrderProvider");
  }
  return context;
};
