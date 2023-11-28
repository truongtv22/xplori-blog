import Slider from "react-slick";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className + " lg:block hidden"}
      onClick={onClick}
      style={{
        display: "block",
        ...style,
      }}
    >
      <i className="mdi mdi-chevron-right"></i>
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className + " lg:block hidden"}
      onClick={onClick}
      style={{
        display: "block",
        ...style,
      }}
    >
      <i className="mdi mdi-chevron-left"></i>
    </div>
  );
};

export default function PartnersCarousel() {
  const settings = {
    dots: false,
    autoplay: true,
    duration: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          autoplay: true,
          duration: 2000,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      <div className="flex justify-center">
        <img
          alt="Partner"
          src="https://cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/kuoni.png?v=175685057286109116511665761563"
        />
      </div>
      <div className="flex justify-center">
        <img
          alt="Partner"
          src="https://cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/novotel.png?v=121623941865224192041665761563"
        />
      </div>
      <div className="flex justify-center">
        <img
          alt="Partner"
          src="https://cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/singapore-airlines.png?v=64213501874348034471665761563"
        />
      </div>
      <div className="flex justify-center">
        <img
          alt="Partner"
          src="https://cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/traveloka.png?v=62582439502393965451665761563"
        />
      </div>
      <div className="flex justify-center">
        <img
          alt="Partner"
          src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/wework.png?v=166398381283137519721665761563"
        />
      </div>
      <div className="flex justify-center">
        <img
          alt="Partner"
          src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/swissotel.png?v=137338989490648092091665761563"
        />
      </div>
      <div className="flex justify-center">
        <img
          alt="Partner"
          src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/alpa-s.png?v=169625626859869624411665761563"
        />
      </div>
      <div className="flex justify-center">
        <img
          alt="Partner"
          src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/the-hive.png?v=2903636286955208481665761563"
        />
      </div>
      <div className="flex justify-center">
        <img
          alt="Partner"
          src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/baoviet.png?v=17206729665290986081665761563"
        />
      </div>
      <div className="flex justify-center">
        <img
          alt="Partner"
          src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/lancaster.png?v=175216833507005040061665761563"
        />
      </div>
      <div className="flex justify-center">
        <img
          alt="Partner"
          src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/hsbc.png?v=165551528756556184391665761563"
        />
      </div>
      <div className="flex justify-center">
        <img
          alt="Partner"
          src="//cdn.shopify.com/s/files/1/0023/8403/5875/t/19/assets/grab.png?v=34977124318937949711665761563"
        />
      </div>
    </Slider>
  );
}
