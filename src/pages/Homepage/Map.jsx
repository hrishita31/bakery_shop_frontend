export const Map = () => {
  return (
    <>
      <div className="map">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-7">
              <div className="map__inner">
                <h6>COlorado</h6>
                <ul>
                  <li>1000 Lakepoint Dr, Frisco, CO 80443, USA</li>
                  <li>Sweetcake@support.com</li>
                  <li>+1 800-786-1000</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="map__iframe">
          <iframe
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            aria-hidden="false"
            tabIndex="0"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10784.188505644011!2d19.053119335158936!3d47.48899529453826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1543907528304"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Map;
