import { createFileRoute } from "@tanstack/react-router";
import { useProducts } from "../../../Providers/ProductProvider";
import { ProductCard } from "../../../Components/ProductCard/ProductCard";
import { useState } from "react";
import { useOrder } from "../../../Providers/OrderProvider";

export const Route = createFileRoute("/_client/clientPage/myCart")({
  component: RouteComponent,
});

function RouteComponent() {
  const { removeProductFromCar } = useOrder();
  const { allProducts } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
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
              buttonClass="remove"
              buttonValue="Remove"
              onBtnClickAction={removeProductFromCar}
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
