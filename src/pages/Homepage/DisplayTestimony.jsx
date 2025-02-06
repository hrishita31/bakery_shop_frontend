import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { RatingContainer, Radio, Rating } from "./RatingStyles";
import Carousel from "react-multi-carousel";

export const ShowTestimony = () => {
  const [testimony, setTestimony] = useState([]);
  const url = import.meta.env.VITE_API_URL;
  const image_url = import.meta.env.VITE_IMAGE_URL;
  const CarouselRef = useRef();

  useEffect(() => {
    axios
      .get(`${url}/testimony/displayTestimony`)
      .then((res) => {
        setTestimony(res.data.result);
      })
      .catch(() => toast.error("Failed to fetch testimony"));
  }, []);

  useEffect(() => {
    console.log(testimony);
  }, [testimony]);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 2 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };


  console.log(testimony, "testimony");

  return (
    <>
      <div className="row" style={{ width: "100%" }}>
        {testimony.length > 0 && (
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
            responsive={responsive}
            rewind={false}
            shouldResetAutoplay
            showDots={false}
            slidesToSlide={2}
            swipeable
          >
            {testimony.map((testimonyItem) => (
              <div key={testimonyItem._id} className="testimonial__item">
              
                  <div className="testimonial__author">
                    <div className="testimonial__author__pic">
                      <img
                        src={`${image_url}/images/testimony/${testimonyItem.image.filename}`}
                        alt={testimonyItem.name}
                      />
                    </div>
                    <div className="testimonial__author__text">
                      <h5>{testimonyItem.name}</h5>
                      <span>{testimonyItem.location}</span>
                    </div>
                  </div>
                  <div>
                  <div className="rating">
                    <RatingContainer>
                      {[...Array(5)].map((_, index) => {
                        return (
                          <div key={index}>
                            <label>
                              <Radio />
                              <Rating>
                                <FaStar
                                  color={
                                    index < testimonyItem.rating ||
                                    index === testimonyItem.rating
                                      ? "rgb(226, 232, 65)"
                                      : "rgb(192,192,192)"
                                  }
                                />
                              </Rating>
                            </label>
                          </div>
                        );
                      })}
                    </RatingContainer>
                  </div>
                  </div>
                  <p>{testimonyItem.quote}</p>
                </div>
              
            ))}
          </Carousel>
        )}
      </div>
    </>
  );
};

export default ShowTestimony;