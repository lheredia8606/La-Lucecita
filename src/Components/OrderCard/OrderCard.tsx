import { useProducts } from "../../Providers/ProductProvider";
import { TOrder, TProduct } from "../../utils/ApplicationTypesAndGlobals";
import "./OrderCard.css";

type TOrderCardProps = {
  order: TOrder;
};
export const OrderCard = ({
  order: { id, clientId, productId, status, workerId },
}: TOrderCardProps) => {
  const { getProductById } = useProducts();

  const getStatusClassName = (): string => {
    switch (status) {
      case "in_cart":
      case "ordered":
      case "processing":
        return "status-processing";
      case "ready":
      case "done":
        return "status-complete";
    }
  };
  return (
    <>
      <div className="order-card">
        <div className="order-info">
          <h2 className="order-id">{id}</h2>
          <p className="order-status">
            Status: <span className={getStatusClassName()}>{status}</span>
          </p>
          <p className="order-deadline">
            Deadline:{" "}
            <span className="deadline-time">2025-03-05T15:00:00Z</span>
          </p>
        </div>
        <div className="order-products">
          <h3 className="products-title">Products</h3>
          <ul className="product-list">
            {productId.map((id, index) => {
              const product = getProductById(id);
              if (product) {
                return (
                  <li key={`${product.id}${index}`} className="product-item">
                    {product.name}
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <button className="view-order-btn">View Order</button>
      </div>
    </>
  );
};
