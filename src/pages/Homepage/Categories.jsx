import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const Categories = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };

  return (
    <>
      <div className="categories">
        <div className="container">
          <div className="row">
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              className=""
              containerClass="container"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite={false}
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={responsive}
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              shouldResetAutoplay
              showDots={false}
              sliderClass=""
              slidesToSlide={2}
              swipeable
            >
              <div className="categories__item">
                <div className="categories__item__icon">
                  <span className="flaticon-029-cupcake-3"></span>
                  <h5>Cupcake</h5>
                </div>
              </div>
              <div className="categories__item">
                <div className="categories__item__icon">
                  <span className="flaticon-034-chocolate-roll"></span>
                  <h5>Butter</h5>
                </div>
              </div>
              <div className="categories__item">
                <div className="categories__item__icon">
                  <span className="flaticon-005-pancake"></span>
                  <h5>Red Velvet</h5>
                </div>
              </div>
              <div className="categories__item">
                <div className="categories__item__icon">
                  <span className="flaticon-030-cupcake-2"></span>
                  <h5>Biscuit</h5>
                </div>
              </div>
              <div className="categories__item">
                <div className="categories__item__icon">
                  <span className="flaticon-006-macarons"></span>
                  <h5>Donut</h5>
                </div>
              </div>
              <div className="categories__item">
                <div className="categories__item__icon">
                  <span className="flaticon-006-macarons"></span>
                  <h5>Cupcake</h5>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
