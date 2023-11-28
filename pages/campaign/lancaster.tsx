import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import FAQList from '@/components/faq/faq-list';
import RedeemEsimCarousel from '@/components/carousel/RedeemEsimCarousel';

import { useTranslation } from 'next-i18next';
import serverSideTranslations from '@/utils/serverSideTranslations';

import bannerImage from '../../public/images/banner-lancaster.png';
import getEsimImage from '../../public/images/get-esim-bg.png';

import appStoreImage from '../../public/images/app-store.png';
import playStoreImage from '../../public/images/play-store.png';

import checkImg from '../../public/images/check-esim.png';
import buyImg from '../../public/images/pick-esim.png';
import installImg from '../../public/images/scan-qrcode.png';

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

const LayoutWrapper = dynamic(
  () => import('../../src/components/layout/LayoutWrapper'),
  { ssr: false },
);

const Index = () => {
  const { t } = useTranslation();
  const [brandId, setBrandId] = useState('Apple');

  const compatibles = useMemo(
    () => [
      {
        brand: 'Apple',
        devices: [
          [
            'iPhone 15, 15 Plus, Pro, 15 Pro Max',
            'iPhone 14, 14 Plus, Pro, 14 Pro Max',
            'iPhone 13, 13 Mini, 13 Pro, 13 Pro Max, SE 3 (2022)',
            'iPhone 12, 12 Mini, 12 Pro, 12 Pro Max',
            'iPhone 11, 11 Pro, 11 Pro Max',
            'iPhone XS, XS Max, XR',
            'iPhone SE (2020, 2022)',
            'iPad Pro 11-inch (1st, 2nd and 3rd generation)',
          ],
          [
            'iPad Pro 12.9-inch (3rd, 4th and 5th generation)',
            'iPad (7th, 8th and 9th generation)',
            'iPad Mini (5th and 6th generation)',
            'Apple watch series 3, 4, 5 and 6',
            'Apple watch SE',
            'iPad Pro 12.9-inch (3rd, 4th and 5th generation)',
          ],
        ],
      },
      {
        brand: 'Samsung',
        devices: [
          [
            'Galaxy S23, S23, S23 Ultra',
            'Galaxy S22, S22+ 5G, S22 Ultra 5G',
            'Galaxy S21, S21+ 5G, S21 Ultra 5G',
            'Galaxy S20, S20+, S20 Ultra',
            'Galaxy Z Flip, Flip 3, Flip 4',
          ],
          [
            'Galaxy Note 20, 20+, 20 Ultra',
            'Galaxy Z Fold, Fold 2, Fold 3, Fold 4',
            'Galaxy Watch',
          ],
        ],
      },
      {
        brand: 'Others',
        devices: [
          [
            'Google Pixel 7, 7 Pro',
            'Google Pixel 6, 6a, 6 Pro',
            'Google Pixel 5',
            'Google Pixel 4, 4a, 4 XL',
            'Google Pixel 3, 3 XL',
            'Google Pixel 3a, 3a XL',
            'Huawei P40, P40 Pro',
            'Huawei Mate 40 pro',
            'Oppo Find X5, X5 Pro, X3 Pro',
            'Oppo Reno 5A, Reno 6 Pro 5G',
          ],
          [
            'Sony Xperia 1 IV',
            'Sony Xperia 10 IV',
            'Sony Xperia 10 III Lite',
            'Motorola Razr (2019), Razr 5G',
            'Microsoft Surface Duo',
            'Honor Magic 4 Pro',
            'Fairphone 4',
          ],
        ],
      },
    ],
    [],
  );

  const listDevices = useMemo(() => {
    const brand = compatibles.find((item) => item.brand === brandId);
    if (brand) {
      return brand.devices;
    }
    return [];
  }, [brandId, compatibles]);

  return (
    <>
      <Head>
        <title>Xplori - Campaign Lancaster Hotel</title>
      </Head>

      {/* <section className="relative">
        <div className="container space-y-12 text-center">
          <img
            src={bannerImage.src}
            alt={t('campaignLancaster.title')}
            className="w-full"
          />
        </div>
      </section> */}

      <section className="relative">
        <div className="container space-y-12">
          <div className="space-y-12 text-center">
            <img
              src={bannerImage.src}
              alt={t('campaignLancaster.title')}
              className="w-full"
            />
            <h4 className="font-bold lg:leading-normal leading-normal text-2xl md:text-3xl lg:text-4xl">
              {t('campaignLancaster.title')}
            </h4>
          </div>
          <div className="space-y-10">
            <div className="space-y-6">
              <div
                data-aos="animation-scale-y"
                data-aos-delay="300"
                className="grid grid-cols-1 text-center"
              >
                <h3 className="font-bold lg:leading-normal text-center leading-normal text-xl md:text-2xl text-black dark:text-white">
                  {t('campaignLancaster.whatGet')}
                </h3>
              </div>
              <div data-aos="animation-translate-right" data-aos-delay="300">
                <div className="flex items-center justify-center space-x-8">
                  <ul className="flex flex-col space-y-4">
                    <li className="flex items-center space-x-4">
                      <div className="relative group">
                        <div className="w-8 h-8 -bg-indigo-600/5 rounded-full">
                          <div className="absolute flex inset-0 items-center justify-center">
                            <i className="uil uil-check text-3xl text-indigo-600"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col space-y-1">
                        <span className="text-xl">
                          {t('campaignLancaster.whatGetSub')}
                        </span>
                      </div>
                    </li>
                    <li className="flex items-center space-x-4">
                      <div className="relative group">
                        <div className="w-8 h-8 -bg-indigo-600/5 rounded-full">
                          <div className="absolute flex inset-0 items-center justify-center">
                            <i className="uil uil-check text-3xl text-indigo-600"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col space-y-1">
                        <span className="text-xl">
                          {t('campaignLancaster.whatGetSub1')}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div
                data-aos="animation-scale-y"
                data-aos-delay="300"
                className="grid grid-cols-1 text-center"
              >
                <h3 className="font-bold lg:leading-normal text-center leading-normal text-xl md:text-2xl text-black dark:text-white">
                  {t('campaignLancaster.howGet')}
                </h3>
              </div>
              <div data-aos="animation-translate-right" data-aos-delay="300">
                <div className="flex items-center justify-center space-x-8">
                  <ul className="flex flex-col space-y-4">
                    <li className="flex flex-col md:flex-row md:items-end md:space-x-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative group">
                          <div className="w-8 h-8 -bg-indigo-600/5 rounded-full">
                            <div className="absolute flex inset-0 items-center justify-center">
                              <i className="uil uil-check text-3xl text-indigo-600"></i>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col space-y-1">
                          <span className="text-xl">
                            {t('campaignLancaster.downloadApp')}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center space-x-1">
                        <div>
                          <Link
                            href="https://itunes.apple.com/us/app/xplori/id1380723361"
                            target="_blank"
                          >
                            <img
                              src={appStoreImage.src}
                              alt={t('campaignLancaster.downloadAppStore')}
                            />
                          </Link>
                        </div>
                        <div>
                          <Link
                            href="https://play.google.com/store/apps/details?id=com.world.eksplori"
                            target="_blank"
                          >
                            <img
                              src={playStoreImage.src}
                              alt={t('campaignLancaster.downloadPlayStore')}
                            />
                          </Link>
                        </div>
                      </div>
                    </li>
                    <li className="flex items-center space-x-4">
                      <div className="relative group">
                        <div className="w-8 h-8 -bg-indigo-600/5 rounded-full">
                          <div className="absolute flex inset-0 items-center justify-center">
                            <i className="uil uil-check text-3xl text-indigo-600"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col space-y-1">
                        <span className="text-xl">
                          {t('campaignLancaster.enterPromo')}
                        </span>
                      </div>
                    </li>
                    <li className="flex items-center space-x-4">
                      <div className="relative group">
                        <div className="w-8 h-8 -bg-indigo-600/5 rounded-full">
                          <div className="absolute flex inset-0 items-center justify-center">
                            <i className="uil uil-check text-3xl text-indigo-600"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col space-y-1">
                        <span className="text-xl">
                          {t('campaignLancaster.receiveEsim')}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <div>
              <h3 className="mb-6 font-bold lg:leading-normal text-center leading-normal text-2xl md:text-3xl text-black dark:text-white">
                {t('campaignLancaster.whatGet')}
              </h3>
              <div className="flex items-center justify-center space-x-8">
                <ul className="flex flex-col space-y-4">
                  <li className="flex items-center space-x-4">
                    <div className="relative group">
                      <div className="w-8 h-8 -bg-indigo-600/5 rounded-full">
                        <div className="absolute flex inset-0 items-center justify-center">
                          <i className="uil uil-check text-3xl text-indigo-600"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col space-y-1">
                      <span className="text-xl">
                        {t('campaignLancaster.whatGetSub')}
                      </span>
                    </div>
                  </li>
                  <li className="flex items-center space-x-4">
                    <div className="relative group">
                      <div className="w-8 h-8 -bg-indigo-600/5 rounded-full">
                        <div className="absolute flex inset-0 items-center justify-center">
                          <i className="uil uil-check text-3xl text-indigo-600"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col space-y-1">
                      <span className="text-xl">
                        {t('campaignLancaster.whatGetSub1')}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="mb-6 font-bold lg:leading-normal text-center leading-normal text-2xl md:text-3xl text-black dark:text-white">
                {t('campaignLancaster.howGet')}
              </h3>
              <div className="flex items-center justify-center space-x-8">
                <ul className="flex flex-col space-y-4">
                  <li className="flex flex-col md:flex-row md:items-end md:space-x-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative group">
                        <div className="w-8 h-8 -bg-indigo-600/5 rounded-full">
                          <div className="absolute flex inset-0 items-center justify-center">
                            <i className="uil uil-check text-3xl text-indigo-600"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col space-y-1">
                        <span className="text-xl">
                          {t('campaignLancaster.downloadApp')}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center space-x-1">
                      <div>
                        <Link
                          href="https://itunes.apple.com/us/app/xplori/id1380723361"
                          target="_blank"
                        >
                          <img
                            src={appStoreImage.src}
                            alt={t('campaignLancaster.downloadAppStore')}
                          />
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="https://play.google.com/store/apps/details?id=com.world.eksplori"
                          target="_blank"
                        >
                          <img
                            src={playStoreImage.src}
                            alt={t('campaignLancaster.downloadPlayStore')}
                          />
                        </Link>
                      </div>
                    </div>
                  </li>
                  <li className="flex items-center space-x-4">
                    <div className="relative group">
                      <div className="w-8 h-8 -bg-indigo-600/5 rounded-full">
                        <div className="absolute flex inset-0 items-center justify-center">
                          <i className="uil uil-check text-3xl text-indigo-600"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col space-y-1">
                      <span className="text-xl">
                        {t('campaignLancaster.enterPromo')}
                      </span>
                    </div>
                  </li>
                  <li className="flex items-center space-x-4">
                    <div className="relative group">
                      <div className="w-8 h-8 -bg-indigo-600/5 rounded-full">
                        <div className="absolute flex inset-0 items-center justify-center">
                          <i className="uil uil-check text-3xl text-indigo-600"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col space-y-1">
                      <span className="text-xl">
                        {t('campaignLancaster.receiveEsim')}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* <section className="relative md:py-36 py-16">
        <div className="container">
          <div>
            <div
              data-aos="animation-scale-y"
              data-aos-delay="300"
              className="grid grid-cols-1 pb-6 text-center"
            >
              <h3 className="mb-6 font-bold lg:leading-normal text-center leading-normal text-2xl md:text-3xl text-black dark:text-white">
                {t('campaignLancaster.whatGet')}
              </h3>
            </div>
            <div data-aos="animation-translate-right" data-aos-delay="300">
              <div className="flex items-center justify-center space-x-8">
                <ul className="flex flex-col space-y-4">
                  <li className="flex items-center space-x-4">
                    <div className="relative group">
                      <div className="w-8 h-8 -bg-indigo-600/5 rounded-full">
                        <div className="absolute flex inset-0 items-center justify-center">
                          <i className="uil uil-check text-3xl text-indigo-600"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col space-y-1">
                      <span className="text-xl">
                        {t('campaignLancaster.whatGetSub')}
                      </span>
                    </div>
                  </li>
                  <li className="flex items-center space-x-4">
                    <div className="relative group">
                      <div className="w-8 h-8 -bg-indigo-600/5 rounded-full">
                        <div className="absolute flex inset-0 items-center justify-center">
                          <i className="uil uil-check text-3xl text-indigo-600"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col space-y-1">
                      <span className="text-xl">
                        {t('campaignLancaster.whatGetSub1')}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <div
              data-aos="animation-scale-y"
              data-aos-delay="300"
              className="grid grid-cols-1 pb-6 text-center"
            >
              <h3 className="mb-6 font-bold lg:leading-normal text-center leading-normal text-2xl md:text-3xl text-black dark:text-white">
                {t('campaignLancaster.howGet')}
              </h3>
            </div>
            <div data-aos="animation-translate-right" data-aos-delay="300">
              <div className="flex items-center justify-center space-x-8">
                <ul className="flex flex-col space-y-4">
                  <li className="flex flex-col md:flex-row md:items-end md:space-x-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative group">
                        <div className="w-8 h-8 -bg-indigo-600/5 rounded-full">
                          <div className="absolute flex inset-0 items-center justify-center">
                            <i className="uil uil-check text-3xl text-indigo-600"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col space-y-1">
                        <span className="text-xl">
                          {t('campaignLancaster.downloadApp')}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center space-x-1">
                      <div>
                        <Link
                          href="https://itunes.apple.com/us/app/xplori/id1380723361"
                          target="_blank"
                        >
                          <img
                            src={appStoreImage.src}
                            alt={t('campaignLancaster.downloadAppStore')}
                          />
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="https://play.google.com/store/apps/details?id=com.world.eksplori"
                          target="_blank"
                        >
                          <img
                            src={playStoreImage.src}
                            alt={t('campaignLancaster.downloadPlayStore')}
                          />
                        </Link>
                      </div>
                    </div>
                  </li>
                  <li className="flex items-center space-x-4">
                    <div className="relative group">
                      <div className="w-8 h-8 -bg-indigo-600/5 rounded-full">
                        <div className="absolute flex inset-0 items-center justify-center">
                          <i className="uil uil-check text-3xl text-indigo-600"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col space-y-1">
                      <span className="text-xl">
                        {t('campaignLancaster.enterPromo')}
                      </span>
                    </div>
                  </li>
                  <li className="flex items-center space-x-4">
                    <div className="relative group">
                      <div className="w-8 h-8 -bg-indigo-600/5 rounded-full">
                        <div className="absolute flex inset-0 items-center justify-center">
                          <i className="uil uil-check text-3xl text-indigo-600"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col space-y-1">
                      <span className="text-xl">
                        {t('campaignLancaster.receiveEsim')}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="relative md:py-36 py-16">
        <div className="container">
          <div
            data-aos="animation-scale-y"
            data-aos-delay="300"
            className="grid grid-cols-1 pb-6 text-center"
          >
            <h3 className="mb-6 font-bold lg:leading-normal text-center leading-normal text-2xl md:text-3xl text-black dark:text-white">
              {t('campaignLancaster.howGet')}
            </h3>
          </div>
          <div data-aos="animation-translate-right" data-aos-delay="300">
            <div className="flex items-center justify-center space-x-8">
              <ul className="flex flex-col space-y-4">
                <li className="flex flex-col md:flex-row md:items-end md:space-x-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative group">
                      <div className="w-8 h-8 -bg-indigo-600/5 rounded-full">
                        <div className="absolute flex inset-0 items-center justify-center">
                          <i className="uil uil-check text-3xl text-indigo-600"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col space-y-1">
                      <span className="text-xl">
                        {t('campaignLancaster.downloadApp')}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-1">
                    <div>
                      <Link
                        href="https://itunes.apple.com/us/app/xplori/id1380723361"
                        target="_blank"
                      >
                        <img
                          src={appStoreImage.src}
                          alt={t('campaignLancaster.downloadAppStore')}
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="https://play.google.com/store/apps/details?id=com.world.eksplori"
                        target="_blank"
                      >
                        <img
                          src={playStoreImage.src}
                          alt={t('campaignLancaster.downloadPlayStore')}
                        />
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="relative group">
                    <div className="w-8 h-8 -bg-indigo-600/5 rounded-full">
                      <div className="absolute flex inset-0 items-center justify-center">
                        <i className="uil uil-check text-3xl text-indigo-600"></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col space-y-1">
                    <span className="text-xl">
                      {t('campaignLancaster.enterPromo')}
                    </span>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="relative group">
                    <div className="w-8 h-8 -bg-indigo-600/5 rounded-full">
                      <div className="absolute flex inset-0 items-center justify-center">
                        <i className="uil uil-check text-3xl text-indigo-600"></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col space-y-1">
                    <span className="text-xl">
                      {t('campaignLancaster.receiveEsim')}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section> */}

      <section className="relative md:py-36 py-16">
        <div id="get-free-esim" className="block relative -top-48 invisible" />
        <div className="container">
          <div
            data-aos="animation-scale-y"
            data-aos-delay="300"
            className="grid grid-cols-1 pb-8 text-center"
          >
            <h3 className="mb-6 font-bold lg:leading-normal text-center leading-normal text-2xl md:text-3xl text-black dark:text-white">
              {t('campaignLancaster.redeemEsim')}
            </h3>
          </div>
          <div data-aos="animation-translate-right" data-aos-delay="300">
            <RedeemEsimCarousel />
          </div>
        </div>
      </section>

      <section className="relative md:py-36 py-16">
        <div className="container">
          <div
            data-aos="animation-scale-y"
            data-aos-delay="300"
            className="grid grid-cols-1 pb-8 text-center"
          >
            <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
              {t('campaignLancaster.howUseEsim')}
            </h3>
          </div>
          <div data-aos="animation-translate-right" data-aos-delay="300">
            <div className="space-y-8">
              <ul className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-4">
                <li className="flex flex-row justify-between items-center space-x-2 max-sm:flex-col max-sm:space-y-2 max-sm:space-x-0 lg:flex-col lg:space-y-2 lg:space-x-0">
                  <div className="flex flex-1 flex-col items-center space-y-2">
                    <div className=" px-2 bg-indigo-600/10 rounded-full">
                      <p className="text-indigo-600">{t('common.step')} 1</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold">
                        {t('campaignLancaster.checkEsim')}
                      </p>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: t('campaignLancaster.checkEsimSub'),
                        }}
                      />
                    </div>
                  </div>
                  <img
                    src={checkImg.src}
                    alt={t('campaignLancaster.checkEsim')}
                  />
                </li>
                <li className="flex flex-row justify-between items-center space-x-2 max-sm:flex-col max-sm:space-y-2 max-sm:space-x-0 lg:flex-col lg:space-y-2 lg:space-x-0">
                  <div className="flex flex-1 flex-col items-center space-y-2">
                    <div className=" px-2 bg-indigo-600/10 rounded-full">
                      <p className="text-indigo-600">{t('common.step')} 2</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold">
                        {t('campaignLancaster.selectEsim')}
                      </p>
                      <p>{t('campaignLancaster.selectEsimSub')}</p>
                    </div>
                  </div>
                  <img
                    src={buyImg.src}
                    alt={t('campaignLancaster.selectEsim')}
                  />
                </li>
                <li className="flex flex-row justify-between items-center space-x-2 max-sm:flex-col max-sm:space-y-2 max-sm:space-x-0 lg:flex-col lg:space-y-2 lg:space-x-0">
                  <div className="flex flex-1 flex-col items-center space-y-2">
                    <div className=" px-2 bg-indigo-600/10 rounded-full">
                      <p className="text-indigo-600">{t('common.step')} 3</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold">
                        {t('campaignLancaster.installEsim')}
                      </p>
                      <p>{t('campaignLancaster.installEsimSub')}</p>
                    </div>
                  </div>
                  <img
                    src={installImg.src}
                    alt={t('campaignLancaster.installEsim')}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative md:py-36 py-16 items-center overflow-hidden bg-gradient-to-br to-orange-600/20 via-fuchsia-600/20 from-indigo-600/20">
        <div id="support-esim" className="block relative -top-48 invisible" />
        <div className="container">
          <div
            data-aos="animation-scale-y"
            data-aos-delay="300"
            className="grid grid-cols-1 pb-8 text-center"
          >
            <h3 className="mb-6 font-bold lg:leading-normal text-center leading-normal text-2xl md:text-3xl text-black dark:text-white">
              {t('campaignVna.device')}
            </h3>
            <p className="max-w-xl mx-auto">{t('campaignVna.deviceSub')}</p>
          </div>
          <div data-aos="animation-translate-right" data-aos-delay="300">
            <div className="space-y-4">
              <ul className="list-none space-x-4 lg:space-x-16">
                {compatibles.map((item) => (
                  <li
                    key={item.brand}
                    className={`inline-block pb-1 text-xl lg:text-2xl font-semibold cursor-pointer relative border-b border-transparent transition duration-500 hover:text-indigo-600 hover:border-b-indigo-600 ${
                      item.brand === brandId
                        ? 'text-indigo-600 border-b-indigo-600'
                        : ''
                    }`}
                    onClick={() => setBrandId(item.brand)}
                  >
                    {item.brand}
                  </li>
                ))}
              </ul>
              <div className="grid space-y-2 sm:grid-cols-2 sm:space-y-0">
                {listDevices.map((devices, i) => (
                  <div key={`devices-${i}`} className="space-y-2">
                    {devices.map((device, j) => (
                      <div key={`device-${j}`} className="flex space-x-2">
                        <i className="mdi mdi-check-circle text-xl text-indigo-400" />
                        <p className="text-lg">{device}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative md:py-36 py-16">
        <div className="container">
          <div
            data-aos="animation-scale-y"
            data-aos-delay="300"
            className="grid grid-cols-1 pb-8 text-center"
          >
            <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
              {t('campaignLancaster.reuseService')}
            </h3>
          </div>
          <div data-aos="animation-translate-right" data-aos-delay="300">
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-8 items-center justify-center">
              <ul className="flex flex-col space-y-4">
                <li className="flex items-center space-x-4">
                  <div className="relative group">
                    <div className="w-8 h-8 -bg-indigo-600/5 rounded-full">
                      <div className="absolute flex inset-0 items-center justify-center">
                        <i className="uil uil-check text-3xl text-indigo-600"></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col space-y-1">
                    <span className="text-xl">
                      {t('campaignLancaster.coverage')}
                    </span>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="relative group">
                    <div className="w-8 h-8 -bg-indigo-600/5 rounded-full">
                      <div className="absolute flex inset-0 items-center justify-center">
                        <i className="uil uil-check text-3xl text-indigo-600"></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col space-y-1">
                    <span className="text-xl">
                      {t('campaignLancaster.lowestCost')}
                    </span>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="relative group">
                    <div className="w-8 h-8 -bg-indigo-600/5 rounded-full">
                      <div className="absolute flex inset-0 items-center justify-center">
                        <i className="uil uil-check text-3xl text-indigo-600"></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col space-y-1">
                    <span className="text-xl">
                      {t('campaignLancaster.easyUse')}
                    </span>
                  </div>
                </li>
              </ul>
              <div className="relative">
                <Link href="#get-free-esim" className="hover:cursor-pointer">
                  <img
                    src={getEsimImage.src}
                    alt={t('campaignLancaster.getEsim')}
                    className="w-full"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative md:py-36 py-16">
        <div className="container">
          <div
            data-aos="animation-scale-y"
            data-aos-delay="300"
            className="grid grid-cols-1 pb-8 text-center"
          >
            <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
              {t('campaignVna.faq')}
            </h3>
          </div>
          <div data-aos="animation-translate-right" data-aos-delay="300">
            <FAQList />
          </div>
        </div>
      </section>
    </>
  );
};

Index.layout = LayoutWrapper;
export default Index;
