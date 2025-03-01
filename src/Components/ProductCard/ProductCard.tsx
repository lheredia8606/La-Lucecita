import { TProduct } from "../../utils/ApplicationTypesAndGlobals";
import "./ProductCard.css";

type TProductCardProps = {
  product: TProduct;
  setIsModalOpen: (isOpen: boolean) => void;
  setModalImage: (image: string) => void;
};

export const ProductCard = ({
  setIsModalOpen,
  product,
  setModalImage,
}: TProductCardProps) => {
  const { image, price, type } = product;
  const handleImageClick = () => {
    setModalImage(image);
    setIsModalOpen(true); // Open modal when card is clicked
  };

  return (
    <>
      <div className="product-card">
        <img
          src={image}
          alt={type}
          className="product-image"
          onClick={handleImageClick}
        />
        <div className="product-info">
          <h2 className="product-name">{type}</h2>
          <p className="product-price">${price.toFixed(2)}</p>
        </div>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </>
  );
};
