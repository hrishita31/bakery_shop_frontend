import Breadcrumb from "./Breadcrumbs";
import { useEffect, useState } from "react";
import axios from "axios";
import { IconCheck } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";
import Popup from "reactjs-popup";
import { acceptTeamMember } from "./AddMemberToTeam";
import { deleteMember } from "./RemoveMemberFromTeam";
import Cookies from "js-cookie";

function AddTeamMemberPage() {
  const url = import.meta.env.VITE_API_URL;
  const image_url = import.meta.env.VITE_IMAGE_URL;
  const [allMembers, setAllMembers] = useState([]);
  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios
      .get(`${url}/teams/displayMember`, {
        headers,
      })
      .then((res) => {
        setAllMembers(res.data.result);
      })
      .catch((error) => console.error("Error fetching members: ", error));
  }, [url]);

  useEffect(() => {
    console.log(allMembers);
  }, [allMembers]);

  return (
    <>
      {/* Breadcrumb section */}
      <Breadcrumb title="Add to Team" />

      {/* View all members section */}
      <section className="member spad">
        <div className="container">
          <div className="row">
            {allMembers.length ? (
              <div className="members__table">
                <table>
                  <div className="members__table__headers">
                    <thead>
                      <tr>
                        <div className="member__table__contents">
                          <div className="table__member__name">
                            <th>Name</th>
                          </div>
                          <div className="table__member__jobRole">
                            <th>Job Role</th>
                          </div>
                          <div className="table__member__phoneNumber">
                            <th>Phone Number</th>
                          </div>
                          <div className="table__member__email">
                            <th>Email</th>
                          </div>
                          <div className="table__member__status">
                            <th>Status</th>
                          </div>
                        </div>
                      </tr>
                    </thead>
                  </div>

                  <tbody>
                    <div className="member__table__container">
                      {allMembers.map((item) => (
                        <tr key={item._id} className="member__item__container">
                          <td className="member__details__table">
                            <div className="member__details">
                              <div className="member__pic">
                                <img
                                  className="member__img"
                                  src={`${image_url}/images/member/${item.image.filename}`}
                                  alt={item.name}
                                />
                              </div>
                              <div className="member__text">
                                <span>{item.name.toUpperCase()}</span>
                              </div>
                            </div>
                          </td>

                          <td className="member__jobRole">
                            {item.jobRole.toUpperCase()}
                          </td>

                          <td className="member__phoneNumber">
                            {item.phoneNumber}
                          </td>

                          <td className="member__email">{item.email}</td>

                          <td className="member__status">
                            <div className="member__status__accept">
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  acceptTeamMember(item._id, setAllMembers);
                                }}
                              >
                                <button className="member__status__button">
                                  <IconCheck color="black" />
                                </button>
                              </a>
                            </div>
                            <div className="member__status__reject">
                              <Popup
                                className="popup__modal"
                                trigger={
                                  <button className="member__status__button">
                                    <IconX color="black" />
                                  </button>
                                }
                                modal
                                nested
                              >
                                {(close) => (
                                  <>
                                    <div className="modal__member">
                                      <span>
                                        Are you sure you want to delete the
                                        member?
                                      </span>
                                      <div className="modal__status">
                                        <div className="modal__yes">
                                          <button
                                            className="modal__yes__button"
                                            onClick={() => {
                                              deleteMember(
                                                item._id,
                                                setAllMembers
                                              );
                                              close();
                                            }}
                                          >
                                            Yes
                                          </button>
                                        </div>
                                        <div className="modal__no">
                                          <button
                                            className="modal__no__button"
                                            onClick={close}
                                          >
                                            No
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </Popup>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </div>
                  </tbody>
                </table>
              </div>
            ) : (
              <h3>No member requests</h3>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default AddTeamMemberPage;
