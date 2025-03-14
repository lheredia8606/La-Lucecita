import { ReactNode } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState } from "react";
import {
  apiOrders,
  TOrder,
  TOrderProductQty,
  TOrderStatus,
} from "../utils/ApplicationTypesAndGlobals";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "./UserProvider";
import { Temporal } from "@js-temporal/polyfill";

type TOrderContextProps = {
  sortOrdersByDeadline: (orders: TOrder[], modifier?: 1 | -1) => TOrder[];
  getOrdersByStatus: (status: TOrderStatus) => TOrder[];
  allOrders: TOrder[];
  setAllOrders: (newOrders: TOrder[]) => void;
  isAllOrdersFetchError: boolean;
  allOrdersFetchError: Error | null;
  isLoadingFetchAllOrders: boolean;
  isFetchingAllOrders: boolean;
  getUserOrders: (userId: string | null) => TOrder[];
  removeProductFromOrder: (orderId: string, productId: string) => void;
  addProductToOrder: (productId: string, orderId?: string) => void;
  changeProductQtyInOrder: (
    orderId: string,
    productId: string,
    qty: number
  ) => void;
  changeOrder: (
    orderId: string,
    partialOrder: Partial<Omit<TOrder, "id">>
  ) => void;
  addOrder: (newOrder: Omit<TOrder, "id">) => void;
};
const OrderContext = createContext<TOrderContextProps>(
  {} as TOrderContextProps
);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { authenticatedUser } = useUser();
  const [allOrders, setAllOrders] = useState<TOrder[]>([]);

  const {
    data: fetchedOrders,
    isError: isAllOrdersFetchError,
    error: allOrdersFetchError,
    isLoading: isLoadingFetchAllOrders,
    isFetching: isFetchingAllOrders,
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

  const getUserCartOnAuth = () => {
    if (authenticatedUser) {
      const cartOrder = allOrders.find((order) => {
        return (
          order.clientId === authenticatedUser.id && order.status === "in_cart"
        );
      });
      if (!cartOrder) {
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
  };

  const getUserOrders = (userId: string | null) => {
    if (userId) {
      return allOrders?.filter((order) => {
        return order.clientId === authenticatedUser?.id;
      });
    }
    return [];
  };

  const getOrdersByStatus = (status: TOrderStatus) => {
    return allOrders.filter((order) => {
      return order.status === status;
    });
  };

  const sortOrdersByDeadline = (orders: TOrder[], modifier: 1 | -1 = 1) => {
    return orders.sort((a, b) => {
      let tempA, tempB: Temporal.PlainDate;
      if (a.deadLine && b.deadLine) {
        tempA = Temporal.PlainDate.from(a.deadLine!);
        tempB = Temporal.PlainDate.from(b.deadLine!);
        return (tempA.day - tempB.day) * modifier;
      }
      return 1;
    });
  };

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

  const changeProductQtyInOrder = (
    orderId: string,
    productId: string,
    qty: number
  ) => {
    let orderProducts = allOrders.find(
      (order) => order.id === orderId
    )?.productQty;
    if (!orderProducts) {
      throw new Error("No products found!");
    }

    for (let i = 0; i < orderProducts.length; i++) {
      if (orderProducts[i].productId === productId) {
        orderProducts[i].quantity += qty;
        if (orderProducts[i].quantity < 1) {
          let newOrderProducts = orderProducts.slice(0, i);
          newOrderProducts.push(...orderProducts.slice(i + 1));
          orderProducts = newOrderProducts;
        }
      }
    }
    const partialOrder: Partial<Omit<TOrder, "id">> = {};
    partialOrder.productQty = orderProducts;
    patchOrder.mutate({ orderId, partialOrder });
  };

  const addProductToOrder = (productId: string, orderId?: string) => {
    let products: TOrderProductQty[] | undefined = [];
    if (orderId) {
      products = allOrders.find((order) => order.id === orderId)?.productQty;
    } else if (authenticatedUser) {
      const order = allOrders.find(
        (order) =>
          order.clientId === authenticatedUser.id && order.status === "in_cart"
      );
      products = order?.productQty;
      orderId = order?.id;
    }
    if (products) {
      let haveProduct: boolean = false;
      for (let i = 0; i < products.length; i++) {
        if (products[i].productId === productId) {
          products[i].quantity++;
          haveProduct = true;
          break;
        }
      }
      if (!haveProduct) {
        products.push({ productId, quantity: 1 });
      }
      if (orderId) {
        const newOrder: Partial<Omit<TOrder, "id">> = {};
        newOrder.productQty = products;
        patchOrder.mutate({ orderId, partialOrder: newOrder });
      }
    }
  };

  const addOrder = (newOrder: Omit<TOrder, "id">) => {
    addOrderMutation.mutate(newOrder);
  };

  const changeOrder = (
    orderId: string,
    partialOrder: Partial<Omit<TOrder, "id">>
  ) => {
    patchOrder.mutate({ orderId, partialOrder });
  };

  useEffect(() => {
    if (fetchedOrders) {
      setAllOrders(fetchedOrders);
    }
  }, [fetchedOrders]);

  useEffect(() => {
    getUserCartOnAuth();
  }, [authenticatedUser]);

  return (
    <OrderContext.Provider
      value={{
        allOrders,
        sortOrdersByDeadline,
        setAllOrders,
        allOrdersFetchError,
        isAllOrdersFetchError,
        isLoadingFetchAllOrders,
        addProductToOrder,
        getUserOrders,
        removeProductFromOrder,
        changeProductQtyInOrder,
        changeOrder,
        addOrder,
        isFetchingAllOrders,
        getOrdersByStatus,
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
