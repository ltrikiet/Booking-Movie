import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { HashLink as Link } from "react-router-hash-link";

export default function SideBar(props) {
  const { windowSize, setHide } = props;
  const { hide, small, setSmall } = props;
  const [active, setActive] = useState(0);

  const sideBar = {
    sideBarMenu: [
      {
        title: "Dashboard",
        link: "/admin",
        icon: "fa fa-tachometer-alt",
      },
      {
        title: "Quản lý phim",
        link: "/admin/movie-manager",
        icon: "fa fa-film",
      },
      {
        title: "Người dùng",
        link: "/admin/user-manager",
        icon: "fa fa-user",
      },
    ],
  };

  const handleOnClick = (index) => {
    setActive(index);
    setHide(true);
  };

  return (
    <div
      className={`sidebar position-fixed ${
        hide && windowSize.width < 768 ? "d-none" : ""
      } ${
        (small && windowSize.width >= 768) ||
        (windowSize.width <= 992 && windowSize.width >= 768)
          ? "sidebar-small"
          : "sidebar-normal"
      }`}
    >
      <h3 className="logo-text">
        {(small && windowSize.width > 768) ||
        (windowSize.width < 992 && windowSize.width >= 768) ? (
          <p>
            A<span>D</span>
          </p>
        ) : (
          <p>
            AD<span>MIN</span>
          </p>
        )}
      </h3>
      <hr className="border-logo" style={{ marginTop: 0 }} />
      <Nav variant="pills" className="flex-column">
        {sideBar.sideBarMenu.map((item, index) => {
          return (
            <Nav.Item key={index}>
              <Link
                className={index === active ? "nav-link active " : "nav-link "}
                to={item.link}
                onClick={() => {
                  handleOnClick(index);
                }}
              >
                <i className={item.icon}></i>
                {item.title}
              </Link>
            </Nav.Item>
          );
        })}
      </Nav>
      {windowSize.width < 992 ? (
        <React.Fragment></React.Fragment>
      ) : (
        <button
          className="button-small-sidebar"
          onClick={() => setSmall(!small)}
        >
          {small ? (
            <i className="fa fa-chevron-circle-right"></i>
          ) : (
            <i className="fa fa-chevron-circle-left"></i>
          )}
        </button>
      )}
    </div>
  );
}
