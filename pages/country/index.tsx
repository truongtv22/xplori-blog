import get from "lodash.get";
import debounce from "lodash.debounce";
import dynamic from "next/dynamic";
import React, {useCallback, useEffect, useRef, useState} from "react";

import { useGetListCountryItems } from "@/query/useGetListCountryItems";
import CountryCard from "@/components/products/CountryCard";
import { scrollToElement } from "@/hooks/scrollToElement";
import Head from "next/head";
import { useGetListCountry } from "@/query/useGetListCountry";
import {useIsInViewport} from "@/hooks/useIsInViewport";
import {Portal} from "@/components/portal/Portal";
import {Loading} from "@/components/common/Loading";
import { useTranslation } from "next-i18next";
import serverSideTranslations from "@/utils/serverSideTranslations";

const LayoutWrapper = dynamic(
  () => import("../../src/components/layout/LayoutWrapper"),
  { ssr: false }
);

export async function getStaticProps({ locale }) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/v2/items/?search=`
  const res = await fetch(url);
  const listCountry = await res.json();
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      listCountry,
    },
  };
}

export const Country = ({ listCountry }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [show, setShow] = useState(false)
  const [isSearching, setIsSearching] = useState(false);
  const { data: dataCountryPopularItems, isFetching } = useGetListCountryItems(
    search,
    country, true,
  );
  const { data: dataListCountry } = useGetListCountry();
  const allCountry = React.useMemo(() => {
    const data = [];
    const dataCountry = get(dataListCountry, "data", []);
    data.push({
      label: t('country.allCountry'),
      value: "",
    });
    dataCountry.forEach((item) => {
      data.push({
        label: item,
        value: item,
      });
    });
    return data;
  }, [dataListCountry]);
  const dataListItems = get(dataCountryPopularItems, "data", []);
  const listRef = useRef(null);
  const handleCloseSearch = () => {
    setValue("");
    setSearch('')
    setIsSearching(false);
  };

  const itemsRef = useRef(null);

  useEffect(() => {
    debounceSearch(value)
  }, [value])

  const debounceSearch = useCallback(
    debounce((newValue) => {
      if (newValue !== search) {
        setSearch(newValue)
      }
    }, 500),
    []
  );

  const ItemList:any = () => {
    if (!show) return [];
    return allCountry?.filter((item) => item.label.toLowerCase().includes(search.toLowerCase())).map((item) => (
      <button onClick={() => {
        scrollToElement(listRef)
        setValue(item.value)
        setShow(false)
      }}>{item.label}</button>
    ))
  }


  return (
    <>
      <Head>
        <title>Xplori - List Product</title>
      </Head>
      <div className="pt-20 bg-white relative">
        <div className="absolute inset-x-0 md:top-5 min-h-0 pl-20 flex overflow-hidden z-0">
          <span className="block bg-[#ef233c] rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96"></span>
          <span className="block bg-[#04868b] -ml-20 mt-40 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96 nc-animation-delay-2000"></span>
        </div>
        <div className="container">
          <div className="grid lg:grid-cols-2 grid-cols-1">
            <div className="col-span-1 text-black">
              <div className="font-semibold text-7xl ">
                <br /> {t('country.title')}
              </div>
              <br />
              <div className="text-xl ">
                <br /> {t('country.subTitle')}
              </div>
            </div>
            <div className="col-span-1 flex items-center">
              <img alt="" src="https://cdn.shopify.com/s/files/1/0023/8403/5875/t/6/assets/sim-xplori-2.png?25715"/>
            </div>
          </div>
          <div className="bg-white shadow-xl w-full h-[100px] rounded-full px-5 ">
            <div className="z-10 flex items-center w-full h-full relative">
              <i className="mdi mdi-airplane text-4xl text-gray-400"></i>
              <div className="flex justify-between w-full ">
                <div className="grid grid-rows-2 ml-2 gap-2 w-full">
                  <div className="row-span-2 flex justify-between items-center pr-2 relative">
                    <div className='relative w-full'>
                      <input value={value} onChange={(event) => setValue(event.target.value)} onFocus={() => setShow(true)} onBlur={() => setTimeout(() => setShow(false), 150)} placeholder={t('country.searchCountry')} className='w-full h-full px-5 text-xl placeholder:text-xl flex items-center focus:outline-0' />
                      <div className='list'>
                        <ItemList />
                      </div>
                    </div>
                    <div className=''>
                      <i onClick={handleCloseSearch} className='mdi mdi-close text-2xl text-gray-400'></i>
                    </div>
                  </div>
                </div>

                <div onClick={() => scrollToElement(listRef)}
                  className="w-[60px] h-[60px] group rounded-full hover:bg-blue-500 flex items-center justify-center">
                  {isFetching ? (<Loading />) : (
                    <i className="mdi mdi-arrow-left-bottom text-4xl group-hover:text-white" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div ref={itemsRef} className="mt-10 grid lg:grid-cols-4 grid-cols-1 gap-5 px-4 lg:px-0">
          {dataListItems.map((item, index) => (
            <div
              key={index}
              data-aos="animation-translate-right"
              className="col-span-1"
            >
              <CountryCard items={item} />
            </div>
          ))}
        </div>
        {!useIsInViewport(itemsRef) && (
            <Portal>
              <div onClick={() => scrollToElement(listRef)} className='w-[40px] hover:cursor-pointer h-[40px] rounded-full flex items-center justify-center text-white shadow-2xl bg-indigo-600'>
                <i className='mdi mdi-arrow-down text-xl'></i>
              </div>
            </Portal>
        )}
      </div>
    </>
  );
};

Country.layout = LayoutWrapper;
export default Country;
