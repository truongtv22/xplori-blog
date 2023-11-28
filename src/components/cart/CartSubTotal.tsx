import { useAtom, useAtomValue } from "jotai";
import { cartAtom, cartTotalAtom } from "@/atom/cart";
import { currencyAtom } from "@/atom/currency";
import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import Link from "next/link";
import {useRouter} from "next/router";
import { useTranslation } from "next-i18next";
import { useCurrency } from "@/hooks/useCurrency";

export default function CartSubTotal(children) {
  const { t } = useTranslation();
  const [currency, setCurrency] = useAtom(currencyAtom);
  const { currentCurrency, parseCurrency } = useCurrency();
  const cart = useAtomValue(cartAtom);
  const [cartTotal, setCartTotal] = useAtom(cartTotalAtom);
  const router = useRouter()
  const totalItem = cart.length;
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += Number(item.quantity);
  });

  let total = 0;
  cart.forEach((item) => {
    total += Number(item.price) * Number(item.quantity);
  });

  useEffect(() => {
    setCartTotal({
      total: total.toFixed(2),
      totalQuantity: totalQuantity,
    });
  }, [cart, currency]);

  return (
    <div id="summary" className="lg:w-1/4 px-8 py-10 bg-[#f6f6f6]">
      <h1 className="font-semibold text-2xl border-b pb-8 capitalize">{t('cart.orderSummary')}</h1>
      <div className="flex justify-between mt-10 mb-5">
        <span className="font-semibold text-sm uppercase">
          {totalItem} {totalItem > 1 ? t('cart.items') : t('cart.item')}
        </span>
        <span className="font-semibold text-sm">
          {currentCurrency.symbol}{" "}
          {parseCurrency(total)}
        </span>
      </div>
      <div className="border-t mt-8">
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span>{t('cart.totalCost')}</span>
          <span>
            {currentCurrency.symbol}{" "}
            {parseCurrency(total)}
          </span>
        </div>
        <button onClick={() => router.push('/checkout')}
            className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">{t('cart.checkout')}
        </button>
      </div>
    </div>
  );
}
