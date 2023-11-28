import { useAtom, useAtomValue } from "jotai";
import dynamic from "next/dynamic";

import { cartAtom } from "@/atom/cart";
import { currencyAtom } from "@/atom/currency";
import CartItems from "@/components/cart/CartItems";
import { listCurrency } from "@/components/constant/listCurrency";
import CartSubTotal from "@/components/cart/CartSubTotal";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import { eSimsAtom } from "@/atom/esim";
import { useTranslation } from "next-i18next";
import serverSideTranslations from "@/utils/serverSideTranslations";

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

const LayoutWrapper = dynamic(
  () => import("../../src/components/layout/LayoutWrapper"),
  { ssr: false }
);

const Index = () => {
  const { t } = useTranslation();
  const cart = useAtomValue(cartAtom);
  const totalItem = cart.length;

  return (
    <>
      <Head>
        <title>Xplori - Cart</title>
      </Head>
      <div>
        <div className="container text-black lg:pb-56 lg:pt-32 pb-32 pt-24 bg-gray-100 rounded-md">
          <div className="flex shadow-md my-10 lg:flex-row flex-col">
            <div className="lg:w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl capitalize">{t('cart.shoppingCart')}</h1>
                <h2 className="font-semibold text-2xl">
                  {totalItem} {totalItem > 1 ? t('cart.items') : t('cart.item')}
                </h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  {t('cart.productDetails')}
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  {t('cart.quantity')}
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  {t('cart.price')}
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  {t('cart.total')}
                </h3>
              </div>
              {cart.map((item) => (
                <CartItems key={item.id} item={item} />
              ))}
              <Link href="/country" className="flex font-semibold text-indigo-600 text-sm mt-10 capitalize">
                <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                {t('cart.continueShopping')}
              </Link>
            </div>
            <CartSubTotal />
          </div>
        </div>
      </div>
    </>
  );
};

Index.layout = LayoutWrapper;
export default Index;
