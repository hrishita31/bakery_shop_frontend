import Products from "./Homepage/Products";
import Instagram from "./Homepage/Instagram";
import Map from "./Homepage/Map";
import Search from "./Homepage/Search";
import Hero from "./Homepage/Hero";

export const HomePage = () => {
  return (
    <>
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
    </>
  );
};

export default HomePage;
