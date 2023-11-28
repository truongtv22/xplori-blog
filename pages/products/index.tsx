import {Tab} from "@headlessui/react";
import get from "lodash.get";
import dynamic from "next/dynamic";
import React, {Fragment, useState} from "react";

import AlertSuccess from "@/components/alert/alert";
import ProductsCarousel from "@/components/carousel/ProductsCarousel";
import {RenderCountryImage} from "@/components/common/RenderCountryImage";
import ProductCard from "@/components/products/ProductCard";
import {useGetListCountry} from "@/query/useGetListCountry";
import {useGetListItemPopular} from "@/query/useGetListItemPopular";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Head from "next/head";

const LayoutWrapper = dynamic(
    () => import("../../src/components/layout/LayoutWrapper"),
    {ssr: false}
);

export async function getStaticProps({locale}) {
    const res = await fetch(
        `https://services.xplori.world/api/v2/items/?product_type=country-package`
    );
    const listProduct = await res.json();
    return {
        props: {
            ...(await serverSideTranslations(locale)),
            listProduct,
        },
    };
}

export const Product = ({listProduct}) => {
    const {t} = useTranslation();
    const [currentCountry, setCurrentCountry] = useState("");
    const {data: dataItemsPopular} = useGetListItemPopular();
    const [alertSuccess, setAlertSuccess] = useState(false);
    const {data: dataCountry} = useGetListCountry();
    // const listCountry = get(dataCountry, "data", []);
    const listItemByCountry = (country) => {
        return listProduct.filter((item) => item.country === country);
    };

    const listCountryFilter = React.useMemo(() => {
        const data = [];
        listProduct.forEach((item) => {
            if (!data.includes(item.country)) {
                data.push(item.country);
            }
        });
        return data;
    }, [listProduct]);

    const dataCountrySlice = [];
    for (let i = 0; i < Math.ceil(listCountryFilter?.length / 3); i++) {
        dataCountrySlice.push(listCountryFilter.slice(i * 3, (i + 1) * 3));
    }

    const listItemsPopular = get(dataItemsPopular, "data", []);
    return (
        <>
            <Head>
                <title>Xplori - Products</title>
            </Head>
            <div className="bg-gradient-to-r to-violet-600/70 overflow-hidden from-blue-600/70 md:py-52 py-36">
                <h4 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-2 text-white text-center">
                    {t('product.suggestionsForYou')}
                </h4>
                <div className="py-5">
                    <ProductsCarousel products={listItemsPopular}/>
                </div>
                <div className="container lg:flex grid  lg:justify-center lg:gap-8 gap-0">
                    <div className="flex items-center text-white text-xl ">
                        <img alt="" className="w-[80px] h-[80px]"
                             src="//cdn.shopify.com/s/files/1/0023/8403/5875/files/ic_white_secure_100x.png?v=1613542093"
                        />
                        <span>{t('product.moneyBack')}</span>
                    </div>
                    <div className="flex items-center text-white text-xl">
                        <img alt="" className="w-[80px] h-[80px]"
                             src="//cdn.shopify.com/s/files/1/0023/8403/5875/files/ic_white_fly_100x.png?v=1613542093"
                        />
                        <span>{t('product.freeShip')}</span>
                    </div>
                    <div className="flex items-center text-white text-xl">
                        <img alt="" className="w-[80px] h-[80px]"
                             src="//cdn.shopify.com/s/files/1/0023/8403/5875/files/ic_wite_money_100x.png?v=1613542093"
                        />
                        <span>{t('product.bestRates')}</span>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="flex justify-center mt-10">
                    <div>
                        <h4 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-2 text-black dark:text-white">
                            {t('product.countryCredit')}
                        </h4>
                        <div className="lg:text-2xl text-lg">
                            {t('product.countryCreditSub')}
                        </div>
                    </div>
                </div>
                <div className="my-3">
                    <Tab.Group>
                        <Tab.List className="w-full grid grid-cols-3">
                            <Tab className="col-span-1 w-full" as="div">
                                {({selected}) => (
                                    /* Use the `selected` state to conditionally style the selected tab. */
                                    <button
                                        className={
                                            selected
                                                ? "bg-indigo-600 w-full hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 btn text-white"
                                                : "btn text-black w-full"
                                        }
                                    >
                                        {t('product.localEsims')}
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({selected}) => (
                                    /* Use the `selected` state to conditionally style the selected tab. */
                                    <button className={
                                        selected
                                            ? "bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 btn text-white"
                                            : "btn text-black"
                                    }
                                    >
                                        {t('product.regionalEsims')}
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({selected}) => (
                                    /* Use the `selected` state to conditionally style the selected tab. */
                                    <button className={
                                        selected
                                            ? "bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 btn text-white"
                                            : "btn text-black"
                                    }
                                    >
                                        {t('product.globalEsims')}
                                    </button>
                                )}
                            </Tab>
                            {/* ...  */}
                        </Tab.List>
                    </Tab.Group>
                </div>
                <div className="lg:block hidden">
                    <>
                        {dataCountrySlice.map((countries, index) => (
                            <>
                                <div key={index} className="mt-5 grid grid-cols-3 gap-[30px]">
                                    {countries.map((country, index2) => (
                                        <>
                                            <div key={index2} className="col-span-1">
                                                <button
                                                    onClick={() => {
                                                        if (currentCountry === country) {
                                                            setCurrentCountry("");
                                                        } else {
                                                            setCurrentCountry(country);
                                                        }
                                                    }}
                                                    className={
                                                        "flex items-center hover:cursor-pointer btn justify-between w-full shadow-xl rounded-xl " +
                                                        (currentCountry === country
                                                            ? " !border-red-500 bg-gradient-to-br to-orange-600/20 via-fuchsia-600/20 from-indigo-600/20"
                                                            : null)
                                                    }
                                                >
                                                    <div className="w-[60px] h-[40px] flex items-center">
                                                        {RenderCountryImage(country)}
                                                    </div>
                                                    <div>{country}</div>
                                                </button>
                                            </div>
                                        </>
                                    ))}
                                </div>
                                {countries.includes(currentCountry) && (
                                    <>
                                        <div className="grid grid-cols-3 gap-[30px] ">
                                            {listItemByCountry(currentCountry).map((item, index) => {
                                                const animateDelay = index * 0.3;
                                                return (
                                                    <div
                                                        style={{animationDelay: `${animateDelay}s`}}
                                                        key={index}
                                                        className="col-span-1 mt-5 animate__animated animate__fadeInRight"
                                                    >
                                                        <ProductCard
                                                            product={item}
                                                            setIsOpen={setAlertSuccess}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}
                            </>
                        ))}
                    </>
                </div>
                <div className="lg:hidden block">
                    <div className="grid grid-cols-1 mt-5 gap-5">
                        {listCountryFilter.map((country, index) => (
                            <>
                                <div key={index} className="col-span-1">
                                    <button
                                        onClick={() => {
                                            if (currentCountry === country) {
                                                setCurrentCountry("");
                                            } else {
                                                setCurrentCountry(country);
                                            }
                                        }}
                                        className={
                                            "flex items-center hover:cursor-pointer btn justify-between w-full shadow-xl rounded-xl " +
                                            (currentCountry === country
                                                ? " !border-red-500 bg-gradient-to-br to-orange-600/20 via-fuchsia-600/20 from-indigo-600/20 text-white"
                                                : null)
                                        }
                                    >
                                        <div className="w-[60px] h-[40px] flex items-center">
                                            {RenderCountryImage(country)}
                                        </div>
                                        <div>{country}</div>
                                    </button>
                                </div>
                                {country === currentCountry && (
                                    <div className="col-span-1 gap-5 ">
                                        {listItemByCountry(currentCountry).map((item, index) => {
                                            const animateDelay = index * 0.3;
                                            return (
                                                <div
                                                    key={index}
                                                    style={{animationDelay: `${animateDelay}s`}}
                                                    className="mt-5 animate__animated animate__fadeInDown"
                                                >
                                                    <ProductCard
                                                        product={item}
                                                        setIsOpen={setAlertSuccess}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                </div>
            </div>
            <AlertSuccess open={alertSuccess} setIsOpen={setAlertSuccess} message={t('product.addtoCartSuccessfully')}/>
        </>
    );
};

Product.layout = LayoutWrapper;
export default Product;
