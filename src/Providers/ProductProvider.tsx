import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { apiProducts, TProduct } from "../utils/ApplicationTypesAndGlobals";
import { ReactNode } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

type TContextProps = {
  allProducts: TProduct[];
  getProductById: (id: string) => TProduct | undefined;
  isFetchingAllProducts: boolean;
  isLoadingAllProducts: boolean;
};
const productContext = createContext({} as TContextProps);
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [allProducts, setAllProducts] = useState<TProduct[]>([]);

  const {
    data: fetchedProducts,
    isFetching: isFetchingAllProducts,
    isLoading: isLoadingAllProducts,
  } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: () => apiProducts.getAll(),
  });

  const getProductById = useCallback(
    (id: string): TProduct | undefined => {
      return allProducts.find((product) => {
        return product.id === id;
      });
    },
    [allProducts]
  );

  useEffect(() => {
    if (fetchedProducts) {
      setAllProducts(fetchedProducts);
    }
  }, [fetchedProducts]);
  return (
    <productContext.Provider
      value={{
        allProducts,
        getProductById,
        isLoadingAllProducts,
        isFetchingAllProducts,
      }}
    >
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
