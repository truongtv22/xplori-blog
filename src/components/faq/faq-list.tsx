import { useTranslation } from 'next-i18next';
import DisclosureQuestion from './disclosure-question';

const renderLink = (text, link) => {
  return (
    <a className="text-indigo-600" href={link}>
      {text}
    </a>
  );
};

export default function FAQList() {
  const { t } = useTranslation();

  const listQuestion = [
    {
      question: t('faq.setup'),
      answer: (
        <p>
          {t('faq.setupFAQ')}{' '}
          {renderLink(
            t('faq.setupFAQDataRoaming'),
            'https://services.xplori.world/media/DataRoamingOn.jpg',
          )}
          {t('faq.setupFAQ1')}
        </p>
      ),
    },
    {
      question: t('faq.sim'),
      answer: t('faq.simFAQ'),
    },
    {
      question: t('faq.eSim'),
      answer: t('faq.eSimFAQ'),
    },
    {
      question: t('faq.calls'),
      answer: t('faq.callsFAQ'),
    },
    {
      question: t('faq.troubleshoot'),
      answer: (
        <p>
          {t('faq.troubleshootFAQ')}{' '}
          {renderLink(
            t('faq.troubleshootFAQAutomactic'),
            'https://services.xplori.world/media/Network_Search.jpg',
          )}
          {t('faq.troubleshootFAQ0')}{' '}
          {renderLink(
            t('faq.troubleshootFAQ0_fastaccess'),
            'https://services.xplori.world/media/APN_iOS.png',
          )}
          {t('faq.troubleshootFAQ01')}{' '}
          {renderLink(
            t('faq.troubleshootFAQ0_fastaccess_android'),
            'https://services.xplori.world/media/APN_fastaccess.png',
          )}
          {t('faq.troubleshootFAQ0_fastaccess_android1')}{' '}
          {renderLink(t('faq.troubleshootLink'), t('faq.troubleshootLink'))}
          {t('faq.troubleshootLink1')}{' '}
          {renderLink(
            t('faq.troubleshootLink1_Toolkit'),
            'https://services.xplori.world/media/Finder.jpg',
          )}
          {t('faq.troubleshootLink1_Toolkit_after')} {t('faq.troubleshootFAQ1')}
        </p>
      ),
    },
    {
      question: t('faq.pockerWifi'),
      answer: t('faq.pockerWifiFAQ'),
    },
    {
      question: t('faq.creditAndPackages'),
      answer: (
        <p>
          {t('faq.creditAndPackagesFAQ')}{' '}
          {renderLink(t('faq.creditAndPackagesFAQHere'), '')}
          {t('faq.creditAndPackagesFAQ1')}
        </p>
      ),
    },
    {
      question: t('faq.delivery'),
      answer: (
        <p>
          {t('faq.deliveryFQA')} {renderLink(t('faq.deliveryFQADelete'), '')}
        </p>
      ),
    },
    {
      question: t('faq.payments'),
      answer: t('faq.paymentFAQ'),
    },
  ];

  return (
    <>
      {listQuestion.map((item, index) => (
        <DisclosureQuestion
          key={index}
          buttonText={item.question}
          contentText={item.answer}
        />
      ))}
    </>
  );
}
