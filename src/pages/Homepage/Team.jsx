import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect, useState } from "react";

export const Team = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState([]);
  const url = import.meta.env.VITE_API_URL;
  const image_url = import.meta.env.VITE_IMAGE_URL;

  useEffect(() => {
    axios
      .get(`${url}/teams/displayMember`)
      .then((res) => {
        setTeam(res.data.result);
      })
      .catch(() => toast.error("Failed to fetch members"));
  }, []);

  useEffect(() => {
    console.log(team);
  }, [team]);

  console.log(team, "team");

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
          {team?.length ? (
          <>
            <div className="row">
              {team.map((teamItem) => (
                <div key={teamItem._id} className="col-lg-3 col-md-6 col-sm-6">
                  <div className="team__item set-bg">
                    <img
                      src={`${image_url}/images/member/${teamItem.image.filename}`}
                      alt={teamItem.name}
                    />

                    <div className="team__item__text">
                      <h6>{teamItem.name}</h6>
                      <span>{teamItem.jobRole}</span>
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
              ))}
            </div>
          </>
        ) : (
          <div>No members</div>
        )}
        </div>
      </section>
    </>
  );
};

export default Team;
