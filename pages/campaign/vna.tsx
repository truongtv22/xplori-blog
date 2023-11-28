import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import FAQList from '@/components/faq/faq-list';
import SetupEsimCarousel from '@/components/carousel/SetupEsimCarousel';

import { useTranslation } from 'next-i18next';
import serverSideTranslations from '@/utils/serverSideTranslations';

import bannerImage from '../../public/images/banner-campaign-vna.png';
import travelImage from '../../public/images/travel-explore.png';

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
        <title>Xplori - Campaign VNA</title>
      </Head>
      <section
        className="relative h-[40vw] --bg-[url('/images/banner-campaign-vna.png')] bg-center bg-contain bg-no-repeat flex items-center"
        style={{ backgroundImage: `url(${bannerImage.src})` }}
      >
        <div className="absolute inset-0 bg-slate-900/20"></div>
        <div className="container">
          <h4 className="font-bold lg:leading-normal leading-normal text-2xl md:text-4xl lg:text-5xl text-white">
            {t('campaignVna.title')}
          </h4>
          <div className="grid items-center grid-cols-2 gap-5 lg:grid-cols-4">
            <Link
              href={'/'}
              className="hover:cursor-pointer hover:transition hover:opacity-70 bg-indigo-600 text-white text-md font-semibold flex justify-center items-center h-[48px] rounded-full"
            >
              <div>{t('campaignVna.getNow')}</div>
            </Link>
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
              {t('campaignVna.benefits')}
            </h3>
          </div>
          <div data-aos="animation-translate-right" data-aos-delay="300">
            <div className="grid lg:grid-cols-2 lg:gap-x-16">
              <div className="hidden lg:block relative">
                {/* <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute object-none object-top w-full h-full"
                >
                  <source src="/images/benefit.mp4" type="video/mp4" />
                </video> */}
                <img
                  src={travelImage.src}
                  alt="How Xplori eSIM benefits you"
                  className="absolute object-fill w-auto h-full inset-0 mx-auto"
                />
              </div>
              <ul className="space-y-12">
                <li className="flex items-center space-x-8">
                  <div className="relative group">
                    <div className="w-14 h-14 bg-indigo-600/5 rounded-full">
                      <div className="absolute flex inset-0 items-center justify-center">
                        <i className="uil uil-wifi text-3xl text-indigo-600"></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col space-y-1">
                    <span className="text-xl font-semibold">
                      {t('campaignVna.convenient')}
                    </span>
                    <span className="flex-1 text-neutral-500 dark:text-neutral-400">
                      {t('campaignVna.convenientSub')}
                    </span>
                  </div>
                </li>
                <li className="flex items-center space-x-8">
                  <div className="relative group">
                    <div className="w-14 h-14 bg-indigo-600/5 rounded-full">
                      <div className="absolute flex inset-0 items-center justify-center">
                        <i className="uil uil-globe text-3xl text-indigo-600"></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col space-y-1">
                    <span className="text-xl font-semibold">
                      {t('campaignVna.delivery')}
                    </span>
                    <span className="flex-1 text-neutral-500 dark:text-neutral-400">
                      {t('campaignVna.deliverySub')}
                    </span>
                  </div>
                </li>
                <li className="flex items-center space-x-8">
                  <div className="relative group">
                    <div className="w-14 h-14 bg-indigo-600/5 rounded-full">
                      <div className="absolute flex inset-0 items-center justify-center">
                        <i className="uil uil-setting text-3xl text-indigo-600"></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col space-y-1">
                    <span className="text-xl font-semibold">
                      {t('campaignVna.easy')}
                    </span>
                    <span className="flex-1 text-neutral-500 dark:text-neutral-400">
                      {t('campaignVna.easySub')}
                    </span>
                  </div>
                </li>
                <li className="flex items-center space-x-8">
                  <div className="relative group">
                    <div className="w-14 h-14 bg-indigo-600/5 rounded-full">
                      <div className="absolute flex inset-0 items-center justify-center">
                        <i className="uil uil-share-alt text-3xl text-indigo-600"></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col space-y-1">
                    <span className="text-xl font-semibold">
                      {t('campaignVna.customer')}
                    </span>
                    <span className="flex-1 text-neutral-500 dark:text-neutral-400">
                      {t('campaignVna.customerSub')}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative md:py-36 py-16 items-center overflow-hidden bg-gradient-to-br to-orange-600/20 via-fuchsia-600/20 from-indigo-600/20">
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
              {t('campaignVna.setup')}
            </h3>
            <p className="max-w-xl mx-auto">{t('campaignVna.setupSub')}</p>
          </div>
          <div data-aos="animation-translate-right" data-aos-delay="300">
            <div className="space-y-8">
              <ul className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-4">
                <li className="flex flex-row justify-between items-center space-x-2 max-sm:flex-col max-sm:space-y-2 max-sm:space-x-0 lg:flex-col lg:space-y-2 lg:space-x-0">
                  <div className="flex flex-1 flex-col items-center space-y-2">
                    <div className="flex w-14 h-14 bg-indigo-600/10 rounded-full items-center justify-center">
                      <p className="text-xl text-indigo-600">1</p>
                    </div>
                    <p className="text-center">{t('campaignVna.receive')}</p>
                  </div>
                </li>
                <li className="flex flex-row justify-between items-center space-x-2 max-sm:flex-col max-sm:space-y-2 max-sm:space-x-0 lg:flex-col lg:space-y-2 lg:space-x-0">
                  <div className="flex flex-1 flex-col items-center space-y-2">
                    <div className="flex w-14 h-14 bg-indigo-600/10 rounded-full items-center justify-center">
                      <p className="text-xl text-indigo-600">2</p>
                    </div>
                    <p className="text-center">{t('campaignVna.getQrcode')}</p>
                  </div>
                </li>
                <li className="flex flex-row justify-between items-center space-x-2 max-sm:flex-col max-sm:space-y-2 max-sm:space-x-0 lg:flex-col lg:space-y-2 lg:space-x-0">
                  <div className="flex flex-1 flex-col items-center space-y-2">
                    <div className="flex w-14 h-14 bg-indigo-600/10 rounded-full items-center justify-center">
                      <p className="text-xl text-indigo-600">3</p>
                    </div>
                    <p className="text-center">{t('campaignVna.scanQrcode')}</p>
                  </div>
                </li>
              </ul>
              <SetupEsimCarousel />
              <p className="italic text-center">{t('campaignVna.setupNote')}</p>
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
