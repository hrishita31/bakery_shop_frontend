import Header from "../../public/js/components/Header";
import Footer from "../../public/js/components/Footer";
import Breadcrumb from "./Breadcrumbs";

export const ContactPage = () => {
  return (
    <>
      {/* header section */}
      <Header />

      {/* breadcrumb section */}
      <Breadcrumb title="Contact"></Breadcrumb>

      {/* contact section */}
      <section className="contact spad">
        <div className="container">
          <div className="map">
            <div className="container">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-4 col-md-7">
                  <div className="map__inner">
                    <h6>Ahmedabad</h6>
                    <ul>
                      <li>Sahaj Apartments, Ahmedabad-380015, Gujarat, India</li>
                      <li>Sweetcake@support.com</li>
                      <li>+91 9876543211</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="map__iframe">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.7215501502537!2d72.51082477350796!3d23.033993915905317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b49eee80dd7%3A0xbefbfd7e023fb440!2s2GM7%2BGC3%2C%20Bodakdev%2C%20Ahmedabad%2C%20Gujarat%20380053!5e0!3m2!1sen!2sin!4v1738910332093!5m2!1sen!2sin"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </div>
          <div className="contact__address">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="contact__address__item">
                  <h6>Mumbai</h6>
                  <ul>
                    <li>
                      <span className="icon_pin_alt"></span>
                      <p>Mumbai</p>
                    </li>
                    <li>
                      <span className="icon_headphones"></span>
                      <p>+91 9898989898</p>
                    </li>
                    <li>
                      <span className="icon_mail_alt"></span>
                      <p>Sweetcake@support.com</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="contact__address__item">
                  <h6>Bangalore</h6>
                  <ul>
                    <li>
                      <span className="icon_pin_alt"></span>
                      <p>Bangalore</p>
                    </li>
                    <li>
                      <span className="icon_headphones"></span>
                      <p>+91 9797979797</p>
                    </li>
                    <li>
                      <span className="icon_mail_alt"></span>
                      <p>Sweetcake@support.com</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="contact__address__item">
                  <h6>Hyderabad</h6>
                  <ul>
                    <li>
                      <span className="icon_pin_alt"></span>
                      <p>Hyderabad</p>
                    </li>
                    <li>
                      <span className="icon_headphones"></span>
                      <p>+91 9090909090</p>
                    </li>
                    <li>
                      <span className="icon_mail_alt"></span>
                      <p>Sweetcake@support.com</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="contact__text">
                <h3>Contact With us</h3>
                <ul>
                  <li>Representatives or Advisors are available:</li>
                  <li>Mon-Fri: 5:00am to 9:00pm</li>
                  <li>Sat-Sun: 6:00am to 9:00pm</li>
                </ul>
                <img src="img/cake-piece.png" alt="" />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="contact__form">
                <form action="#">
                  <div className="row">
                    <div className="col-lg-6">
                      <input type="text" placeholder="Name" />
                    </div>
                    <div className="col-lg-6">
                      <input type="text" placeholder="Email" />
                    </div>
                    <div className="col-lg-12">
                      <textarea placeholder="Message"></textarea>
                      <button type="submit" className="site-btn">
                        Send Us
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer section */}
      <Footer />
    </>
  );
};

export default ContactPage;
