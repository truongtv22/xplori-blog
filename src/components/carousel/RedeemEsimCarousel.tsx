import Slider from 'react-slick';
import { useTranslation } from 'next-i18next';

import image1 from '../../../public/images/redeem-esim-1.png';
import image2 from '../../../public/images/redeem-esim-2.png';
import image3 from '../../../public/images/redeem-esim-3.png';
import image4 from '../../../public/images/redeem-esim-4.png';

export default function SetupEsimCarousel() {
  const { t } = useTranslation();

  const settings = {
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="flex flex-col space-y-2 items-center justify-center">
        <img src={image1.src} alt="Redeem esim step 1" className="img w-1/2" />
        <div className="flex flex-col items-center space-y-2">
          <div className=" px-2 bg-indigo-600/10 rounded-full">
            <p className="text-indigo-600">{t('common.step')} 1</p>
          </div>
          <p className="text-center">{t('campaignLancaster.openApp')}</p>
        </div>
      </div>
      <div className="flex flex-col space-y-2 items-center justify-center">
        <img src={image2.src} alt="Redeem esim step 1" className="img w-1/2" />
        <div className="flex flex-col items-center space-y-2">
          <div className=" px-2 bg-indigo-600/10 rounded-full">
            <p className="text-indigo-600">{t('common.step')} 2</p>
          </div>
          <p className="text-center">{t('campaignLancaster.tapBuy')}</p>
        </div>
      </div>
      <div className="flex flex-col space-y-2 items-center justify-center">
        <img src={image3.src} alt="Redeem esim step 1" className="img w-1/2" />
        <div className="flex flex-col items-center space-y-2">
          <div className=" px-2 bg-indigo-600/10 rounded-full">
            <p className="text-indigo-600">{t('common.step')} 3</p>
          </div>
          <p className="text-center">{t('campaignLancaster.choosePackage')}</p>
        </div>
      </div>
      <div className="flex flex-col space-y-2 items-center justify-center">
        <img src={image4.src} alt="Redeem esim step 1" className="img w-1/2" />
        <div className="flex flex-col items-center space-y-2">
          <div className=" px-2 bg-indigo-600/10 rounded-full">
            <p className="text-indigo-600">{t('common.step')} 4</p>
          </div>
          <p className="text-center">{t('campaignLancaster.insertCode')}</p>
        </div>
      </div>
    </Slider>
  );
}
