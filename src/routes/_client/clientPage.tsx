import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import { useUser } from "../../Providers/UserProvider";
import { useEffect, useState } from "react";
import { useProducts } from "../../Providers/ProductProvider";
import { ProductCard } from "../../Components/ProductCard/ProductCard";
import { CustomButton } from "../../Components/ButtonsContainer/CustomButton";
import { UserProductBtnContainer } from "../../Components/ButtonsContainer/User/UserBtnContainer";

export const Route = createFileRoute("/_client/clientPage")({
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
      <UserProductBtnContainer />
      <div className="user-container">
        <div className="content-container">
          <Outlet />
        </div>
      </div>
    </>
  );
}
