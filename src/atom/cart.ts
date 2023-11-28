import { atomWithStorage } from "jotai/utils";

export const cartAtom = atomWithStorage("cart", []);

export const cartTotalAtom = atomWithStorage("cartTotal", {
  total: "0",
  totalQuantity: 0,
});

export const cartSingleItemAtom = atomWithStorage("cartSingleItem", []);
