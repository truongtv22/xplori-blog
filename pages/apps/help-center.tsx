import dynamic from "next/dynamic";
// import serverSideTranslations from "@/utils/serverSideTranslations";

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      // ...(await serverSideTranslations(locale)),
    },
  };
};

const LayoutWrapper = dynamic(
  () => import("../../src/components/layout/LayoutWrapper"),
  { ssr: false }
);
const Index = () => {
  return <></>;
};

Index.layout = LayoutWrapper;
export default Index;
