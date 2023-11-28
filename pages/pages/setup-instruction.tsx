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
        <title>Xplori - Setup Instruction</title>
      </Head>
      <div className="mx-auto mt-[70px]">
        <div className="absolute inset-x-0 min-h-0 pl-20 py-36 flex overflow-hidden z-[-1]">
          <span className="block bg-[#ef233c] w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96"></span>
          <span className="block bg-[#04868b] w-72 h-72 -ml-20 mt-40 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96 nc-animation-delay-2000"></span>
        </div>
        <div className="py-10 container space-y-6">
          <div className="text-4xl font-bold">{t('setup-instruction.title')}</div>
          <div className="space-y-6">
            <div className="text-gray-400 whitespace-pre-line">
              {t('setup-instruction.greeting')}
              </div>
            <div className="space-y-1">
              <div className="text-xl font-semibold">{t('setup-instruction.install')}</div>
              <ul className="list-disc list-inside space-y-1">
                <li className="text-gray-400">
                  <span dangerouslySetInnerHTML={{ __html: t('setup-instruction.installIphone') }} />
                  {' '}(<a href="https://services.xplori.world/media/add_esim_ios.jpg" className="text-blue-600">{t('setup-instruction.referenceAttached')}</a>)
                </li>
                <li className="text-gray-400">
                  <span dangerouslySetInnerHTML={{ __html: t('setup-instruction.installSamsung') }} />
                  {' '}(<a href="https://services.xplori.world/media/add_esim_ss.jpg" className="text-blue-600">{t('setup-instruction.referenceAttached')}</a>)
                </li>
                <li className="text-gray-400">
                  <span dangerouslySetInnerHTML={{ __html: t('setup-instruction.installGoogle') }} />
                  {' '}(<a href="https://services.xplori.world/media/add_esim_google.jpg" className="text-blue-600">{t('setup-instruction.referenceAttached')}</a>)
                </li>
              </ul>
            </div>
            <div className="space-y-1">
              <div className="text-xl font-semibold">
                {t('setup-instruction.active')}
              </div>
              <ul className="list-disc list-inside space-y-1">
                <li className="text-gray-400" dangerouslySetInnerHTML={{ __html: t('setup-instruction.activeStep1') }} />
                <li className="text-gray-400" dangerouslySetInnerHTML={{ __html: t('setup-instruction.activeStep2') }} />
              </ul>
            </div>
            <div className="space-y-1">
              <div className="text-xl font-semibold">
                {t('setup-instruction.further')}
              </div>
              <ul className="list-disc list-inside space-y-1">
                <li className="text-gray-400" dangerouslySetInnerHTML={{ __html: t('setup-instruction.furtherStep1') }} />
                <div className="text-gray-400" dangerouslySetInnerHTML={{ __html: t('setup-instruction.furtherNote') }} />
              </ul>
            </div>
            <div className="space-y-1">
              <div className="text-xl font-semibold">
                {t('setup-instruction.consideration')}
              </div>
              <ul className="list-disc list-inside space-y-1">
                <li className="text-gray-400" dangerouslySetInnerHTML={{ __html: t('setup-instruction.validity') }} />
                <li className="text-gray-400" dangerouslySetInnerHTML={{ __html: t('setup-instruction.highUsage') }} />
                <li className="text-gray-400" dangerouslySetInnerHTML={{ __html: t('setup-instruction.phoneNumber') }} />
                <li className="text-gray-400" dangerouslySetInnerHTML={{ __html: t('setup-instruction.reviews') }} />
              </ul>
            </div>
            <div className="text-gray-400">{t('setup-instruction.conclusion')}</div>
          </div>
        </div>
      </div>
    </>
  );
};

Index.layout = LayoutWrapper;
export default Index;
