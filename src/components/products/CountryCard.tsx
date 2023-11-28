import Link from "next/link";
import { useAtom } from "jotai";
import { cartAtom } from "@/atom/cart";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useCurrency } from "@/hooks/useCurrency";
import { getSlug } from "@/utils/slugify";

const MySwal = withReactContent(Swal);

export default function CountryCard({ items }) {
  const { t } = useTranslation();
  const [cart, setCart] = useAtom(cartAtom);
  const { currentCurrency, parseCurrency } = useCurrency();
  const router = useRouter();

  const dataAddToCart = {
    ...items,
    quantity: 1,
  };

  const buyNowButton = (e) => {
    e.preventDefault();
    setCart([
      {
        ...dataAddToCart,
      },
    ]);
    router.push("/cart");
  };

  const addToCart = () => {
    setCart((prev) => {
      return [...prev, { ...items, quantity: 1 }];
    });
    MySwal.fire({
      title: t('country.addtoCartSuccessfully'),
      html: (
        <div>
          {t('country.continueShopping')}{" "}
          <Link className="text-indigo-600 font-semibold" href={"/checkout"}>
            {t('country.checkOut')}
          </Link>
        </div>
      ),
      icon: "success",
    });
  };
  return (
    <Link href={`/products/${getSlug(items.id, items.country)}`} className="z-[20]">
      <div
        className="group rounded-lg bg-white dark:bg-slate-900
         hover:translate-x-[-2px] hover:translate-y-[-2px]
         border border-gray-200
         shadow hover:shadow-xl dark:hover:shadow-2xl dark:shadow-gray-800
         dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500 relative"
      >
        <div className="relative">
          <img
            src={items.image}
            alt=""
            className="object-fill h-[180px] w-full"
          />

          <div className="absolute top-6 right-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart();
              }}
              // onClick={(e) => buyNowButton(e)}
              className="btn btn-icon z-50 text-lg bg-white hover:bg-indigo-600 hover:text-white dark:bg-slate-900 border-0 shadow dark:shadow-gray-800 rounded-full text-indigo-600"
            >
              <i className="mdi mdi-cart-plus"></i>
            </button>
          </div>
        </div>

        <div className="p-3">
          <ul className="py-3 border-y border-gray-100 dark:border-gray-800 grid grid-cols-2 flex items-center list-none font-semibold text-lg">
            <li className="flex items-center col-span-2 mr-4">
              {/* <i className={"mdi mdi-earth text-2xl mr-2 "}></i> */}
              <div className="line-clamp-1">{items.country}</div>
            </li>
          </ul>

          <ul className="pt-3 flex justify-between items-center list-none relative">
            <div className="flex justify-between items-center w-full">
              <div className="">
                {t('country.from')}
                <span className="font-semibold"> {currentCurrency.symbol}{" "}{parseCurrency(items.price)}</span>
              </div>
              {/*<button onClick={(e) => buyNowButton(e)} */}
              {/*        className="btn  hover:opacity-80 hover:transition bg-indigo-600 text-white rounded-md">*/}
              {/*  <div className="flex items-center justify-center gap-2 capitalize">*/}
              {/*    <div>{t('country.buyNow')}</div>*/}
              {/*    /!*<div className="w-[4px] h-[4px] bg-white rounded-full" />*!/*/}
              {/*  </div>*/}
              {/*</button>*/}
            </div>
          </ul>
        </div>
      </div>
    </Link>
  );
}
