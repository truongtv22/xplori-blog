import Slider from 'react-slick';
import { useTranslation } from 'next-i18next';

export default function SetupEsimCarousel() {
  const { t } = useTranslation();

  const settings = {
    dots: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
  };

  return (
    <Slider {...settings}>
      <div className="flex flex-col items-center justify-center">
        <p
          dangerouslySetInnerHTML={{
            __html: t('campaignVna.setupIphone'),
          }}
        />
        <img
          src="https://services.xplori.world/media/add_esim_ios.jpg"
          alt="Setup on iOS"
          className="img w-1/2"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p
          dangerouslySetInnerHTML={{
            __html: t('campaignVna.setupGoogle'),
          }}
        />
        <img
          src="https://services.xplori.world/media/add_esim_google.jpg"
          alt="Setup on Google Pixel"
          className="img w-1/2"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p
          dangerouslySetInnerHTML={{
            __html: t('campaignVna.setupSamsung'),
          }}
        />
        <img
          src="https://services.xplori.world/media/add_esim_ss.jpg"
          alt="Setup on Samsung"
          className="img w-1/2"
        />
      </div>
    </Slider>
  );
}
