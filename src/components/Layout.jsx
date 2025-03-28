// import Header from "./Header";
// import Preloader from "../../../src/pages/Homepage/Preloader";
// import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <>
    <Header/>

      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
