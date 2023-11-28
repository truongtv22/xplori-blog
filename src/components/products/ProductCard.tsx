import { useAtom } from "jotai";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import { cartAtom } from "@/atom/cart";
import { favouriteItemAtom } from "@/atom/favouriteItem";
import { useCurrency } from "@/hooks/useCurrency";
import { getSlug } from "@/utils/slugify";

export default function ProductCard({ product, setIsOpen }) {
  const { t } = useTranslation();
  const [cart, setCart] = useAtom(cartAtom);
  const { currentCurrency, parseCurrency } = useCurrency();
  const [favouriteItem, setFavouriteItem] = useAtom(favouriteItemAtom);
  const dataAddToCart = {
    ...product,
    quantity: 1,
  };
  const toggleFavourite = () => {
    setFavouriteItem((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((item) => item !== product.id);
      }
      return [...prev, product.id];
    });
  };
  const addToCart = (event) => {
    event.preventDefault();
    setCart((oldCart) => {
      const index = oldCart.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        const newCart = [...oldCart];
        newCart[index].quantity += 1;
        return newCart;
      }
      return [...oldCart, dataAddToCart];
    });
    setIsOpen(true);
  };

  return (
    <div className="border rounded-lg">
      <Link href={`/products/${getSlug(product.id, product.country)}`} className="z-[20]">
        <div className="group rounded-md bg-white dark:bg-slate-900 shadow hover:shadow-xl shadow-xl dark:hover:shadow-2xl dark:shadow-gray-800 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500">
          <div className="relative">
            <img
              src={product.image}
              alt=""
              className="object-fill h-[222px] w-full"
            />

            <div className="absolute top-6 right-6">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavourite();
                }}
                className="btn btn-icon z-50 text-lg bg-white dark:bg-slate-900 border-0 shadow dark:shadow-gray-800 rounded-full text-red-600"
              >
                {favouriteItem.includes(product.id) ? (
                  <i className="mdi mdi-heart"></i>
                ) : (
                  <i className="mdi mdi-heart-outline"></i>
                )}
              </button>
            </div>
          </div>

          <div className={"p-6"}>
            <div className="pb-3">
              <div className="text-lg hover:text-indigo-600 font-medium ease-in-out duration-500">
                {product.name}
              </div>
            </div>

            <ul className="py-3 border-y border-gray-100 dark:border-gray-800 grid grid-cols-2 flex items-center list-none">
              <li className="flex items-center col-span-1 mr-4">
                <i className="mdi mdi-earth text-2xl mr-2 "></i>
                <div className="line-clamp-1">{product.country}</div>
              </li>

              <li className="flex items-center col-span-1">
                <i className={"mdi mdi-calendar text-2xl mr-2 "}></i>
                <span>{product.expired_in_day} {t('product.days')}</span>
              </li>
            </ul>

            <ul className="pt-3 flex justify-between items-center list-none">
              <li>
                <span>{t('product.price')}</span>
                <p className="text-xl font-medium">
                  {currentCurrency.symbol}{" "}
                  {parseCurrency(product.price)}
                </p>
              </li>

              <li>
                <button
                  onClick={(event) => addToCart(event)}
                  className="btn text-white rounded-md z-50 hover:scale-110 hover:border-red-500 hover:transition bg-gradient-to-r from-blue-400 to-blue-600"
                >
                  {t('product.addToCart')}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
}
