import { ReactNode, useSearch } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState } from "react";
import { apiOrders, TOrder } from "../utils/ApplicationTypesAndGlobals";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "./UserProvider";

type TOrderContextProps = {
  allOrders: TOrder[];
  setAllOrders: (newOrders: TOrder[]) => void;
  isAllOrdersFetchError: boolean;
  allOrdersFetchError: Error | null;
  isLoadingFetchAllOrders: boolean;
  addProductToCar: (productId: string) => void;
  removeProductFromCar: (productId: string) => void;
};
const OrderContext = createContext<TOrderContextProps>(
  {} as TOrderContextProps
);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { authenticatedUser } = useUser();
  const [allOrders, setAllOrders] = useState<TOrder[]>([]);
  let authenticatedUserCart: TOrder | undefined = undefined;
  const {
    data: fetchedOrders,
    isError: isAllOrdersFetchError,
    error: allOrdersFetchError,
    isLoading: isLoadingFetchAllOrders,
    isFetched: isFetchedAllOrders,
  } = useQuery({
    queryKey: ["getAllOrders"],
    queryFn: () => apiOrders.getAll(),
  });

  const addOrderMutation = useMutation({
    mutationFn: (order: Omit<TOrder, "id">) => apiOrders.post(order),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllOrders"] }),
  });

  const refreshUserCart = () => {
    if (authenticatedUser) {
      return allOrders.find((order) => {
        return (
          order.clientId === authenticatedUser.id && order.status === "in_cart"
        );
      });
    }
  };
  const getUserCartOnAuth = (): TOrder | undefined => {
    if (authenticatedUser) {
      const cartOrder = allOrders.find((order) => {
        return (
          order.clientId === authenticatedUser.id && order.status === "in_cart"
        );
      });
      if (cartOrder) {
        return cartOrder;
      } else {
        const newOrder: Omit<TOrder, "id"> = {
          clientId: authenticatedUser.id,
          deadLine: null,
          productQty: [],
          status: "in_cart",
          workerId: undefined,
        };
        addOrderMutation.mutate(newOrder);
      }
    }
    return undefined;
  };

  useEffect(() => {
    if (fetchedOrders) {
      setAllOrders(fetchedOrders);
    }
    authenticatedUserCart = refreshUserCart();
  }, [fetchedOrders]);

  useEffect(() => {
    authenticatedUserCart = getUserCartOnAuth();
  }, [authenticatedUser]);

  useEffect(() => console.log("runned usefect"), []);

  const addProductToCar = (productId: string) => {
    console.log("addingProduct");
  };
  const removeProductFromCar = (productId: string) => {
    console.log("removing");
  };
  return (
    <OrderContext.Provider
      value={{
        allOrders,
        setAllOrders,
        allOrdersFetchError,
        isAllOrdersFetchError,
        isLoadingFetchAllOrders,
        addProductToCar,
        removeProductFromCar,
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
