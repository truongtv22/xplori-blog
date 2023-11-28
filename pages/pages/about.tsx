import dynamic from "next/dynamic";
import { scrollToElement } from "@/hooks/scrollToElement";
import Link from "next/link";
import { useRef } from "react";
import CountUp from "react-countup";
import { Swiper, SwiperSlide } from "swiper/react";
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
  () => import("../../src/components/layout/LayoutWrapper"),
  { ssr: false }
);
const Index = () => {
  const { t } = useTranslation();
  const explorerRef = useRef(null);
  const images = [
    "https://assets-global.website-files.com/5e941e9c459693aeff757d94/6269f92c3a6d2973ce6a2db1_our%20people%2001-p-800.jpeg",
    "https://assets-global.website-files.com/5e941e9c459693aeff757d94/6269f93cd84949b105870813_our%20people%2002-p-800.jpeg",
    "https://assets-global.website-files.com/5e941e9c459693aeff757d94/6269f9609336ee07522f94e5_our%20people%2003-p-800.jpeg",
    "https://assets-global.website-files.com/5e941e9c459693aeff757d94/6269f9609336ee07522f94e5_our%20people%2003-p-800.jpeg",
    "https://assets-global.website-files.com/5e941e9c459693aeff757d94/6269f9609336ee07522f94e5_our%20people%2003-p-800.jpeg",
  ];
  return (
    <>
      <Head>
        <title>Xplori - About Us</title>
      </Head>
      <div className="mx-auto mt-[70px]">
        <div className="absolute inset-x-0 min-h-0 pl-20 py-36 flex overflow-hidden z-[-1]">
          <span className="block bg-[#ef233c] w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96"></span>
          <span className="block bg-[#04868b] w-72 h-72 -ml-20 mt-40 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96 nc-animation-delay-2000"></span>
        </div>
        <div className="grid grid-cols-1 py-10 lg:grid-cols-2 lg:gap-x-10 gap-y-10 container z-1">
          <div className="flex items-center justify-center">
            <div>
              <div className="font-serif text-4xl font-bold">{t('about.title')}</div>
              <div className="mt-5 font-light text-gray-400">
                {t('about.content')}
              </div>
              <div className="flex grid items-center grid-cols-2 gap-5 mt-10 lg:grid-cols-4">
                <Link
                  href={"/products/flexible-credits"}
                  className="col-span-1 hover:cursor-pointer hover:transition hover:opacity-70 bg-indigo-600 text-white text-md font-semibold flex justify-center items-center h-[48px] rounded-full"
                >
                  <div>{t('about.getXplori')}</div>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative sm:mt-5">
            <img alt=""
              className="w-screen rounded-lg lg:w-full z-1"
              src="https://cdn.shopify.com/s/files/1/0023/8403/5875/files/about-bg.png?v=1557848484"
            />
            <div className="md:w-1/5 hidden lg:block lg:w-1/4 h-12 z-[-1] w-12 md:h-[11rem] lg:h-[10rem] md:absolute md:left-25 md:top-0 lg:-left-9 lg:-top-[4rem]"
              style={{backgroundImage: "radial-gradient(#ff7f7f 2px, transparent -3.5px)", backgroundSize: "1rem 1rem",}}></div>
            <div className="absolute w-full z-[-1] h-full rounded-lg bg-red-100 top-[20px] lg:block hidden left-[20px]"></div>
          </div>
        </div>
      </div>
      <div className="mt-[40px] container">
      </div>
      <div className="w-screen mt-5">
        <div className="hidden lg:block">
          <Swiper slidesPerView={3} spaceBetween={20}>
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img className="rounded-lg" src={image}  alt=""/>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="block lg:hidden">
          <Swiper slidesPerView={1}>
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img className="rounded-lg" src={image} alt=""/>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="mt-16 ">
        <div className="mx-auto max-w-[1000px]">
          <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-x-[45px] sm:gap-y-[40px]">
            <div className="">
              <div className="flex justify-center">
                <img alt="" src="https://assets-global.website-files.com/5e941e9c459693aeff757d94/626a35f6bd2492b86a7d51fd_US%20VN.svg" />
              </div>
              <div className="font-bold text-4xl text-[#2d3958] text-center mt-3">
                <CountUp end={1000} start={0} duration={2} enableScrollSpy />k+
              </div>
              <div className="font-normal text-gray-400 text-center mt-3">
                <span className="font-semibold text-[#2d3958]">{t('about.dataConsumed')}</span>
              </div>
            </div>
            <div className="">
              <div className="flex justify-center">
                <img src="https://assets-global.website-files.com/5e941e9c459693aeff757d94/626a363410b41291bad243b7_Heart.svg"  alt=""/>
              </div>
              <div className="font-bold text-4xl text-[#2d3958] text-center mt-3">
                <CountUp end={1} start={0} duration={2} enableScrollSpy />
                M+
              </div>
              <div className="font-normal text-gray-400 text-center mt-3">
                <span className="font-semibold text-[#2d3958]">{t('about.happyCustomers')}</span>
              </div>
            </div>
            <div className="">
              <div className="flex justify-center">
                <img src="https://assets-global.website-files.com/5e941e9c459693aeff757d94/626a364d370e6d69b605cba9_Global.svg"  alt=""/>
              </div>
              <div className="font-bold text-4xl text-[#2d3958] text-center mt-3">
                <CountUp end={10} start={10} duration={2} enableScrollSpy />
                k+
              </div>
              <div className="font-normal text-gray-400 text-center mt-3">
                <span className="font-semibold text-[#2d3958]">{t('about.peopleXplori')}</span>
              </div>
            </div>
            <div className="">
              <div className="flex justify-center">
                <img src="https://assets-global.website-files.com/5e941e9c459693aeff757d94/626a3663b2ab2c6549b806d9_b-meeting%201.svg" alt="" />
              </div>
              <div className="font-bold text-4xl text-[#2d3958] text-center mt-3">
                <CountUp end={150} start={0} duration={2} enableScrollSpy />
              </div>
              <div className="font-normal text-gray-400 text-center mt-3">
                <span className="font-semibold text-[#2d3958]">{t('about.countriesServed')}</span>
              </div>
            </div>
          </div>
          <div className="my-[50px] mx-auto border-t-[#0000000d] border-t-[2px] lg:max-w-[700px] container"></div>
          <div className="max-w-[800px] mx-auto">
            <div className="flex justify-center">
              <div className="">
                <div className="flex justify-center">
                  <img src="https://assets-global.website-files.com/5e941e9c459693aeff757d94/6269fc917a2024d949fa25f6_pin-heart%202.svg" alt="" />
                </div>
                <div className="font-bold text-[16px] text-[#2d3958] text-center mt-3">
                  {t('about.mainOffice')}
                </div>
                <div className="font-normal text-gray-400 text-center mt-3">
                  <div>
                    <span className="font-semibold text-[#2d3958]">{t('about.address')}:</span>{" "}
                    38 Lok Ku Road, Hong Kong
                  </div>
                  <div className="">
                    <span className="font-semibold text-[#2d3958]">{t('about.email')}:</span>
                    <a
                      className="ml-2 hover:text-indigo-600 hover:transition"
                      href="mailto:listen@xplori.world"
                    >
                      listen@xplori.world
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Index.layout = LayoutWrapper;
export default Index;
