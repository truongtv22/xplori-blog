import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import useSize from "@react-hook/size";
import * as cookie from "cookie";
import { useTranslation } from "next-i18next";

import { cartAtom } from "@/atom/cart";
import { scrollToElement } from "@/hooks/scrollToElement";
// import { listCurrency } from "@/components/constant/listCurrency";
import { currencyAtom } from "@/atom/currency";
import { listLanguage } from "@/components/constant/listLanguage";
// import { languageAtom } from "@/atom/language";
import AlertSuccess from "@/components/alert/alert";
import { homeRefAtom } from "@/atom/allRef";
import { useCurrency } from "@/hooks/useCurrency";


const Footer = () => {
  const { t } = useTranslation();
  const footerRef = useRef(null);
  const [alertSuccess, setAlertSuccess] = useState(false);
  return (
    <footer
      ref={footerRef}
      className="footer font-nunito bg-dark-footer relative text-gray-200 dark:text-gray-200 mt-20"
    >
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <div className="py-[60px] px-0">
              <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                <div className="lg:col-span-3 md:col-span-12">
                  <div className="text-[22px] focus:outline-none">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/Logo_blue.png?v=10406514317586621941665761563"
                      alt=""
                    />
                  </div>
                  <div className="grid grid-cols-2 mt-3 gap-2 justify-center">
                    <Link href="https://itunes.apple.com/us/app/xplori/id1380723361" target="_blank">
                      <img
                        alt=""
                        src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/app-store.png?v=87856228320030175681665761563"
                      />
                    </Link>
                    <Link href="https://play.google.com/store/apps/details?id=com.world.eksplori" target="_blank">
                      <img
                        alt=""
                        src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/google-play.png?v=167979671281429535871665761563"
                      />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-2 md:col-span-4">
                  <h5 className="tracking-[1px] text-gray-100 font-semibold">
                    {t('footer.product')}
                  </h5>
                  <ul className="list-none footer-list mt-6">
                    <li className="mt-3">
                      <Link
                        href="/products/flexible-credits"
                        className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        {t('footer.globalCredits')}
                      </Link>
                    </li>
                    <li className="mt-3">
                      <Link
                        href="/country"
                        className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        {t('footer.countryPackage')}
                      </Link>
                    </li>
                    <li className="mt-3">
                      <Link
                        href="/pages/rates-coverage"
                        className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        {t('footer.rateCoverage')}
                      </Link>
                    </li>
                    <li className="mt-4">
                      <Link
                        href="/pages/faq"
                        className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        {t('footer.faq')}
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-2 md:col-span-4">
                  <h5 className="tracking-[1px] text-gray-100 font-semibold">
                    {t('footer.company')}
                  </h5>
                  <ul className="list-none footer-list mt-6">
                    <li>
                      <Link
                        href="/pages/about"
                        className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        {t('footer.about')}
                      </Link>
                    </li>
                    <li className="mt-3">
                      <Link
                        href="/pages/join-us"
                        className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        {t('footer.joinUs')}
                      </Link>
                    </li>
                    <li className="mt-3">
                      <Link
                        href="/pages/partner"
                        className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        {t('footer.partner')}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-2 md:col-span-4">
                  <h5 className="tracking-[1px] text-gray-100 font-semibold">
                    {t('footer.contact')}
                  </h5>
                  <ul className="list-none footer-list mt-6">
                    <li>
                      <div className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out">
                        <div className="flex flex-col">
                          <div className="font-semibold">{t('footer.email')}:</div>
                          <a href="mailto:listen@xplori.world">
                            listen@xplori.world
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out">
                        <div className="flex flex-col">
                          <div className="font-semibold">{t('footer.mainOffice')}:</div>
                          <div>38 Lok Ku Road, Hong Kong</div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-3 md:col-span-4">
                  <h5 className="tracking-[1px] text-gray-100 font-semibold">
                    {t('footer.newsletter')}
                  </h5>
                  <p className="mt-6">
                    {t('footer.newsletterSub')}
                  </p>
                  <form>
                    <div className="grid grid-cols-1">
                      <div className="foot-subscribe my-3">
                        <div className="form-icon relative mt-2">
                          <i
                            data-feather="mail"
                            className="w-4 h-4 mdi mdi-mail absolute top-2 left-4"
                          ></i>
                          <input
                            type="email"
                            className="form-input bg-gray-800 border border-gray-800 text-gray-100 pl-12 focus:shadow-none"
                            placeholder={t('footer.email')}
                            name="email"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setAlertSuccess(true)}
                        id="submitsubscribe"
                        name="send"
                        className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md"
                      >
                        {t('footer.subscribe')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-[30px] px-0 border-t border-slate-800">
        <div className="container text-center">
          <div className="flex justify-between items-center">
            <div className="md:text-left text-center">
              <p className="mb-0 italic">{t('footer.copyright')}</p>
            </div>
            <div className="italic">
              {t('footer.presence')}
              <span className="ml-2">
                Belgium | Germany | Qatar | Singapore | Thailand | Vietnam
              </span>
            </div>
          </div>
        </div>
      </div>
      <AlertSuccess
        open={alertSuccess}
        setIsOpen={setAlertSuccess}
        message={t('layout.gotYourEmail')}
      />
    </footer>
  );
};

