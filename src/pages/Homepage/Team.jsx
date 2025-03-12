import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const Team = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState([]);
  const url = import.meta.env.VITE_API_URL;
  const image_url = import.meta.env.VITE_IMAGE_URL;

  useEffect(() => {
    axios
      .get(`${url}/teams/displayTeamMembers`)
      .then((res) => {
        console.log(res.data.result);
        setTeam(res.data.result);
      })
      .catch(() => {
        toast.error("No members");
      });
  }, []);

  useEffect(() => {}, [team]);

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
              <div className="register__team">
                {JSON.parse(Cookies.get("details")).isAdmin ? (
                  <div className="view-registrations">
                    <button
                      className="view-registrations-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/viewAllRegistrations");
                      }}
                    >
                      View all Registrations
                    </button>
                  </div>
                ) : (
                  ""
                )}

                <button
                  className="register-to-team-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/registerToTeam");
                  }}
                >
                  Join Us
                </button>
              </div>
            </div>
          </div>
          {team?.length ? (
            <>
              <div className="row">
                {team.map((teamItem) => (
                  <div
                    key={teamItem._id}
                    className="col-lg-3 col-md-6 col-sm-6"
                  >
                    <div className="team__members__display">
                      <div className="team__item set-bg">
                        <img
                          className="team__member__image"
                          src={`${image_url}/images/member/${teamItem.image.filename}`}
                          alt={teamItem.name}
                        />
                      </div>

                      <div className="team__item__text">
                        <h6>{teamItem.name}</h6>
                        <span>{teamItem.jobRole}</span>
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
