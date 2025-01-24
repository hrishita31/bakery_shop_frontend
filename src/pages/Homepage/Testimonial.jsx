/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const TestimonialCard = ({ authorName, location, rating, text, image }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-author">
        <div className="testimonial-author-pic">
          <img src={image} alt={authorName} />
        </div>
        <div className="testimonial-author-text">
          <h5>{authorName.toUpperCase()}</h5>
          <span>{location}</span>
        </div>
        <div className="testimonial-rating">
          {Array.from({ length: 5 }, (_, index) => (
            <span
              key={index}
              className={
                index < Math.floor(rating)
                  ? "icon_star"
                  : index < rating
                  ? "icon_star-half_alt"
                  : "icon_star-empty"
              }
            ></span>
          ))}
        </div>
      </div>
      <p className="testimonial-text">{text}</p>
    </div>
  );
};

export const Testimonial = () => {
  const [showCarousel] = useState(true);
  const CarouselRef = useRef();

  useEffect(() => {
    if (CarouselRef.current) {
      console.log(CarouselRef);
    }
  }, []);

  const testimonials = [
    {
      authorName: "Kerry D.Silva",
      location: "New York",
      rating: 4.5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua viverra lacus vel facilisis.",
      image: "img/testimonial/ta-1.jpg",
    },
    {
      authorName: "Ophelia Nunez",
      location: "London",
      rating: 4.0,
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "img/testimonial/ta-2.jpg",
    },
  ];

  return (
    <section className="testimonial spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="section-title">
              <span>Testimonial</span>
              <h2>Our Clients Say</h2>
            </div>
          </div>
        </div>
        <div className="row" style={{ width: "100%" }}>
          {showCarousel && (
            <Carousel
              ref={CarouselRef}
              additionalTransfrom={0}
              arrows
              autoPlay
              autoPlaySpeed={9000}
              centerMode={false}
              className=""
              containerClass="w-full"
              draggable
              infinite
              itemClass="testimonial__item"
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover
              responsive={{
                desktop: {
                  breakpoint: { max: 3000, min: 1024 },
                  items: 2,
                  partialVisibilityGutter: 30,
                },
                tablet: {
                  breakpoint: { max: 1024, min: 464 },
                  items: 2,
                  partialVisibilityGutter: 20,
                },
                mobile: {
                  breakpoint: { max: 464, min: 0 },
                  items: 1,
                  partialVisibilityGutter: 10,
                },
              }}
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              shouldResetAutoplay
              showDots={false}
              slidesToSlide={1}
              swipeable
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  authorName={testimonial.authorName}
                  location={testimonial.location}
                  rating={testimonial.rating}
                  text={testimonial.text}
                  image={testimonial.image}
                />
              ))}
            </Carousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
