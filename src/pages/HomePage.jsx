import { HeaderSection } from "./Homepage/HeaderSection";
import { Menu } from "./Homepage/Menu";
import About from "./Homepage/About";
import Categories from "./Homepage/Categories";
import Products from "./Homepage/Products";
import Class from "./Homepage/Class";
import Team from "./Homepage/Team";
import Testimonial from "./Homepage/Testimonial";
import Instagram from "./Homepage/Instagram";
import Map from "./Homepage/Map";
import Search from "./Homepage/Search";
import Hero from "./Homepage/Hero";
import Footer from "../../public/js/components/Footer";

export const HomePage = () => {
  return (
    <>
      {/*menu section */}
      <Menu />

      {/* header section*/}
      <HeaderSection />

      {/*Hero section*/}
      <Hero />

      {/*About section*/}
      <About />

      {/*categories section*/}
      <Categories />

      {/*product section*/}
      <Products />

      {/*Class section*/}
      <Class />

      {/*Team section*/}
      <Team />

      {/*Testimonial section*/}
      <Testimonial />

      {/*Instagram section*/}
      <Instagram />

      {/*map section*/}
      <Map />

      {/*search section*/}
      <Search />

      {/* Footer section */}
      <Footer />
    </>
  );
};

export default HomePage;
