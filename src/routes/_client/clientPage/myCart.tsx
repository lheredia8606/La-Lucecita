import { createFileRoute } from "@tanstack/react-router";
import { useProducts } from "../../../Providers/ProductProvider";
import { ProductCard } from "../../../Components/ProductCard/ProductCard";
import { useState } from "react";
import { useOrder } from "../../../Providers/OrderProvider";
import { QtyHandle } from "../../../Components/ProductCard/QtyHandle";
import { WarningModal } from "../../../Components/WarningModal/WarningModal";
import "./client.css";

export const Route = createFileRoute("/_client/clientPage/myCart")({
  component: RouteComponent,
});

function RouteComponent() {
  const { authenticatedUserCart, removeProductFromOrder } = useOrder();
  const { getProductById } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [idProductToDelete, setIdProductToDelete] = useState("");
  const [idOrderToDelete, setIdOrderToDelete] = useState("");
  const [shouldDisplayDeleteModal, setShouldDisplayDeleteModal] =
    useState<boolean>(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  if (!authenticatedUserCart) {
    return (
      <>
        <div className="product-cart-empty">
          <h2>No user cart!</h2>
        </div>
      </>
    );
  }
  if (authenticatedUserCart.productQty.length === 0) {
    return (
      <>
        <div className="product-cart-empty">
          <h2>No Products in your cart!</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="card-container">
        {authenticatedUserCart?.productQty.map(({ productId, quantity }) => {
          const product = getProductById(productId);

          return (
            <>
              {shouldDisplayDeleteModal && (
                <WarningModal
                  message=""
                  onCancel={() => setShouldDisplayDeleteModal(false)}
                  onConfirm={() => {
                    removeProductFromOrder(idOrderToDelete, idProductToDelete);
                    setShouldDisplayDeleteModal(false);
                  }}
                />
              )}
              {product && (
                <div className="product-card-wrapper" key={product?.id}>
                  <ProductCard
                    product={product}
                    setIsModalOpen={setIsModalOpen}
                    setModalImage={setModalImage}
                    buttonClass="remove"
                    buttonValue="Remove"
                    onBtnClickAction={() => {
                      setIdOrderToDelete(authenticatedUserCart.id);
                      setIdProductToDelete(product.id);
                      setShouldDisplayDeleteModal(true);
                    }}
                  />
                  <QtyHandle
                    productId={productId}
                    productQty={quantity}
                    orderId={authenticatedUserCart!.id}
                  />
                </div>
              )}
            </>
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
