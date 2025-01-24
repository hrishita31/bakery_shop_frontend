import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer
      className="footer set-bg"
      style={{ backgroundImage: "url('img/footer-bg.jpg')" }}
    >
      <div className="container">
        <div className="row">
          
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="footer__widget">
              <h6>WORKING HOURS</h6>
              <ul>
                <li>Monday - Friday: 08:00 am - 08:30 pm</li>
                <li>Saturday: 10:00 am - 16:30 pm</li>
                <li>Sunday: 10:00 am - 16:30 pm</li>
              </ul>
            </div>
          </div>

          
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="footer__about">
              <div className="footer__logo">
                <Link to="/">
                  <img src="img/footer-logo.png" alt="Footer Logo" />
                </Link>
              </div>
              <p>
                Lorem ipsum dolor amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore dolore magna aliqua.
              </p>
              <div className="footer__social">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-instagram"></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-youtube-play"></i>
                </a>
              </div>
            </div>
          </div>

          
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="footer__newslatter">
              <h6>Subscribe</h6>
              <p>Get the latest updates and offers.</p>
              <form action="#">
                <input type="text" placeholder="Email" />
                <button type="submit">
                  <i className="fa fa-send-o"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      
      <div className="copyright">
        <div className="container">
          <div className="row">
            
            <div className="col-lg-7">
              <p className="copyright__text text-white">
                Copyright &copy; {new Date().getFullYear()} All rights reserved
                | This template is made with{" "}
                <i className="fa fa-heart" aria-hidden="true"></i> by{" "}
                <a
                  href="https://colorlib.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Colorlib
                </a>
              </p>
            </div>
            
            <div className="col-lg-5">
              <div className="copyright__widget">
                <ul>
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/terms-and-conditions">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to="/site-map">Site Map</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
