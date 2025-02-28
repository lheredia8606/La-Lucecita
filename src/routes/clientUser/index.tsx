import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useUser } from "../../Providers/UserProvider";
import { useEffect, useState } from "react";
import { useProducts } from "../../Providers/ProductProvider";
import { ProductCard } from "../../Components/ProductCard/ProductCard";
import { CustomButton } from "../../Components/ButtonsContainer/CustomButton";

export const Route = createFileRoute("/clientUser/")({
  component: RouteComponent,
});

function RouteComponent() {
  const route = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const { products } = useProducts();
  const { authenticatedUser } = useUser();

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };
  useEffect(() => {
    if (!authenticatedUser || authenticatedUser.role !== "client") {
      route.navigate({ to: "/" });
    }
  });
  return (
    <>
      <div className="user-container">
        dsf
        <div className="content-container">
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
                  <img
                    src={modalImage}
                    alt="Modal Content"
                    className="modal-image"
                  />
                  <button className="close-button" onClick={handleCloseModal}>
                    X
                  </button>
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
}
