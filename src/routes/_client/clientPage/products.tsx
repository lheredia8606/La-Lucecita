import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useProducts } from "../../../Providers/ProductProvider";
import { ProductCard } from "../../../Components/ProductCard/ProductCard";
import { useOrder } from "../../../Providers/OrderProvider";

export const Route = createFileRoute("/_client/clientPage/products")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const { allProducts } = useProducts();
  const { addProductToCar } = useOrder();
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };
  return (
    <>
      <div className="card-container">
        {allProducts.map((product) => {
          return (
            <ProductCard
              product={product}
              key={product.id}
              setIsModalOpen={setIsModalOpen}
              setModalImage={setModalImage}
              buttonClass="add-to-cart-btn"
              buttonValue="Add to Cart"
              onBtnClickAction={addProductToCar}
            />
          );
        })}
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
