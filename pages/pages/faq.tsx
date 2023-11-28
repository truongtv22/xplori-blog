import dynamic from 'next/dynamic';
import Head from 'next/head';
import FAQList from '@/components/faq/faq-list';
import { useTranslation } from 'next-i18next';
import serverSideTranslations from '@/utils/serverSideTranslations';

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

export const FAQ = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Xplori - Support</title>
      </Head>
      <div className="bg-gray-100">
        <div className="container bg-white lg:pb-56 lg:pt-32 pb-32 pt-24 rounded-lg shadow-xl">
          <div className="p-10">
            <div className="font-semibold text-2xl">{t('faq.title')}</div>
            <div className="mt-10 border-t-[0.5px] border-t-gray-300" />
            <FAQList />
          </div>
        </div>
      </div>
    </>
  );
};

FAQ.layout = LayoutWrapper;
export default FAQ;
