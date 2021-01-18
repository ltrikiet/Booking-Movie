import React from "react";
import { useSelector } from "react-redux";
import * as RBootstrap from "react-bootstrap";
// import { HashLink as Link } from "react-router-hash-link";
import { HashLink as Link } from "react-router-hash-link";

export default function Header() {
  const { userInfo } = useSelector((state) => state.authReducer);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/";
  };

  return (
    <div className="header">
      <RBootstrap.Navbar expand="lg">
        <Link
          to={{ pathname: "/", hash: "#home-carousel" }}
          className="navbar-brand"
        >
          <img className="header-logo" src="/img/web-logo.png" alt="web-logo" />
        </Link>

        <RBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
        <RBootstrap.Navbar.Collapse id="basic-navbar-nav">
          <RBootstrap.Nav className="menu ml-auto">
            <Link to="/#lichchieu" className="nav-link">
              Lịch chiếu
            </Link>
            <Link to="/#cumrap" className="nav-link d-none d-md-block">
              Cụm rạp
            </Link>
            <Link to={{ pathname: "/", hash: "#ungdung" }} className="nav-link">
              Ứng dụng
            </Link>
          </RBootstrap.Nav>
          <RBootstrap.Nav className="user ml-auto">
            {userInfo.length === 0 ? (
              <Link to="/login" className="nav-link">
                <img
                  className="user-avatar"
                  src="/img/avatar.png"
                  alt="avatar"
                />
                <span>Đăng nhập</span>
              </Link>
            ) : (
              <React.Fragment>
                <RBootstrap.NavDropdown
                  alignRight
                  title={`Xin chào, ${userInfo.hoTen}`}
                  id="basic-nav-dropdown"
                >
                  {userInfo.maLoaiNguoiDung === "QuanTri" ? (
                    <Link className="dropdown-item" to="/admin">
                      Trang Admin
                    </Link>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                  <Link className="dropdown-item" to="/profile">
                    Thông tin cá nhân
                  </Link>
                  <RBootstrap.NavDropdown.Divider />
                  <Link
                    to="/"
                    className="dropdown-item"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Thoát
                  </Link>
                </RBootstrap.NavDropdown>
              </React.Fragment>
            )}

            {/* <RBootstrap.Nav.Link href="#vitri">
              <i className="fa fa-map-marker-alt"></i>
              <span>Hồ chí minh</span>
              <i className="fa fa-angle-down"></i>
            </RBootstrap.Nav.Link> */}
          </RBootstrap.Nav>
        </RBootstrap.Navbar.Collapse>
      </RBootstrap.Navbar>
    </div>
  );
}
