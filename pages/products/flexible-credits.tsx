import dynamic from "next/dynamic";
import React from "react";
import FlexibleCreditProductCard from "@/components/products/FlexibleCreditProductCard";
import {useTranslation} from "next-i18next";
import serverSideTranslations from "@/utils/serverSideTranslations";
import Link from "next/link";
import Head from "next/head";

const LayoutWrapper = dynamic(
    () => import("../../src/components/layout/LayoutWrapper"),
    {ssr: false}
);

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function getStaticProps({locale}) {
    const res = await fetch(`${baseURL}/product/?product_type=country-package&use_credit=true`);
    const {results: listPrices} = await res.json();
    return {
        props: {
            ...(await serverSideTranslations(locale)),
            listPrices,
        },
    };
}

export const Credits = ({listPrices}) => {
    const { t } = useTranslation();
    return (
        <>
            <Head>
                <title>Xplori - Flexible Credits</title>
            </Head>
            <div className="from-slate-400 via-purple-700 to-slate-800 py-20">
                <div
                    className="container rounded-xl border p-10 bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] ">
                    <div className="font-bold text-4xl text-center text-white">
                        {t('product.flexibleCredits')}
                    </div>
                    <div className="text-center font-semibold text-2xl">
                        {t('product.flexibleCreditsSub')}
                    </div>
                    <div className="grid items-center lg:grid-cols-3 grid-cols-1 gap-10 mt-20 ">
                        {listPrices.map((item, index) => (
                            <FlexibleCreditProductCard
                                key={item.id}
                                item={item}
                                index={index}
                            />
                        ))}
                    </div>
                    <div className="mt-10 grid lg:grid-cols-3 grid-cols-1 gap-x-5 container">
                        <div className="col-span-1 flex items-center rounded border gap-2 mt-2 lg:mt-0">
                            <img alt=""
                                src="https://cdn.shopify.com/s/files/1/0023/8403/5875/files/ic_white_secure_100x.png?v=1613542093"/>
                            <div className="text-white">{t('product.moneyBack')}</div>
                        </div>
                        <div className="col-span-1 flex items-center gap-2 rounded border mt-2 lg:mt-0">
                            <img alt=""
                                src="//cdn.shopify.com/s/files/1/0023/8403/5875/files/ic_white_fly_100x.png?v=1613542093"/>
                            <div className="text-white">{t('product.freeShip')}</div>
                        </div>
                        <div className="col-span-1 flex items-center gap-2 rounded border mt-2 lg:mt-0">
                            <img alt=""
                                src="//cdn.shopify.com/s/files/1/0023/8403/5875/files/ic_wite_money_100x.png?v=1613542093"/>
                            <div className="text-white">{t('product.bestRates')}</div>
                        </div>
                    </div>
                    <div className="mt-10 grid lg:grid-cols-2 grid-cols-1">
                        <Link href="/pages/rates-coverage"
                            className="btn btn-link text-white hover:text-indigo-700 mt-10 items-center">
                            {t('home.seeCountriesCovered')}
                            <i className="uil uil-arrow-right align-middle"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

Credits.layout = LayoutWrapper;
export default Credits;
