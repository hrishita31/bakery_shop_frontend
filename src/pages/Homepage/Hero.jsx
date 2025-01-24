import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const Hero = () => {
  const carouselItems = [
    {
      image: "img/hero/hero-1.jpg",
      heading: "Making your life sweeter one bite at a time!",
      linkText: "Our cakes",
    },
    {
      image: "img/hero/hero-1.jpg",
      heading: "Making your life sweeter one bite at a time!",
      linkText: "Our cakes",
    },
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1, // Shows one item at a time
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <div className="hero">
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          infinite
          keyBoardControl
          pauseOnHover
          responsive={responsive}
          swipeable
          showDots={true}
          slidesToSlide={1}
        >
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className="hero__item set-bg"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="container">
                <div className="row d-flex justify-content-center">
                  <div className="col-lg-8">
                    <div className="hero__text">
                      <h2>{item.heading}</h2>
                      <a href="#" className="primary-btn">
                        {item.linkText}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Hero;
