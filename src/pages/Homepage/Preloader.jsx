// import React from 'react';

// function Preloader(){
// const [isLoading, setIsLoading] = React.useState(true);

// const Loader = ({size, background}) => {
//     const loaderStyle = {
//         width : size,
//         height : size,
//         background : background
//     }
// }

// const fetchData = async() => {
//     setIsLoading(true);

//     try{
//         const response = await fetch('/*api endpoint*/');
//         const data = await response.json();
//     }
//     catch(error){
//         throw error;
//     } finally{
//         setIsLoading(false);
//     }
// }
//     return(
//         /*<!-- Page Preloder -->*/
//         <div>
//             {isLoading ? <Loader /> : "Content goes here"}
//         </div>
//     );
// }

// export default Preloader;

import { useEffect, useState } from "react";
// import "../design/Preloader.css";

function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <div id="preloder">
      <div className="loader"></div>
    </div>
  );
}

export default Preloader;
