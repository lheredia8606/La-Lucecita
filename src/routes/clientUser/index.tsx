import { createFileRoute, useRouter } from "@tanstack/react-router";
import { UserButton } from "../../Components/UserButton/UserButton";
import { useUser } from "../../Providers/UserProvider";
import { useEffect, useState } from "react";
import { useProducts } from "../../Providers/ProductProvider";
import { ProductCard } from "../../Components/ProductCard/ProductCard";
type TActiveButtons = "products" | "myOrder" | "inCart";

export const Route = createFileRoute("/clientUser/")({
  component: RouteComponent,
});

function RouteComponent() {
  const route = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const { products } = useProducts();
  const { authenticatedUser } = useUser();
  const [activeButton, setActiveButton] = useState<TActiveButtons>("products");
  const changeActiveButton = (activeBtn: TActiveButtons) => {
    setActiveButton(activeBtn);
  };
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
        <div className="button-container">
          <UserButton
            btnText="Products"
            buttonProps={{
              className:
                activeButton === "products" ? "user-btn active" : "user-btn",
              onClick: () => setActiveButton("products"),
            }}
          />
          <UserButton
            btnText="My Orders"
            buttonProps={{
              className:
                activeButton === "myOrder" ? "user-btn active" : "user-btn",
              onClick: () => setActiveButton("myOrder"),
            }}
          />
          <UserButton
            btnText="In Cart"
            buttonProps={{
              className:
                activeButton === "inCart" ? "user-btn active" : "user-btn",
              onClick: () => setActiveButton("inCart"),
            }}
          />
        </div>
        <div className="content-container">
          {activeButton === "products" && (
            <>
              <div className="card-container">
                {products.map((product) => (
                  <ProductCard
                    product={product}
                    key={product.id}
                    setIsModalOpen={setIsModalOpen}
                    setModalImage={setModalImage}
                  />
                ))}
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
          )}
        </div>
      </div>
    </>
  );
}
