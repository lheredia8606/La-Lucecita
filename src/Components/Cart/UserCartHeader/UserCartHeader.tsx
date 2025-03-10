import { useEffect, useState } from "react";
import {
  TOrder,
  TOrderProductQty,
} from "../../../utils/ApplicationTypesAndGlobals";
import "./UserCartHeader.css";
import { useProducts } from "../../../Providers/ProductProvider";
import { useOrder } from "../../../Providers/OrderProvider";
import { useUser } from "../../../Providers/UserProvider";

type TUserCartHeaderProps = {
  cartId: string;
  cartProducts: TOrderProductQty[];
};

export const UserCartHeader = ({
  cartId,
  cartProducts,
}: TUserCartHeaderProps) => {
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { getProductById } = useProducts();
  const { changeOrderStatus, addOrder } = useOrder();
  const { authenticatedUser } = useUser();

  const getTotalPrice = () => {
    return cartProducts.reduce((acc, { productId, quantity }) => {
      let product = getProductById(productId);
      if (product) {
        return Number((acc + product.price * quantity).toFixed(2));
      }
      return acc;
    }, 0);
  };

  useEffect(() => {
    console.log("running useffect");
    if (cartProducts) {
      setTotalItems(cartProducts.length);
      setTotalPrice(getTotalPrice());
    }
  }, [cartProducts]);
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
      <button
        className="pay-button"
        onClick={() => {
          changeOrderStatus(cartId, "ordered");
          if (authenticatedUser) {
            const newOrder: Omit<TOrder, "id"> = {
              clientId: authenticatedUser.id,
              deadLine: null,
              productQty: [],
              status: "in_cart",
              workerId: undefined,
            };
            addOrder(newOrder);
          }
        }}
      >
        Pay Now
      </button>
    </div>
  );
};
