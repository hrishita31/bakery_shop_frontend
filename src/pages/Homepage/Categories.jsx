// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// // import getData from "../../requests/getRequest";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useState, useEffect } from "react";

// export const Categories = () => {

//   const url = import.meta.env.VITE_API_URL;

//   const [categories, setCategories] = useState([]);

//   // const getCategory = async (category) => {
//   //   try {
//   //     const { data } = await axios.get(`${url}/products/getProduct`, {
//   //       params: { category },
//   //     });
//   //     console.log(data, 345);

//   //   } catch (error) {
//   //     toast.error(`Error fetching the category: ${category}. ${error.message}`);
//   //   }
//   // };
  
//   useEffect(() => {
//     axios
//       .get(`${url}/products/getCategory`)
//       .then((res) => {
//         setCategories(res.data.result);
//       })
//       .catch(() => toast.error("Failed to fetch categories"));
//   }, []);

//   const responsive = {
//     desktop: {
//       breakpoint: { max: 2000, min: 1024 },
//       items: 3,
//       partialVisibilityGutter: 40,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 2,
//       partialVisibilityGutter: 30,
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1,
//       partialVisibilityGutter: 30,
//     },
//   };

//   return (
//     <>
//       <div className="categories">
//         <div className="container">
//           <div className="row">

//           <div className="section-title">
//                 <span>Our specialties</span>
//                 <h2>A must try for you and your loved ones! </h2>
//               </div>
//             <Carousel
//               additionalTransfrom={0}
//               arrows
//               autoPlaySpeed={3000}
//               centerMode={false}
//               className=""
//               containerClass="container"
//               dotListClass=""
//               draggable
//               focusOnSelect={false}
//               infinite={false}
//               itemClass=""
//               keyBoardControl
//               minimumTouchDrag={80}
//               pauseOnHover
//               renderArrowsWhenDisabled={false}
//               renderButtonGroupOutside={false}
//               renderDotsOutside={false}
//               responsive={responsive}
//               rewind={false}
//               rewindWithAnimation={false}
//               rtl={false}
//               shouldResetAutoplay
//               showDots={false}
//               sliderClass=""
//               slidesToSlide={2}
//               swipeable
//             >
            
              
//             </Carousel>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Categories;
