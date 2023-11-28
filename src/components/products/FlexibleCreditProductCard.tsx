import React, {useState} from "react";
import {useRouter} from "next/router";
import { useAtom } from "jotai";
import {cartAtom} from "@/atom/cart";
import { useTranslation } from "next-i18next";
import { useCurrency } from "@/hooks/useCurrency";

export default function FlexibleCreditProductCard({item, index}) {
    const { t } = useTranslation();
    const router = useRouter();
    const [cart, setCart] = useAtom(cartAtom);
    const { currentCurrency, parseCurrency } = useCurrency();

    const handleCheckout = () => {
        setCart([{...item, quantity: 1}]);
        router.push("/cart").then();
    };

    const setSelected = (index) => {
        return ""
    }

    return (
        <div onClick={() => setSelected(index)} key={index}
             className="col-span-1 bg-white h-full p-5 rounded-xl transition relative hover:border-sky-400 border-[4px]">
            <div className="z-50">
                <div className="flex justify-end font-semibold text-2xl">
                    {currentCurrency.symbol} {parseCurrency(item.price)}
                </div>
                <div className="text-lg font-medium flex justify-end text-indigo-600">
                    {t('product.includesCredits', { price: parseFloat(item.price) + parseFloat(item.additional_credit) })}
                </div>
                <img className="mt-5" alt=""
                     src="https://cdn.shopify.com/s/files/1/0023/8403/5875/products/sights-cover.jpg"/>
                <div className="flex">
                    <div className="flex gap-x-5 mt-2 items-center w-full">
                        <div onClick={() => handleCheckout()}
                             className="border h-[36px] w-full flex items-center justify-center bg-indigo-600 rounded-lg text-white hover:cursor-pointer hover:opacity-70 hover:transition capitalize">
                            <div>{t('product.buyNow')}</div>
                        </div>
                    </div>

                </div>
            </div>
            {index === 1 && (
                <div className="absolute top-0 left-1 px-2 py-1 rounded-md text-white bg-[#CF0A0A] text-center capitalize">
                    {t('product.mostPopular')}
                </div>
            )}
        </div>
    );
}
