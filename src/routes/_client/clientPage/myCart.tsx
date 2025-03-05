import { createFileRoute } from "@tanstack/react-router";
import { useProducts } from "../../../Providers/ProductProvider";
import { ProductCard } from "../../../Components/ProductCard/ProductCard";
import { useState } from "react";
import { useOrder } from "../../../Providers/OrderProvider";
import { QtyHandle } from "../../../Components/ProductCard/QtyHandle";

export const Route = createFileRoute("/_client/clientPage/myCart")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    removeProductFromCart,
    getCurrentUserCartProducts: getCurrentUserCartProducts,
  } = useOrder();
  const { getProductById } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="card-container">
        {getCurrentUserCartProducts().map(({ productId, quantity }) => {
          const product = getProductById(productId);
          console.log(product);
          if (!product) {
            return <></>;
          }
          return (
            <div className="product-card-wrapper" key={product.id}>
              <ProductCard
                product={product}
                setIsModalOpen={setIsModalOpen}
                setModalImage={setModalImage}
                buttonClass="remove"
                buttonValue="Remove"
                onBtnClickAction={() => removeProductFromCart(productId)}
              />
              <QtyHandle />
            </div>
          );
        })}

        {/* {allProducts.map((product) => {
          return (
            <div className="product-card-wrapper" key={product.id}>
              <ProductCard
                product={product}
                setIsModalOpen={setIsModalOpen}
                setModalImage={setModalImage}
                buttonClass="remove"
                buttonValue="Remove"
                onBtnClickAction={() => removeProductFromCart(product.id)}
              />
              <QtyHandle />
            </div>
          );
        })} */}
      </div>
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div
            className="modal-content product-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={modalImage} alt="Modal Content" className="modal-image" />
            <button className="close-button" onClick={handleCloseModal}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}
