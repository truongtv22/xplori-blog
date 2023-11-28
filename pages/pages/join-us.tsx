import dynamic from "next/dynamic";
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

  return (
    <>
      <Head>
        <title>Join Us - Xplori</title>
      </Head>
      <div className="mt-[70px]">
        <div className="container py-20">
            <img alt="" className="rounded-lg" src="https://cdn.shopify.com/s/files/1/0023/8403/5875/files/join-us-bg.png?v=1557846660z" />
            <div className="md:w-1/5 hidden lg:block lg:w-1/4 h-12 z-[-1] w-12 md:h-[11rem] lg:h-[10rem] md:absolute md:left-25 md:top-0 lg:-left-9 lg:-top-[4rem]"
              style={{backgroundImage: "radial-gradient(#ff7f7f 2px, transparent -3.5px)", backgroundSize: "1rem 1rem",}}></div>
          <div className="mt-5 font-semibold">
            {t('joinUs.content')}
          </div>
        </div>
      </div>
    </>
  );
};

Index.layout = LayoutWrapper;
export default Index;
