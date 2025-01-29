import Header from "../../public/js/components/Header";
import Footer from "../../public/js/components/Footer";
import Breadcrumb from "./Breadcrumbs";
import Class from "./Homepage/Class";

function ClassPage() {
  return (
    <>
      {/* header section */}
      <Header />

      {/* breadcrumb section */}
      <Breadcrumb title="Class"></Breadcrumb>

      {/* class section */}
      <Class />

      {/* Footer section */}
      <Footer />
    </>
  );
}

export default ClassPage;