export default function Layout({ children }) {
  const { t } = useTranslation();

  const navRef = useRef(null);
  const [navWidth, navHeight] = useSize(navRef);

  const toggleMenu = () => {
    document.getElementById("isToggle").classList.toggle("open");
    const isOpen = document.getElementById("navigation");
    if (isOpen.style.display === "block") {
      isOpen.style.display = "none";
    } else {
      isOpen.style.display = "block";
    }
  };

  const { listCurrency } = useCurrency();
  const [currency, setCurrency] = useAtom(currencyAtom);

  const [homeRef, setHomeRef] = useAtom(homeRefAtom);
  const router = useRouter();
  const { locale } = router;

  const remap = {"vi": "vn", "en": "us", "zh": "cn", "es": "es", "de": "de"};

  const setLanguage = (lang) => {
    document.cookie = cookie.serialize('NEXT_LOCALE', lang, { path: '/', maxAge: 60 * 60 * 24 * 7 });
    router.push(router.asPath, undefined, { locale: lang });
  };

  const [activeTab, setActiveTab] = useState("");
  useEffect(() => {
    switch (router.pathname) {
      case "/": {
        setActiveTab("home");
        break;
      }
      case "/pages/rates-coverage": {
        setActiveTab("rates-coverage");
        break;
      }
      case "/country": {
        setActiveTab("products");
        break;
      }
      case "/pages/faq": {
        setActiveTab("support");
        break;
      }
      case "/pages/about": {
        setActiveTab("about-us");
        break;
      }
    }
  }, [router.pathname]);
  const scrollTo = (ref) => {
    if (router.asPath !== "/") {
      router.push("/").then();
    } else {
      scrollToElement(ref);
    }
  };
  const [cart, setCart] = useAtom(cartAtom);
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    if (document) {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300) {
        setVisible(true);
      } else if (scrolled <= 300) {
        setVisible(false);
      }
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <>
      <div className="font-nunito">
        <nav ref={navRef} id="topnav" className="defaultscroll fixed top-0 shadow-xl bg-white w-full dark:bg-slate-900 !z-50">
          <div className="container flex justify-between">
            <Link className="logo pl-0" href="/">
              <img
                width={133}
                src="https://cdn.shopify.com/s/files/1/0023/8403/5875/files/Xplori_logo_250x.png?v=1613174541"
                className="inline-block dark:hidden"
                alt=""
              />
            </Link>
            <div id="navigation">
              <ul className="navigation-menu">
                <li>
                  <div onClick={() => scrollTo(homeRef)} className={"sub-menu-item hover:cursor-pointer " + (activeTab === "home" && "!text-indigo-600")}>
                    {t('header.whatIsXplori')}
                  </div>
                </li>
                <li>
                  <div onClick={() => router.push("/products/flexible-credits")} className={"sub-menu-item hover:cursor-pointer " +
                      (activeTab === "rates-coverage" && "!text-indigo-600")}>
                    {t('header.globalCredits')}
                  </div>
                </li>
                <li>
                  <div onClick={() => router.push("/country")} className={"sub-menu-item hover:cursor-pointer " + (activeTab === "products" && "!text-indigo-600")}>
                    {t('header.countryPackage')}
                  </div>
                </li>
                <li>
                  <div onClick={() => router.push("/pages/faq")} className={"sub-menu-item hover:cursor-pointer " + (activeTab === "support" && "!text-indigo-600")}>
                    {t('header.faq')}
                  </div>
                </li>
              </ul>
            </div>

            <div className="menu-extras">
              <div className="menu-item">
                <div
                  className="navbar-toggle"
                  onClick={toggleMenu}
                  id="isToggle"
                >
                  <div className="lines">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <i className="mdi mdi-currency-usd text-xl hidden lg:block" />
                <select
                  style={{ backgroundColor: "transparent" }}
                  className="text-black mr-2"
                  value={currency}
                  onChange={(event) => setCurrency(event.target.value)}
                >
                  {listCurrency.map((item, index) => (
                    <option
                      className="text-black"
                      key={index}
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                {/*<i className="mdi mdi-currency-usd text-xl" />*/}
                <img className="hidden lg:block" src={"https://flagcdn.com/" + remap[locale] + ".svg"} width="30" alt="" />
                <select
                  style={{ backgroundColor: "transparent" }}
                  className="text-black mr-2"
                  value={locale}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {listLanguage.map((item, index) => (
                    <option className="text-black" key={index} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <Link className="w-12 relative text-right" href={"/cart"}>
                <i className="mdi mdi-cart-outline text-2xl"></i>
                <div
                  className={
                    "absolute top-[-1px] right-[-1px] w-[16px] h-[16px] rounded-full bg-indigo-600 text-white text-xs items-center justify-center " +
                    (cart.length === 0 ? "hidden" : "flex")
                  }
                >
                  {cart.length}
                </div>
              </Link>
            </div>
          </div>
        </nav>
        <div style={{ height: navHeight }} />
        <div>{children}</div>

        <Footer />
      </div>
      <div
        onClick={() => scrollToTop()}
        className={
          "fixed z-[100] w-[80px] h-[80px] shadow-2xl hover:cursor-pointer justify-center items-center group hover:bg-indigo-600 hover:bg-indigo-700 hover:border-indigo-600 rounded-full bg-white bottom-10 right-10 " +
          (visible ? "flex" : "hidden")
        }
      >
        <div className="relative">
          <i className="mdi mdi-arrow-up group-hover:text-white text-[30px]"></i>
        </div>
      </div>
    </>
  );
}
