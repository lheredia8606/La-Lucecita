import { useState } from "react";
import { ProductCard } from "../../ProductCard/ProductCard";
import { TProduct } from "../../../utils/ApplicationTypesAndGlobals";

const products: TProduct[] = [
  // {
  //   id: "01",
  //   type: "mug",
  //   image: "./src/images/bag-01.png",
  //   price: 19.99,
  // },
  // {
  //   id: "03",
  //   type: "mug",
  //   image: "./src/images/couple-2.png",
  //   price: 25.99,
  // },
  // {
  //   id: "02",
  //   type: "bag",
  //   image: "./src/images/bag-02.png",
  //   price: 19.99,
  // },
];
export const ProductContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };
  return (
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
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Modal Content" className="modal-image" />
            <button className="close-button" onClick={handleCloseModal}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};
