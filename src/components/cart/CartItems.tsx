import {useAtom, useSetAtom} from "jotai";
import React, {useState} from "react";

import {cartAtom} from "@/atom/cart";
import {currencyAtom} from "@/atom/currency";
import {useRouter} from "next/router";
import { useTranslation } from "next-i18next";
import { useCurrency } from "@/hooks/useCurrency";
import { getSlug } from "@/utils/slugify";

export default function CartItems({item}) {
    const { t } = useTranslation();
    const [quantity, setQuantity] = useState(Number(item.quantity));
    const setCart = useSetAtom(cartAtom);
    const [currency, setCurrency] = useAtom(currencyAtom);
    const { currentCurrency, parseCurrency } = useCurrency();
    const router = useRouter()
    const onChangeQuantity = async (value) => {
        setQuantity(value);
        await setCart((oldCart) => {
            const index = oldCart.findIndex(
                (cartItem) => cartItem.id === Number(item.id)
            );
            const newCart = [...oldCart];
            newCart[index].quantity = Number(value);
            return newCart;
        });
    };

    const handleDeleteItems = (item) => {
        setCart((oldCart) => {
            return oldCart.filter(
                (cartItem) => Number(cartItem.id) !== Number(item.id)
            );
        });
    };

    return (
        <>
            <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">

                <div className="flex w-2/5">
                    <div className="hidden lg:block w-40">
                        <img className="h-24"
                             src={item.image ? item.image : "https://cdn.shopify.com/s/files/1/0023/8403/5875/products/sights-cover.jpg"}
                             alt=""/>
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span onClick={() => router.push(`/products/${getSlug(item.id, item.country)}`)}
                            className="font-bold hover:cursor-pointer text-sm hover:text-indigo-600 ease-in-out duration-500">{item.name}</span>
                        <div onClick={() => handleDeleteItems(item)}
                             className="font-semibold text-red-500 text-xs hover:cursor-pointer">{t('cart.remove')}
                        </div>
                    </div>
                </div>

                <div className="lg:flex hidden justify-center w-1/5">
                    <button
                        disabled={quantity < 1}
                        onClick={() => onChangeQuantity(Number(quantity) - 1)}
                        className={
                            "btn transition items-center bg-white" +
                            (quantity < 1 ? "bg-gray-200" : "")
                        }
                    >
                        -
                    </button>

                    <input type="number"
                           className="border text-center w-16" size={1} value={quantity}
                           onChange={(e: any) => onChangeQuantity(e.target.value)}/>

                    <button
                        onClick={() => onChangeQuantity(Number(quantity) + 1)}
                        className="btn items-center bg-white"
                    >
                        +
                    </button>
                </div>
                <div className="lg:hidden w-1/5 align-middle text-center">
                    {quantity}
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">
                    {currentCurrency.symbol}{" "}
                    {parseCurrency(Number(item.price))}
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                    {currentCurrency.symbol}{" "}
                    {parseCurrency(Number(item.price) * quantity)}
                </span>
            </div>
        </>
    );
}
