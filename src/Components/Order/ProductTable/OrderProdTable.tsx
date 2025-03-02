import { useProducts } from "../../../Providers/ProductProvider";
import { TOrderProductQty } from "../../../utils/ApplicationTypesAndGlobals";
import "./OrderProdTable.css";
type TOrderProdTableProps = {
  products: TOrderProductQty[];
};
export const OrderProdTable = ({ products }: TOrderProdTableProps) => {
  const { getProductById } = useProducts();
  return (
    <>
      <div className="order-products">
        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th className="order-product">Product Name</th>
                <th className="centered">Qty</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product.productId}>
                    <td>{getProductById(product.productId)?.name}</td>
                    <td className="centered">{product.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
