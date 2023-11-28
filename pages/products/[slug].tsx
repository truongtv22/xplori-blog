import { Tab, Transition, Dialog } from "@headlessui/react";
import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Fragment, useEffect, useMemo, useState } from "react";
import Star from "@/components/products/Star";
import { cartAtom } from "@/atom/cart";
import { currencyAtom } from "@/atom/currency";
import { useGetListItemByCountry } from "@/query/useGetListItemByCountry";
import Head from "next/head";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { getIdFormSlug } from "@/utils/slugify";
import serverSideTranslations from "@/utils/serverSideTranslations";
import { useCurrency } from "@/hooks/useCurrency";

const MySwal = withReactContent(Swal);

const LayoutWrapper = dynamic(
  () => import("../../src/components/layout/LayoutWrapper"),
  { ssr: false }
);

export const Index = ({ product }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { slug } = router.query;
  const id = getIdFormSlug(slug);
  const { data: dataLineItems } = useGetListItemByCountry(id);
  const listVariant = dataLineItems?.data?.packages;

  const [isOpen, setIsOpen] = useState(false)

  const [cart, setCart] = useAtom(cartAtom);
  const { currentCurrency, parseCurrency } = useCurrency();
  const [currency, setCurrency] = useAtom(currencyAtom);
  const [quantity, setQuantity] = useState(1);
  const currentVariant = useMemo(() => {
    if (listVariant?.length > 0) {
      const foundIndex = listVariant.findIndex((item) => item.id === Number(id));
      if (foundIndex > -1) {
        return listVariant[foundIndex];
      }
      return listVariant[0];
    }
    return null;
  }, [listVariant]);

  const [selectedVariant, setSelectedVariant] = useState<any>({});

  useEffect(() => {
    setSelectedVariant(currentVariant);
  }, [currentVariant]);

  useEffect(() => {
    setQuantity(1);
  }, [selectedVariant]);

  const dataAddToCart = {
    ...selectedVariant,
    quantity,
  };

  const countries = useMemo<string[]>(() => {
    if (product?.countries) {
      return product.countries;
    }
    return [];
  }, []);

  const addToCart = () => {
    MySwal.fire({
      title: t('product.addtoCartSuccessfully'),
      html: (
        <div>
          {t('product.continueShopping')}{" "}
          <Link className="text-indigo-600 font-semibold" href={"/checkout"}>
            {t('product.checkOut')}
          </Link>
        </div>
      ),
      icon: "success",
    });
    setCart((oldCart) => {
      const index = oldCart.findIndex((item) => item.id === Number(selectedVariant.id));
      if (index !== -1) {
        const newCart = [...oldCart];
        newCart[index].quantity += Number(quantity);
        return newCart;
      }
      return [...oldCart, dataAddToCart];
    });
  };

  const buyNowButton = (e) => {
    e.preventDefault();
    setCart([
      {
        ...dataAddToCart,
      },
    ]);
    router.push("/cart").then(function (){
      console.log("Go to Cart")
    });
  };

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <Head>
        <title>Xplori - Products</title>
      </Head>
      <section className="relative table w-full md:pb-24 pb-16 mt-36">
        <div className="container">
          <div className="flex">
            <div className="flex items-center gap-2 text-gray-400">
              <Link href="/">
                <i className="text-2xl mdi mdi-home-outline "></i>
              </Link>
              <div>›</div>
              <Link href={"/country"} className="text-lg text-gray-400">
                {t('product.country')}
              </Link>
              <div>›</div>
              <div className="text-gray-400 text-lg">
                {dataLineItems?.data?.country}
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 mt-5 p-5 border rounded-lg">
            <div className="">
              <div className="top-20">
                <img
                  src={selectedVariant?.image}
                  className="rounded-md shadow-md dark:shadow-gray-800"
                  alt=""
                />
              </div>
              <div className="lg:block mt-10">
                <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
                  <Tab.List as="div" className="grid grid-cols-2">
                    <Tab as="div">
                      {({ selected }) => (
                        /* Use the `selected` state to conditionally style the selected tab. */
                        <button
                          className={
                            "flex justify-center w-full font-semibold p-2 transition delay-300 " +
                            (selected && "border-b border-b-red-500")
                          }
                        >
                          {t('product.description')}
                        </button>
                      )}
                    </Tab>
                    <Tab as="div">
                      {({ selected }) => (
                        /* Use the `selected` state to conditionally style the selected tab. */
                        <button
                          className={
                            "flex justify-center w-full font-semibold p-2 transition delay-300 " +
                            (selected && "border-b border-b-red-500")
                          }
                        >
                          {t('product.countryCoverage')}
                        </button>
                      )}
                    </Tab>
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel as="div" className="mt-5">
                      <Transition appear
                                  show={tabIndex == 0}
                                  enter="transition-opacity duration-500"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="transition-opacity duration-500"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0">
                        <div>
                          {selectedVariant?.name}
                        </div>
                      </Transition>
                    </Tab.Panel>
                    <Tab.Panel as="div" className="mt-5">
                      <Transition appear
                                  show={tabIndex == 1}
                                  enter="transition-opacity duration-500"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="transition-opacity duration-500"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0">
                        <div className="space-y-1">
                          <ul className="grid grid-cols-2 grid-sp gap-1 text-gray-500 list-inside dark:text-gray-400">
                            {countries.slice(0, 10).map((country) => (
                              <li key={country} className="flex items-center">
                                <svg className="w-3.5 h-3.5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                                {country}
                              </li>
                            ))}
                          </ul>
                          {countries.length > 10 && (
                            <div className="cursor-pointer text-indigo-500" onClick={() => setIsOpen(true)}>
                              {t('product.viewMore')}
                            </div>
                          )}
                          <Transition appear show={isOpen} as={Fragment}>
                            <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
                              <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <div className="fixed inset-0 bg-black bg-opacity-25" />
                              </Transition.Child>
                              <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                  <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                  >
                                    <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                      <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                      >
                                        {t('product.countryCoverage')}
                                      </Dialog.Title>
                                      <div className="mt-3">
                                        <ul className="grid grid-cols-2 lg:grid-cols-3 grid-sp gap-1 text-gray-500 list-inside dark:text-gray-400">
                                          {countries.map((country) => (
                                            <li key={country} className="flex items-center">
                                              <svg className="w-3.5 h-3.5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                              </svg>
                                              {country}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </Dialog.Panel>
                                  </Transition.Child>
                                </div>
                              </div>
                            </Dialog>
                          </Transition>
                        </div>
                      </Transition>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
            <div className="">
              <div className="bg-[#F8F8FB] p-4 rounded-lg border">
                <div className="font-bold text-4xl">
                  {dataLineItems?.data?.country}
                </div>
                <div className="text-xl font-medium">
                  {currentCurrency.symbol}{" "}
                  {parseCurrency(selectedVariant?.price * quantity)}
                </div>
                {dataLineItems?.data?.buy_count >= 0 && (
                  <div className="text-sm text-gray-500">
                    {dataLineItems?.data?.buy_count > 1 ? (
                      <div>{dataLineItems?.data?.buy_count} {t('product.sales')}</div>
                    ) : (
                      <div>{dataLineItems?.data?.buy_count} {t('product.sale')}</div>
                    )}
                  </div>
                )}
                <Star reviews={dataLineItems?.data?.reviews} stars={dataLineItems?.data?.stars}/>
              </div>
              <div className="p-5 mt-3 shadow-lg rounded-lg box-border border">
                <div className="font-semibold text-xl">
                  {t('product.selectPackage')}
                </div>
                <div className="mt-3 grid lg:grid-cols-3 gap-3">
                  {listVariant?.map((variant, index) => {
                    const isActive = variant === selectedVariant;
                    return (
                      <div
                        key={index}
                        className={
                          "rounded p-3 relative hover:cursor-pointer shadow shadow-gray-300 hover:bg-blue-400 hover:bg-opacity-30  hover:shadow-gray-800 " +
                          (isActive
                            ? "preview-box shadow shadow-gray-800 bg-blue-500 bg-opacity-30"
                            : "")
                        }
                        onClick={() => setSelectedVariant(variant)}
                      >
                        <div className="text-sm font-semibold">
                          {variant?.name}
                        </div>
                        <div className="font-bold text-sm">
                          {currentCurrency.symbol}{" "}
                          {parseCurrency(variant?.price)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between items-center mt-10">
                  <label>{t('product.selectQuantity')}</label>
                  <div className="flex items-center justify-between text-md">
                    <button
                      disabled={quantity < 1}
                      onClick={() => setQuantity(Number(quantity) - 1)}
                      className={
                        "btn transition flex items-center " +
                        (quantity < 1 ? "bg-gray-200" : "")
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e: any) => setQuantity(e.target.value)}
                      className="btn flex items-center w-[64px]"
                    />
                    <button
                      onClick={() => setQuantity(Number(quantity) + 1)}
                      className="btn flex items-center"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-2 items-center mt-10">
                  <button
                    onClick={addToCart}
                    className="btn bg-indigo-600 hover:bg-red-600 col-span-1 border-indigo-600 hover:border-red-600 text-white rounded-md"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <i className="hidden lg:block mdi mdi-cart-plus me-2"></i>
                      <div className="capitalize">{t('product.addToCart')}</div>
                    </div>
                  </button>
                  <button
                    onClick={(e) => buyNowButton(e)}
                    className="btn bg-gradient-to-br hover:opacity-80 hover:transition col-span-1  to-orange-600/20 via-fuchsia-600/20 from-indigo-600/20 text-black rounded-md"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className="capitalize">{t('product.buyNow')}</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps({ locale, params }) {
  const id = getIdFormSlug(params.slug);
  const res = await fetch(
    `https://services.xplori.world/api/v2/items/${id}/`
  );
  const product = await res.json();
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      product
    }
  };
}
Index.layout = LayoutWrapper;
export default Index;
