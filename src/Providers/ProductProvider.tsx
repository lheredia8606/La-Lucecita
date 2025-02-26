import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { apiProducts, TProduct } from "../utils/ApplicationTypesAndGlobals";
import { ReactNode } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

type TContextProps = {
  products: TProduct[];
};
const productContext = createContext({} as TContextProps);
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<TProduct[]>([]);

  const { data: fetchedProducts } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: () => apiProducts.getAll(),
  });

  useEffect(() => {
    if (fetchedProducts) {
      setProducts(fetchedProducts);
    }
  }, [fetchedProducts]);
  return (
    <productContext.Provider value={{ products }}>
      {children}
    </productContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(productContext);
  if (!context) {
    throw new Error("useProducts should be used inside ProductProvider");
  }
  return context;
};
