import { Temporal } from "@js-temporal/polyfill";
import { apiHandler } from "./apiHandler";
import { ButtonHTMLAttributes } from "react";

//globals
const baseUrl = "http://localhost:3000/";
export const apiUser = apiHandler<TUser>(baseUrl, "users");
export const apiProducts = apiHandler<TProduct>(baseUrl, "products");
export const apiOrders = apiHandler<TOrder>(baseUrl, "orders");

//types
export type TUser = {
  id: string;
  name: string;
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

export type TOrder = {
  id: string;
  clientId: string;
  productId: string[];
  workerId: string | undefined;
  deadLine: Temporal.Instant;
  status: "in_cart" | "ordered" | "processing" | "ready" | "done";
};

export type TButtonProps = {
  buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
  btnText: string;
  navigateTo: string;
};
