import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import { globalCoverageRefAtom, homeRefAtom } from "@/atom/allRef";
// import { scrollToElement } from "@/hooks/scrollToElement";

import PartnersCarousel from "../src/components/carousel/PartnersCarousel";
import Head from "next/head";

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
  () => import("../src/components/layout/LayoutWrapper"),
  { ssr: false }
);

const Index = (props) => {
  const { t } = useTranslation();
  const globalCoverageRef = useRef(null);
  const [_, setGlobalCoverageRef] = useAtom(globalCoverageRefAtom);
  const homeRef = useRef(null);
  const [__, setHomeRef] = useAtom(homeRefAtom);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setGlobalCoverageRef(globalCoverageRef);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setHomeRef(homeRef);
  }, []);
  const router = useRouter();
  const discoverRef = useRef(null);
  return (
    <>
      <Head>
        <title>Xplori Global SIM & eSIM</title>
      </Head>
      <section
        ref={homeRef}
        className="relative md:py-52 py-36 items-center overflow-hidden"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-fill absolute top-0 left-0 w-auto min-w-full min-h-full max-w-none z-[-1]"
        >
          <source
            src="https://cdn.shopify.com/s/files/1/0023/8403/5875/files/478210164.mp4?26515"
            type="video/mp4"
          />
          <source
            src="https://cdn.shopify.com/s/files/1/0023/8403/5875/files/478210164.webm?26515"
            type="video/webm"
          />
          <source
            src="https://cdn.shopify.com/s/files/1/0023/8403/5875/files/478210164.ogv?26518"
            type="video/ogg"
          />
        </video>
        <div className="container grid lg:grid-cols-2 grid-cols-1">
          <div className="grid grid-cols-1 col-span-1 mt-10">
            <h4 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-2 text-black dark:text-white">
              {t('home.slogan')}
            </h4>
            <p className="text-lg max-w-xl">
              {t('home.sloganSub')}
            </p>
            <div className="flex grid items-center grid-cols-2 gap-5 lg:grid-cols-4">
                <Link
                  href={"/products/flexible-credits"}
                  className="col-span-1 hover:cursor-pointer hover:transition hover:opacity-70 bg-indigo-600 text-white text-md font-semibold flex justify-center items-center h-[48px] rounded-full"
                >
                  <div>{t('home.getXplori')}</div>
                </Link>
              </div>
          </div>
          <div className="col-span-1 lg:block hidden">
            <img
              src="https://cdn.shopify.com/s/files/1/0023/8403/5875/t/6/assets/sim-xplori-2.png?25715"
              alt=""
            />
          </div>
        </div>
      </section>

      <section ref={discoverRef} className="relative md:py-24 py-16 ">
        <div className="container ">
          <div
            data-aos="animation-translate-right"
            data-aos-delay="300"
            className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]"
          >
            <div className="group relative px-6 py-10 shadow-xl hover:shadow-md hover:bg-indigo-600 transition-all duration-500 ease-in-out rounded-xl bg-white dark:bg-slate-900 overflow-hidden text-center">
              <div className="relative overflow-hidden text-transparent -m-3 flex justify-center">
                <img
                  alt="Icon"
                  src="https://cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/plane.png?v=66575635620914130121665761563"
                  className="img w-[120px] h-[120px]"
                />
              </div>

              <div className="mt-6">
                <div className="text-lg font-medium group-hover:text-white transition-all duration-500 ease-in-out">
                  {t('home.convenient')}
                </div>
                <p className="text-slate-400 group-hover:text-white/50 transition-all duration-500 ease-in-out mt-3">
                  {t('home.convenientSub')}
                </p>
              </div>
            </div>

            <div className="group relative px-6 py-10 shadow-xl dark:shadow-gray-800 hover:shadow-md dark:hover:shadow-gray-700 hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-all duration-500 ease-in-out rounded-xl bg-white dark:bg-slate-900 overflow-hidden text-center">
              <div className="relative overflow-hidden text-transparent -m-3 flex justify-center">
                <img
                  alt="Icon"
                  src="https://cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/money.png?v=10153623603977492491665761563"
                  className="img w-[120px] h-[120px]"
                />
              </div>

              <div className="mt-6">
                <div className="text-lg font-medium group-hover:text-white transition-all duration-500 ease-in-out">
                  {t('home.value')}
                </div>
                <p className="text-slate-400 group-hover:text-white/50 transition-all duration-500 ease-in-out mt-3">
                  {t('home.valueSub')}
                </p>
              </div>
            </div>

            <div className="group relative px-6 py-10 shadow-xl dark:shadow-gray-800 hover:shadow-md dark:hover:shadow-gray-700 hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-all duration-500 ease-in-out rounded-xl bg-white dark:bg-slate-900 overflow-hidden text-center">
              <div className="relative overflow-hidden text-transparent -m-3 flex justify-center">
                <img
                  alt="Icon"
                  src="https://cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/shield.png?v=23362680216971438341665761563"
                  className="img w-[120px] h-[120px]"
                />
              </div>

              <div className="mt-6">
                <div className="text-lg font-medium group-hover:text-white transition-all duration-500 ease-in-out">
                  {t('home.safe')}
                </div>
                <p className="text-slate-400 group-hover:text-white/50 transition-all duration-500 ease-in-out mt-3">
                  {t('home.safeSub')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative md:py-36 py-16 items-center overflow-hidden bg-gradient-to-br to-orange-600/20 via-fuchsia-600/20 from-indigo-600/20">
        <div className="container">
          <h4 className="font-bold lg:leading-normal text-center leading-normal text-4xl lg:text-5xl mb-2 text-black dark:text-white">
            {t('home.ourPartners')}
          </h4>
          <div className="text-lg text-center whitespace-pre-wrap">
            {t('home.ourPartnersSub')}
          </div>
          <PartnersCarousel />
        </div>
      </section>

      <section className="relative lg:py-16 py-8">
        <div className="container md:mt-24 mt-16 ">
          <div data-aos="animation-scale-y" data-aos-delay="300" className="grid grid-cols-1 pb-8 text-center ">
            <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
              {t('home.reasonsChoose')}
            </h3>
          </div>

          <div data-aos="animation-translate-right" data-aos-delay="300" className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-2 mt-8 gap-[30px]">
            <div className="blog relative rounded-md shadow dark:shadow-gray-800 overflow-hidden">
              <div className="flex justify-center mt-3">
                <img alt="" src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/ic-best-rates.png?v=38811930331788060971665761563" />{" "}
              </div>
              <div className="content p-6">
                <div className="title h5 text-lg font-medium hover:text-indigo-600 duration-500 ease-in-out">
                  {t('home.bestRates')}
                </div>
                <p className="text-slate-400 mt-3">
                  {t('home.bestRatesSub')}
                </p>
              </div>
            </div>
            <div className="blog relative rounded-md shadow dark:shadow-gray-800 overflow-hidden">
              <div className="flex justify-center mt-3">
                <img
                  alt=""
                  src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/ic-global.png?v=160058065823523691011665761563"
                />{" "}
              </div>
              <div className="content p-6">
                <div className="title h5 text-lg font-medium hover:text-indigo-600 duration-500 ease-in-out">
                  {t('home.globalNetwork')}
                </div>
                <p className="text-slate-400 mt-3">
                  {t('home.globalNetworkSub')}
                </p>
              </div>
            </div>
            <div className="blog relative rounded-md shadow dark:shadow-gray-800 overflow-hidden">
              <div className="flex justify-center mt-3">
                <img
                  alt=""
                  src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/ic-network.png?v=27774034991434795981665761563"
                />{" "}
              </div>
              <div className="content p-6">
                <div className="title h5 text-lg font-medium hover:text-indigo-600 duration-500 ease-in-out">
                  {t('home.networkPartners')}
                </div>
                <p className="text-slate-400 mt-3">
                  {t('home.networkPartnersSub')}
                </p>
              </div>
            </div>

            <div className="blog relative rounded-md shadow dark:shadow-gray-800 overflow-hidden">
              <div className="flex justify-center mt-3">
                <img
                  alt=""
                  src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/ic-simple.png?v=50668955355667982401665761563"
                />{" "}
              </div>

              <div className="content p-6">
                <div className="title h5 text-lg font-medium hover:text-indigo-600 duration-500 ease-in-out">
                  {t('home.simple')}
                </div>
                <p className="text-slate-400 mt-3">
                  {t('home.simpleSub')}
                </p>
              </div>
            </div>

            <div className="blog relative rounded-md shadow dark:shadow-gray-800 overflow-hidden">
              <div className="flex justify-center mt-3">
                <img
                  alt=""
                  src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/ic-trustworthy.png?v=97293892175233777981665761563"
                />{" "}
              </div>

              <div className="content p-6">
                <div className="title h5 text-lg font-medium hover:text-indigo-600 duration-500 ease-in-out">
                  {t('home.trustworthy')}
                </div>
                <p className="text-slate-400 mt-3">
                  {t('home.trustworthySub')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section ref={globalCoverageRef} className="relative lg:py-16 py-8">
        <div className="container">
          <div data-aos-delay="300" data-aos="animation-scale-y" className="text-center">
            <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
              {t('home.globalCoverage')}
            </h3>

            <p className="text-slate-400 max-w-xl mx-auto">
              {t('home.globalCoverageSub')}
            </p>
          </div>
          <div data-aos="animation-translate-right" data-aos-delay="300" className="grid lg:grid-cols-6 grid-cols-5">
            <div className="col-span-5">
              <img src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/global-map-3.jpg?v=169482323790623051391665761563" alt="text"/>
            </div>
            <div className="lg:col-span-1 col-span-5 lg:text-2xl text-xl flex flex-col lg:flex-col gap-3">
              <div className="text-center uppercase">{t('home.networkPartner')}</div>
              <img src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/telefonica.jpg?v=180210573348031038431665761563" alt="Partner"/>
              <img src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/china-mobile.jpg?v=120112944480156361971665761563" alt="Partner"/>
              <img src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/vodafone.jpg?v=23864997011323348861665761563" alt="Partner"/>
              <img src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/at-t.jpg?v=10846914216253015141665761563" alt="Partner"/>
              <img src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/telenor.jpg?v=25155296996735809851665761563" alt="Partner"/>
              <img src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/vimpel-com.jpg?v=164112873027393551431665761563" alt="Partner"/>
            </div>
          </div>
          <Link data-aos="animation-scale-y" data-aos-delay="300" href="/pages/rates-coverage"
                className="btn btn-link hover:text-indigo-600 after:bg-indigo-600 duration-500 ease-in-out">
            {t('home.seeCountriesCovered')}
            <i className="uil uil-arrow-right align-middle"></i>
          </Link>
        </div>
      </section>

      <section className="relative lg:py-16 py-8">
        <div className="container">
          <div data-aos="animation-scale-y" data-aos-delay="300" className="text-center">
            <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
              {t('home.dataPackages')}
            </h3>
          </div>
          <div data-aos="animation-translate-right" data-aos-delay="300"
               className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 mt-8 gap-[30px]">
            <div className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800 hover:shadow-lg dark:hover:shadow-gray-800 duration-500 ease-in-out">
              <div className="relative">
                <div className="h-[345px]">
                  <img
                    src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/sights-cover-highres.png?v=179279747887892588761665761563"
                    alt=""
                  />
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 right-0 left-0 text-center opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 duration-500 ease-in-out">
                  <Link
                    href="/products/flexible-credits"
                    className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md"
                  >
                    {t('home.viewOptions')}
                  </Link>
                </div>
              </div>

              <div className="p-6 relative">
                <div className="flex items-center">
                  <Link
                    href="/products/flexible-credits"
                    className="block font-semibold text-indigo-600"
                  >
                    {t('home.globalCredits')}
                  </Link>
                </div>
                <div className="hover:text-indigo-600 duration-500 ease-in-out">
                  {t('home.globalCreditsSub')}
                </div>
                <div className="hover:text-indigo-600 duration-500 ease-in-out">
                  {t('home.globalCreditsSub1')}
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800 hover:shadow-lg dark:hover:shadow-gray-800 duration-500 ease-in-out">
              <div className="relative">
                <div className="h-[345px]">
                  <img
                    src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/country-credits.png?v=54984320458031424681665761563"
                    alt=""
                  />
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 right-0 left-0 text-center opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 duration-500 ease-in-out">
                  <Link
                    href="/country"
                    className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md"
                  >
                    {t('home.viewOptions')}
                  </Link>
                </div>
              </div>

              <div className="p-6 relative">
                <div className="flex items-center">
                  <Link
                    href="/country"
                    className="block font-semibold text-indigo-600"
                  >
                    {t('home.countryCredits')}
                  </Link>
                </div>
                <div className="hover:text-indigo-600 duration-500 ease-in-out">
                  {t('home.countryCreditsSub')}
                </div>
                <div className="hover:text-indigo-600 duration-500 ease-in-out">
                  {t('home.countryCreditsSub1')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative md:py-32 py-8 bg-gradient-to-br to-orange-600/30 via-fuchsia-600/30 from-indigo-600/30">
        <div className=" grid grid-cols-12 relative lg:px-20 lg:gap-0 gap-5">
          {/*TODO: Find New Image With No White Space*/}
          <img
            className="lg:w-[700px] lg:block hidden h-auto absolute bottom-0"
            src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/xplori-landing-transparent.png?v=110280286555208549891665761563"
            alt=""
          />
          <div className="col-span-12 lg:col-span-3 flex justify-center ">
            <img
              data-aos="animation-translate-right"
              data-aos-delay="300"
              className="lg:hidden block "
              src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/xplori-landing-transparent.png?v=110280286555208549891665761563"
              alt=""
            />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <div
              data-aos="animation-scale-y"
              data-aos-delay="300"
              className="grid grid-cols-1 pb-8 text-center"
            >
              <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
                {t('home.useOurEsim')}
              </h3>

              <p className="max-w-xl mx-auto">
                {t('home.useOurEsimSub')}
              </p>
            </div>
            <div className="flex justify-center">
              <button
                data-aos="animation-translate-right"
                data-aos-delay="300"
                onClick={() => router.push("/products/flexible-credits")}
                type="button"
                id="get-app-button"
                name="send"
                className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md"
              >
                {t('home.getXplori')}
              </button>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-3">
            <div
              data-aos="animation-translate-right"
              data-aos-delay="300"
              className="grid gap-[30px]"
            >
              <div className="flex items-center gap-4">
                <img
                  className="w-[50px] h-[50px]"
                  src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/ic-rocket.png?v=77159677042792264421665761563"
                  alt=""
                />
                <div className="text-lg">{t('home.immediateDelivery')}</div>
              </div>
              <div className="flex items-center gap-4">
                <img
                  className="w-[50px] h-[50px]"
                  src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/ic-swapsim.png?v=48214868100654246711665761563"
                  alt=""
                />
                <div className="text-lg">{t('home.digitalSim')}</div>
              </div>
              <div className="flex items-center gap-4">
                <img
                  className="w-[50px] h-[50px]"
                  src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/ic-click.png?v=116977272139150885521665761563"
                  alt=""
                />
                <div className="text-lg">
                  {t('home.easyToUse')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative md:pt-24 pb-10 py-16">
        <div className="container">
          <div
            data-aos="animation-scale-y"
            data-aos-delay="300"
            className="grid grid-cols-1 pb-8 text-center"
          >
            <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
              {t('home.joinOur')}
            </h3>
          </div>
          <div
            data-aos="animation-translate-right"
            data-aos-delay="300"
            className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]"
          >
            <div className="group relative overflow-hidden bg-gray-50 dark:bg-slate-800 rounded-md shadow dark:shadow-gray-800">
              <div className="p-2 rounded-md shadow h-[150px] dark:shadow-gray-800 bg-gradient-to-br to-orange-600/20 via-fuchsia-600/20 from-indigo-600/20">
                <div className="text-center">
                  {t('home.user1Content')}
                </div>
              </div>

              <div className="p-6 pt-0 -mt-10 text-center">
                <img
                  src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/people1.png?v=122123036219644503711665761563"
                  className="h-20 w-20 rounded-full shadow-lg dark:shadow-gray-800 mx-auto"
                  alt=""
                />

                <div className="mt-4">
                  <div className="text-xl leading-none font-semibold hover:text-indigo-600 duration-500 ease-in-out block">
                    {t('home.user1')},
                  </div>
                  <div className="italic">{t('home.user1Job')}</div>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden bg-gray-50 dark:bg-slate-800 rounded-md shadow dark:shadow-gray-800">
              <div className="p-2 rounded-md shadow h-[150px] dark:shadow-gray-800 bg-gradient-to-br to-orange-600/20 via-fuchsia-600/20 from-indigo-600/20">
                <div className="text-center">
                  {t('home.user2Content')}
                </div>
              </div>

              <div className="p-6 pt-0 -mt-10 text-center">
                <img
                  src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/people3.png?v=81754300281891002561665761563"
                  className="h-20 w-20 rounded-full shadow-lg dark:shadow-gray-800 mx-auto"
                  alt=""
                />

                <div className="mt-4">
                  <div className="text-xl leading-none font-semibold hover:text-indigo-600 duration-500 ease-in-out block">
                    {t('home.user2')},
                  </div>
                  <div className="italic">{t('home.user2Job')}</div>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden bg-gray-50 dark:bg-slate-800 rounded-md shadow dark:shadow-gray-800">
              <div className="p-2 rounded-md shadow h-[150px] dark:shadow-gray-800 bg-gradient-to-br to-orange-600/20 via-fuchsia-600/20 from-indigo-600/20">
                <div className="text-center">
                  {t('home.user3Content')}
                </div>
              </div>

              <div className="p-6 pt-0 -mt-10 text-center">
                <img
                  src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/people4.png?v=148656315546695451301665761563"
                  className="h-20 w-20 rounded-full shadow-lg dark:shadow-gray-800 mx-auto"
                  alt=""
                />

                <div className="mt-4">
                  <div className="text-xl leading-none font-semibold hover:text-indigo-600 duration-500 ease-in-out block">
                    {t('home.user3')},
                  </div>
                  <div className="italic">{t('home.user3Job')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex justify-center">
        {/*TODO: Find The Image With No White Space*/}
        <div className="flex items-center gap-5">
          <img
            className="w-[200px] h-[200px]"
            alt=""
            src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/rate_playstore.svg?v=123261357842828608391665761563"
          />
          <img
            className="w-[200px] h-[200px]"
            alt=""
            src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/rate_klook.svg?v=65234344168601106841665761563"
          />
        </div>
      </div>
    </>
  );
};

Index.layout = LayoutWrapper;
export default Index;
