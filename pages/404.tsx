import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import serverSideTranslations from "@/utils/serverSideTranslations";

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

export default function NotFoundPage() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Xplori - 404</title>
      </Head>
      <section className="relative bg-indigo-600/5">
        <div className="container-fluid relative">
          <div className="grid grid-cols-1">
            <div className="flex flex-col min-h-screen justify-center md:px-10 py-10 px-4">
              <div className="title-heading text-center my-auto">
                <h1 className="mt-3 mb-6 md:text-5xl text-3xl font-bold">
                  {t('404.title')}
                </h1>
                <div className="text-slate-400">
                  {t('404.content')}
                </div>

                <div className="mt-4">
                  <Link
                    href="/"
                    className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md"
                  >
                    {t('404.backHome')}
                  </Link>
                </div>
              </div>
              <div className="text-center">
                <div className="mb-0 text-slate-400">
                  © <i className="mdi mdi-heart text-red-600"></i> by
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-3 right-3">
        <button
          onClick={() => router.back()}
          className="back-button btn btn-icon bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-full"
        >
          <i data-feather="arrow-left" className="h-4 w-4" />
        </button>
      </div>

      <div className="fixed top-1/4 -right-2 z-50">
        <div className="relative inline-block rotate-90">
          <input
            type="checkbox"
            className="checkbox opacity-0 absolute"
            id="chk"
          />
          <label className="label bg-slate-900 dark:bg-white shadow dark:shadow-gray-800 cursor-pointer rounded-full flex justify-between items-center p-1 w-14 h-8">
            <i className="uil uil-moon text-[20px] text-yellow-500" />
            <i className="uil uil-sun text-[20px] text-yellow-500" />
            <div className="ball bg-white dark:bg-slate-900 rounded-full absolute top-[2px] left-[2px] w-7 h-7" />
          </label>
        </div>
      </div>
    </>
  );
}
