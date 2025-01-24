import Header from "./Header";
import Preloader from "../../../src/pages/Homepage/Preloader";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Preloader />
      <Header /> 

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;
