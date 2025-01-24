import Header from "../../public/js/components/Header";
import Testimonial from "./Homepage/Testimonial";
import Team from "./Homepage/Team";
import Footer from "../../public/js/components/Footer";
import Breadcrumb from "./Breadcrumbs";

function AboutPage() {
  return (
    <>
      {/* Header section */}
      <Header />

      {/* Breadcrumb */}
      <Breadcrumb title="About Us"></Breadcrumb>

      {/* About section */}
      <section className="about spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="about__video set-bg"
                style={{ backgroundImage: `url(img/about-video.jpg)` }}
              >
                <a
                  href="https://www.youtube.com/watch?v=8PJ3_p7VqHw&list=RD8PJ3_p7VqHw&start_radio=1"
                  className="play-btn video-popup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-play"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="about__text">
                <div className="section-title">
                  <span>About Cake shop</span>
                  <h2>Cakes and bakes from the house of Queens!</h2>
                </div>
                <p>
                  The Cake Shop is a Jordanian Brand that started as a small
                  family business. The owners are Dr. Iyad Sultan and Dr. Sereen
                  Sharabati, supported by a staff of 80 employees.
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="about__bar">
                <div className="about__bar__item">
                  <p>Cake design</p>
                  <div id="bar1" className="barfiller">
                    <div className="tipWrap">
                      <span className="tip"></span>
                    </div>
                    <span className="fill" data-percentage="95"></span>
                  </div>
                </div>
                <div className="about__bar__item">
                  <p>Cake className</p>
                  <div id="bar2" className="barfiller">
                    <div className="tipWrap">
                      <span className="tip"></span>
                    </div>
                    <span className="fill" data-percentage="80"></span>
                  </div>
                </div>
                <div className="about__bar__item">
                  <p>Cake Recipes</p>
                  <div id="bar3" className="barfiller">
                    <div className="tipWrap">
                      <span className="tip"></span>
                    </div>
                    <span className="fill" data-percentage="90"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial section */}
      <Testimonial />

      {/* Team section */}
      <Team />

      {/* Footer section */}
      <Footer />
    </>
  );
}

export default AboutPage;
