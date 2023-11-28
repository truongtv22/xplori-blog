import dynamic from 'next/dynamic';
import Head from 'next/head';
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
const Index = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Xplori - All is well with your eSim/Sim?</title>
      </Head>
      <div className="mx-auto mt-[70px]">
        <div className="absolute inset-x-0 min-h-0 pl-20 py-36 flex overflow-hidden z-[-1]">
          <span className="block bg-[#ef233c] w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96"></span>
          <span className="block bg-[#04868b] w-72 h-72 -ml-20 mt-40 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96 nc-animation-delay-2000"></span>
        </div>
        <div className="py-10 container space-y-6">
          <div className="text-4xl font-bold">{t('all-is-well.title')}</div>
          <div className="space-y-6">
            <div className="text-gray-400 whitespace-pre-line">
              {t('all-is-well.greeting')}
              </div>
            <div className="space-y-1">
              <div className="text-xl font-semibold">
                {t('all-is-well.consideration')}
              </div>
              <ul className="list-disc list-inside space-y-1">
                <li className="text-gray-400" dangerouslySetInnerHTML={{ __html: t('all-is-well.validity') }} />
                <li className="text-gray-400" dangerouslySetInnerHTML={{ __html: t('all-is-well.highUsage') }} />
                <li className="text-gray-400" dangerouslySetInnerHTML={{ __html: t('all-is-well.phoneNumber') }} />
                <li className="text-gray-400" dangerouslySetInnerHTML={{ __html: t('all-is-well.reviews') }} />
              </ul>
            </div>
            <div className="space-y-1">
              <div className="text-xl font-semibold">{t('all-is-well.issues')}</div>
              <ul className="list-disc list-inside space-y-1">
                <li className="text-gray-400">
                  <span dangerouslySetInnerHTML={{ __html: t('all-is-well.cannotActivate') }} />
                  <ol className="pl-5 list-decimal list-inside space-y-1">
                    <li className="text-gray-400">
                      <span className="italic" dangerouslySetInnerHTML={{ __html: t('all-is-well.checkCompatible') }} />
                    </li>
                    <li className="text-gray-400">
                      <span className="italic" dangerouslySetInnerHTML={{ __html: t('all-is-well.checkLocked') }} />
                    </li>
                    <li className="text-gray-400">
                      <span className="italic" dangerouslySetInnerHTML={{ __html: t('all-is-well.haveInternet') }} />
                    </li>
                  </ol>
                </li>
                <li className="text-gray-400">
                  <span dangerouslySetInnerHTML={{ __html: t('all-is-well.cannotAccess') }} />
                  <ol className="pl-5 list-decimal list-inside space-y-1">
                    <li className="text-gray-400">
                      <span className="italic" dangerouslySetInnerHTML={{ __html: t('all-is-well.dataRoaming') }} />
                    </li>
                    <li className="text-gray-400">
                      <span className="italic" dangerouslySetInnerHTML={{ __html: t('all-is-well.restartPhone') }} />
                    </li>
                    <li className="text-gray-400">
                      <span className="italic" dangerouslySetInnerHTML={{ __html: t('all-is-well.switchOffOn') }} />
                    </li>
                    <li className="text-gray-400">
                      <span className="italic" dangerouslySetInnerHTML={{ __html: t('all-is-well.slowData') }} />
                    </li>
                  </ol>
                </li>
                <li className="text-gray-400">
                  <span dangerouslySetInnerHTML={{ __html: t('all-is-well.lowSpeed') }} />
                  <ol className="pl-5 list-decimal list-inside space-y-1">
                    <li className="text-gray-400">
                      <span className="italic" dangerouslySetInnerHTML={{ __html: t('all-is-well.changeApn') }} />
                    </li>
                  </ol>
                </li>
              </ul>
            </div>
            <div className="text-gray-400 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: t('all-is-well.conclusion') }} />
          </div>
        </div>
      </div>
    </>
  );
};

Index.layout = LayoutWrapper;
export default Index;
