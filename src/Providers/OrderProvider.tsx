import { ReactNode } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState } from "react";
import {
  apiOrders,
  TOrder,
  TOrderProductQty,
} from "../utils/ApplicationTypesAndGlobals";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "./UserProvider";

type TOrderContextProps = {
  allOrders: TOrder[];
  setAllOrders: (newOrders: TOrder[]) => void;
  isAllOrdersFetchError: boolean;
  allOrdersFetchError: Error | null;
  isLoadingFetchAllOrders: boolean;
  addProductToCart: (productId: string) => void;
  getUserOrders: (userId: string | null) => TOrder[];
  authenticatedUserCart: TOrder | undefined;
  //getCurrentUserCartProducts: () => TOrderProductQty[];
  removeProductFromOrder: (orderId: string, productId: string) => void;
};
const OrderContext = createContext<TOrderContextProps>(
  {} as TOrderContextProps
);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { authenticatedUser } = useUser();
  const [allOrders, setAllOrders] = useState<TOrder[]>([]);
  const [authenticatedUserCart, setAuthenticatedUserCart] = useState<
    TOrder | undefined
  >(undefined);
  const {
    data: fetchedOrders,
    isError: isAllOrdersFetchError,
    error: allOrdersFetchError,
    isLoading: isLoadingFetchAllOrders,
  } = useQuery({
    queryKey: ["getAllOrders"],
    queryFn: () => apiOrders.getAll(),
  });

  const addOrderMutation = useMutation({
    mutationFn: (order: Omit<TOrder, "id">) => apiOrders.post(order),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllOrders"] }),
  });

  const patchOrder = useMutation({
    mutationFn: ({
      orderId,
      partialOrder,
    }: {
      orderId: string;
      partialOrder: Partial<Omit<TOrder, "id">>;
    }) => apiOrders.update(orderId, partialOrder),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllOrders"] }),
  });

  const refreshUserCart = () => {
    if (authenticatedUser) {
      setAuthenticatedUserCart(
        allOrders.find((order) => {
          return (
            order.clientId === authenticatedUser.id &&
            order.status === "in_cart"
          );
        })
      );
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

  const getUserOrders = (userId: string | null) => {
    if (userId) {
      return allOrders?.filter((order) => {
        return order.clientId === authenticatedUser?.id;
      });
    }
    return [];
  };
  /*
  const getCurrentUserCartProducts = (): TOrderProductQty[] => {
    if (authenticatedUserCart) {
      return authenticatedUserCart.productQty;
    }
    return [];
  };*/
  const removeProductFromOrder = (orderId: string, productId: string) => {
    const orderProducts = allOrders.find(
      (order) => order.id === orderId
    )?.productQty;
    if (!orderProducts) {
      throw new Error("No products found!");
    }
    let newOrderProducts: TOrderProductQty[] = [];
    for (let i = 0; i < orderProducts.length; i++) {
      if (orderProducts[i].productId === productId) {
        newOrderProducts = orderProducts.slice(0, i);
        newOrderProducts.push(...orderProducts.slice(i + 1));
      }
    }
    const partialOrder: Partial<Omit<TOrder, "id">> = {};
    partialOrder.productQty = newOrderProducts;
    patchOrder.mutate({ orderId, partialOrder });
  };

  useEffect(() => {
    if (fetchedOrders) {
      setAllOrders(fetchedOrders);
    }
    refreshUserCart();
  }, [fetchedOrders]);

  useEffect(() => {
    setAuthenticatedUserCart(getUserCartOnAuth());
  }, [authenticatedUser]);

  const addProductToCart = (productId: string) => {
    console.log("addingProduct");
  };
  return (
    <OrderContext.Provider
      value={{
        allOrders,
        setAllOrders,
        allOrdersFetchError,
        isAllOrdersFetchError,
        isLoadingFetchAllOrders,
        addProductToCart,
        getUserOrders,
        authenticatedUserCart,
        //getCurrentUserCartProducts,
        removeProductFromOrder,
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
