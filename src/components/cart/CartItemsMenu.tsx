import { useAtom } from "jotai";

import { cartAtom } from "@/atom/cart";

export default function CartItemsMenu() {
  const [cart, setCart] = useAtom(cartAtom);
  return <div className="bg-white rounded-lg xl:w-[500px]"></div>;
}
