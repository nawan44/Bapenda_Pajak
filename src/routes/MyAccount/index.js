import React from "react";
import jwtDecode from "jwt-decode";
import Widget from "../../components/Widget";
import { CloseCircleFilled } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

export const contactList = [
  {
    id: 1,
    title: "Email",

    icon: "email",
    desc: [
      <span className="gx-link" key={1}>
        kiley.brown@example.com
      </span>,
    ],
  },
  {
    id: 2,
    title: "Web page",
    icon: "link",
    desc: [
      <span className="gx-link" key={2}>
        example.com
      </span>,
    ],
  },
  {
    id: 3,
    title: "Phone",
    icon: "phone",
    desc: ["+1-987 (454) 987"],
  },
];
function MyAccount() {
  const history = useHistory();

  const decoded = jwtDecode(localStorage.token);
  const cancel = () => {
    history.push("/dashboard");
  };
  return (
    <div>
      <Widget
        title="My Account"
        styleName={`gx-card-profile-sm`}
        extra={
          <CloseCircleFilled style={{ fontSize: "20px" }} onClick={cancel} />
        }
      >
        {/* {decoded.map((data, index) => */}
        <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
          <div className="gx-mr-3">
            <i className={`icon icon-user gx-fs-xxl gx-text-grey`} />
          </div>
          <div className="gx-media-body">
            <span className="gx-mb-0 gx-text-grey gx-fs-sm">Nama</span>
            <p className="gx-mb-0">{decoded.name}</p>
          </div>
        </div>

        <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
          <div className="gx-mr-3">
            <i className={`icon icon-email gx-fs-xxl gx-text-grey`} />
          </div>
          <div className="gx-media-body">
            <span className="gx-mb-0 gx-text-grey gx-fs-sm">Email</span>
            <p className="gx-mb-0">{decoded.email}</p>
          </div>
        </div>
        {/* )} */}
      </Widget>{" "}
    </div>
  );
}

export default MyAccount;
