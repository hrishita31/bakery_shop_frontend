import Testimonial from "./Homepage/Testimonial";
import Team from "./Homepage/Team";
import Breadcrumb from "./Breadcrumbs";

const AboutPage = () => {
  return (
    <>

      {/* Breadcrumb */}
      <Breadcrumb title="About Us"></Breadcrumb>

      {/* About section */}
      <section className="about spad">
        <div className="container">
          <div className="about__text">
            <div className="section-title">
              <span>About Cake shop</span>
              
            </div>
            <p>
              The Cake Shop is a Jordanian Brand that started as a small family
              business. The owners are Dr. Iyad Sultan and Dr. Sereen Sharabati,
              supported by a staff of 80 employees.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial section */}
      <Testimonial />

      {/* Team section */}
      <Team />
    </>
  );
}

export default AboutPage;
