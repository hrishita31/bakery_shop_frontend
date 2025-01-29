import { useNavigate } from "react-router-dom";

export const Team = () => {

  const navigate = useNavigate();
  return (
    <>
      <section className="team spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-7 col-sm-7">
              <div className="section-title">
                <span>Our team</span>
                <h2>Sweet Baker </h2>
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-5">
              <div className="team__btn">
              <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/registerToTeam");
                      }}
                    >
                      Join Us
                    </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="team__item set-bg">
                <img src="img/team/team-1.jpg"></img>

                <div className="team__item__text">
                  <h6>Randy Butler</h6>
                  <span>Decorater</span>
                  <div className="team__item__social">
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-youtube-play"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="team__item set-bg">
                <img src="img/team/team-2.jpg"></img>
                <div className="team__item__text">
                  <h6>Randy Butler</h6>
                  <span>Decorater</span>
                  <div className="team__item__social">
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-youtube-play"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="team__item set-bg">
                <img src="img/team/team-3.jpg"></img>
                <div className="team__item__text">
                  <h6>Randy Butler</h6>
                  <span>Decorater</span>
                  <div className="team__item__social">
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-youtube-play"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="team__item set-bg">
                <img src="img/team/team-4.jpg"></img>
                <div className="team__item__text">
                  <h6>Randy Butler</h6>
                  <span>Decorater</span>
                  <div className="team__item__social">
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-youtube-play"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
