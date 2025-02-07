export const Map = () => {
  return (
    <>
      <div className="map">
        <div className="container">
          <div className="row">
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
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            aria-hidden="false"
            tabIndex="0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.7215501502537!2d72.51082477350796!3d23.033993915905317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b49eee80dd7%3A0xbefbfd7e023fb440!2s2GM7%2BGC3%2C%20Bodakdev%2C%20Ahmedabad%2C%20Gujarat%20380053!5e0!3m2!1sen!2sin!4v1738910332093!5m2!1sen!2sin"
          ></iframe>
          {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.7215501502537!2d72.51082477350796!3d23.033993915905317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b49eee80dd7%3A0xbefbfd7e023fb440!2s2GM7%2BGC3%2C%20Bodakdev%2C%20Ahmedabad%2C%20Gujarat%20380053!5e0!3m2!1sen!2sin!4v1738910332093!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
        </div>
      </div>
    </>
  );
};

export default Map;
