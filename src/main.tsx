import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { UserProvider } from "./Providers/UserProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductProvider } from "./Providers/ProductProvider";
import { OrderProvider } from "./Providers/OrderProvider";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

const queryClient = new QueryClient();

// Register things for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ProductProvider>
            <OrderProvider>
              <RouterProvider router={router} />
            </OrderProvider>
          </ProductProvider>
        </UserProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
