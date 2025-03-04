import { Temporal } from "@js-temporal/polyfill";
import { apiHandler } from "./apiHandler";
import { ButtonHTMLAttributes } from "react";

//globals
const baseUrl = "http://localhost:3000/";
export const apiUser = apiHandler<TUser>(baseUrl, "users");
export const apiProducts = apiHandler<TProduct>(baseUrl, "products");
export const apiOrders = apiHandler<TOrder>(baseUrl, "orders");
export const phoneInputMaxLength = [3, 3, 4];

//types
export type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "client" | "worker" | "admin";
  phone: [string, string, string];
  isActive: boolean;
};

export type TProduct = {
  id: string;
  name: string;
  type: "mug" | "t-shirt" | "bag";
  image: string;
  inStock: boolean;
  price: number;
};

export type TOrderProductQty = {
  productId: string;
  quantity: number;
};
export type TOrder = {
  id: string;
  clientId: string;
  productQty: TOrderProductQty[];
  workerId: string | undefined;
  deadLine: Temporal.Instant | null;
  status: "in_cart" | "ordered" | "processing" | "ready" | "done";
};

export type TButtonProps = {
  btnText: string;
  navigateTo: string;
  activeButton: string;
  setActiveButton: (activeButton: string) => void;
};
