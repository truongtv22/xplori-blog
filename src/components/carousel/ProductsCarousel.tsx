import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import Slider from "react-slick";

export default function ProductsCarousel({ products }) {
  const { t } = useTranslation();
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    centerPadding: "50px",
    autoplay: true,
    dots: true,
    initialSlide: 2,
    adaptiveHeight: true,
  };
  const router = useRouter();
  const [hoverId, setHoverId] = useState("");
  return (
    <>
      <Slider {...settings}>
        {products.map((product, index) => (
          <div
            onMouseEnter={() => setHoverId(product.id)}
            onMouseLeave={() => setHoverId("")}
            key={index}
            className="relative h-[250px]"
          >
            <img
              alt=""
              className="absolute top-0 w-full h-full hover:cursor-pointer"
              src={product.image}
            />
            {hoverId === product.id && (
              <>
                <div className="w-full h-full absolute top-0 bg-black opacity-40"></div>
                <div className="absolute bottom-5 left-5 text-white">
                  <div className="text-xl font-semibold">{product.name}</div>
                  <div>{product.buy_count} {t('product.sales')}</div>
                </div>
              </>
            )}
          </div>
        ))}
      </Slider>
    </>
  );
}
