// eslint-disable-next-line react/prop-types
const WithStyles = ({ image, headline, description }) => (
    <div style={{ padding: "10px", textAlign: "center" }}>
      <img
        src={image}
        alt={headline}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <h3>{headline}</h3>
      <p>{description}</p>
    </div>
  );
  export default WithStyles;
  