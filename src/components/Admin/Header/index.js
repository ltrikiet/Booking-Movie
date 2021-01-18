import React from "react";
import { useSelector } from "react-redux";
import {
  Form,
  Button,
  FormControl,
  Nav,
  Dropdown,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { HashLink as Link } from "react-router-hash-link";

export default function Header(props) {
  const { small, hide, setHide, windowSize } = props;
  const { userInfo } = useSelector((state) => state.authReducer);

  return (
    <Navbar
      className={`admin-header ${
        hide && windowSize.width < 768
          ? "admin-header-full"
          : small || (windowSize.width <= 992 && windowSize.width >= 768)
          ? "admin-header-small"
          : "admin-header-normal"
      }`}
    >
      {hide && windowSize.width < 768 ? (
        <Button
          style={{ marginRight: "10px", backgroundColor: "#4e73df" }}
          onClick={() => setHide(!hide)}
        >
          <i className="fa fa-bars" style={{ fontSize: "20px" }}></i>
        </Button>
      ) : (
        <React.Fragment></React.Fragment>
      )}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline className="search-form d-none d-md-block">
          <FormControl type="text" placeholder="Search" />
          <Button>
            <i className="fa fa-search"></i>
          </Button>
        </Form>
        <Nav className="ml-auto">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <img src="/img/default-avatar.png" alt="avatar" />
              <p>{userInfo.hoTen}</p>
            </Dropdown.Toggle>

            <Dropdown.Menu alignRight>
              <Link className="dropdown-item" to="/">
                Trang chủ
              </Link>
              <Link className="dropdown-item" to="/profile">
                Thông tin cá nhân
              </Link>
              <NavDropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  localStorage.removeItem("userInfo");
                  window.location.reload();
                }}
              >
                Thoát
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
