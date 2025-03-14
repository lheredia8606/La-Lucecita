import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useProducts } from "../../../Providers/ProductProvider";
import { ProductCard } from "../../../Components/ProductCard/ProductCard";
import { useOrder } from "../../../Providers/OrderProvider";
import { SpinnerModal } from "../../../Components/SpinnerModal/SpinnerModal";
import { useActiveBtn } from "../../../Providers/ActiveBtnProvider";

export const Route = createFileRoute("/_client/clientPage/products")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const { allProducts, isFetchingAllProducts, isLoadingAllProducts } =
    useProducts();
  const { addProductToOrder: addProductToCart } = useOrder();
  const { setActiveBtn } = useActiveBtn();
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  useEffect(() => {
    setActiveBtn("Products");
  }, []);

  if (isFetchingAllProducts || isLoadingAllProducts) {
    return <SpinnerModal />;
  }

  return (
    <>
      <div className="card-container">
        {allProducts.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              setIsModalOpen={setIsModalOpen}
              setModalImage={setModalImage}
              buttonClass="add-to-cart-btn"
              buttonValue="Add to Cart"
              onBtnClickAction={() => {
                addProductToCart(product.id);
              }}
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
