import { HeaderSection } from "./Homepage/HeaderSection";
import { Menu } from "./Homepage/Menu";
// import Categories from "./Homepage/Categories";
import Products from "./Homepage/Products";
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

      {/*product section*/}
      <Products />

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
