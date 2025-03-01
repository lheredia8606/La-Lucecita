import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useProducts } from "../../../Providers/ProductProvider";
import { ProductCard } from "../../../Components/ProductCard/ProductCard";

export const Route = createFileRoute("/_client/clientPage/products")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const { products } = useProducts();
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };
  return (
    <>
      <div className="card-container">
        {products.map((product) => {
          return (
            <ProductCard
              product={product}
              key={product.id}
              setIsModalOpen={setIsModalOpen}
              setModalImage={setModalImage}
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
