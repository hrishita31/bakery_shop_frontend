export const About = () => {
  return (
    <>
      <section className="about spad">
        <div className="container">
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
                    <span
                      className="fill"
                      data-percentage="95"
                      style={{ width: "95%" }}
                    ></span>
                  </div>
                </div>
                <div className="about__bar__item">
                  <p>Cake className</p>
                  <div id="bar2" className="barfiller">
                    <div className="tipWrap">
                      <span className="tip"></span>
                    </div>
                    <span
                      className="fill"
                      data-percentage="80"
                      style={{ width: "80%" }}
                    ></span>
                  </div>
                </div>
                <div className="about__bar__item">
                  <p>Cake Recipes</p>
                  <div id="bar3" className="barfiller">
                    <div className="tipWrap">
                      <span className="tip"></span>
                    </div>
                    <span
                      className="fill"
                      data-percentage="60"
                      style={{ width: "60%" }}
                    ></span>
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

export default About;
