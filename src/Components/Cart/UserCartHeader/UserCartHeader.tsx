import { useEffect, useState } from "react";
import {
  TOrder,
  TOrderProductQty,
} from "../../../utils/ApplicationTypesAndGlobals";
import "./UserCartHeader.css";
import { useProducts } from "../../../Providers/ProductProvider";
import { useOrder } from "../../../Providers/OrderProvider";
import { useUser } from "../../../Providers/UserProvider";
import { getOrderDeadLine } from "../../../utils/TemporalDate";

type TUserCartHeaderProps = {
  cartId: string;
  cartProducts: TOrderProductQty[];
};

export const UserCartHeader = ({
  cartId,
  cartProducts,
}: TUserCartHeaderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { getProductById } = useProducts();
  const {
    changeOrder,
    addOrder,
    isLoadingFetchAllOrders,
    isFetchingAllOrders,
  } = useOrder();
  const { authenticatedUser } = useUser();

  const totalItems = cartProducts.reduce((acc, val) => {
    return acc + val.quantity;
  }, 0);

  useEffect(() => {
    if (!isFetchingAllOrders && !isLoadingFetchAllOrders) {
      setIsLoading(false);
    }
  }, [isFetchingAllOrders, isFetchingAllOrders]);

  const onPayClick = () => {
    changeOrder(cartId, { deadLine: getOrderDeadLine(7), status: "ordered" });
    if (authenticatedUser) {
      const newOrder: Omit<TOrder, "id"> = {
        clientId: authenticatedUser.id,
        deadLine: null,
        productQty: [],
        status: "in_cart",
        workerId: undefined,
      };
      addOrder(newOrder);
      setIsLoading(true);
    }
  };

  const totalPrice = cartProducts.reduce((acc, { productId, quantity }) => {
    let product = getProductById(productId);
    if (product) {
      return Number((acc + product.price * quantity).toFixed(2));
    }
    return acc;
  }, 0);

  return (
    <div className="cart-summary">
      <div className="cart-summary-item">
        <span className="label">Total Items:</span>
        <span className="value">{totalItems}</span>
      </div>
      <div className="cart-summary-item">
        <span className="label">Total Price:</span>
        <span className="value">${totalPrice}</span>
      </div>
      <button className="pay-button" disabled={isLoading} onClick={onPayClick}>
        Pay Now
      </button>
    </div>
  );
};
