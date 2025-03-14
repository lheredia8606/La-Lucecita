import "../../../styles/root/root-style.css";
import { createFileRoute } from "@tanstack/react-router";
import { useProducts } from "../../../Providers/ProductProvider";
import { ProductCard } from "../../../Components/ProductCard/ProductCard";
import React, { useEffect, useState } from "react";
import { useOrder } from "../../../Providers/OrderProvider";
import { WarningModal } from "../../../Components/WarningModal/WarningModal";
import { useUser } from "../../../Providers/UserProvider";
import {
  TOrder,
  TOrderProductQty,
} from "../../../utils/ApplicationTypesAndGlobals";
import { UserCartHeader } from "../../../Components/Cart/UserCartHeader/UserCartHeader";
import { QtyHandle } from "../../../Components/Cart/QtyHandle/QtyHandle";
import { SpinnerModal } from "../../../Components/SpinnerModal/SpinnerModal";
import { useActiveBtn } from "../../../Providers/ActiveBtnProvider";

export const Route = createFileRoute("/_client/clientPage/myCart")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    removeProductFromOrder,
    allOrders,
    isLoadingFetchAllOrders,
    isFetchingAllOrders,
  } = useOrder();
  const { setActiveBtn } = useActiveBtn();
  const { getProductById } = useProducts();
  const { authenticatedUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [idProductToDelete, setIdProductToDelete] = useState("");
  const [cartId, setCartId] = useState<string>("");
  const [idOrderToDelete, setIdOrderToDelete] = useState("");
  const [cartProducts, setCartProducts] = useState<TOrderProductQty[]>([]);
  const [shouldDisplayDeleteModal, setShouldDisplayDeleteModal] =
    useState<boolean>(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setActiveBtn("My Cart");
  }, []);

  useEffect(() => {
    let userCart: TOrder | undefined;
    if (authenticatedUser) {
      userCart = allOrders.find((order) => {
        return (
          order.clientId === authenticatedUser.id && order.status === "in_cart"
        );
      });
      if (userCart) {
        setCartProducts(userCart.productQty);
        setCartId(userCart.id);
      }
    }
  }, [allOrders]);

  if (isLoadingFetchAllOrders || isFetchingAllOrders) {
    return <SpinnerModal />;
  }

  if (cartId === "") {
    return (
      <div className="empty-container">
        <h2>No cartFound!</h2>
      </div>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <div className="empty-container">
        <h2>No Products in your cart!</h2>
      </div>
    );
  }

  return (
    <>
      <UserCartHeader cartId={cartId} cartProducts={cartProducts} />
      <div className="card-container">
        {cartProducts.map(({ productId, quantity }) => {
          const product = getProductById(productId);

          return (
            <React.Fragment key={productId}>
              {shouldDisplayDeleteModal && (
                <WarningModal
                  message="Are you sure you want to remove this item from your cart?"
                  onCancel={() => setShouldDisplayDeleteModal(false)}
                  onConfirm={() => {
                    removeProductFromOrder(idOrderToDelete, idProductToDelete);
                    setShouldDisplayDeleteModal(false);
                  }}
                />
              )}
              {product && (
                <div className="product-card-wrapper">
                  <ProductCard
                    product={product}
                    setIsModalOpen={setIsModalOpen}
                    setModalImage={setModalImage}
                    buttonClass="remove"
                    buttonValue="Remove"
                    onBtnClickAction={() => {
                      setIdOrderToDelete(cartId);
                      setIdProductToDelete(product.id);
                      setShouldDisplayDeleteModal(true);
                    }}
                  />
                  <QtyHandle
                    productId={productId}
                    productQty={quantity}
                    orderId={cartId}
                  />
                </div>
              )}
            </React.Fragment>
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
