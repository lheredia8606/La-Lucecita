import { useEffect, useState } from "react";
import { TOrderProductQty } from "../../../utils/ApplicationTypesAndGlobals";
import "./UserCartHeader.css";
import { useProducts } from "../../../Providers/ProductProvider";
import { useOrder } from "../../../Providers/OrderProvider";

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
  const { getProductById, allProducts } = useProducts();

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
      <button className="pay-button" onClick={() => {}}>
        Pay Now
      </button>
    </div>
  );
};
