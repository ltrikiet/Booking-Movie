import React, { useState } from "react";
import { Col, Row, Badge, ButtonGroup, Button } from "react-bootstrap";
import { maNhom } from "../../../utils/common";
import ChangePasswordModal from "./ChangePasswordModal";

export default function UserProfile(props) {
  const { thongTinNguoiDung, setIsUpdate, userInfo, setAlert } = props;
  const [show, setShow] = useState(false);

  return (
    <React.Fragment>
      <Row className="user-profile-content">
        <Button className="btn-edit" onClick={() => setIsUpdate(true)}>
          <i className="fa fa-pencil-alt"></i>
        </Button>
        <Button className="btn-changepassword" onClick={() => setShow(true)}>
          Đổi mật khẩu
        </Button>
        <Col md={5} className="left p-0">
          <img className="avatar-img" src="img/male-avatar.png" alt="avatar" />
        </Col>
        <Col md={7} className="right p-0">
          <div className="top">
            <Badge variant="success">Xin chào</Badge>
            {userInfo.maLoaiNguoiDung === "QuanTri" ? (
              <p className="user-type">
                Quản trị{" "}
                <span className="ml-4 d-block d-sm-inline">
                  {thongTinNguoiDung.hoTen}
                </span>
              </p>
            ) : (
              <p className="user-type">
                Khách hàng{" "}
                <span className="ml-4 d-block d-sm-inline">
                  {thongTinNguoiDung.hoTen}
                </span>
              </p>
            )}

            <hr />
            <div className="user-info">
              <Row className="mr-0">
                <Col xs={5} sm={4} md={3} className="info-title">
                  <p>Tài khoản</p>
                </Col>
                <Col xs={7} sm={8} md={9} className="user-info">
                  {thongTinNguoiDung.taiKhoan}
                </Col>
              </Row>
              <Row className="mr-0">
                <Col xs={5} sm={4} md={3} className="info-title">
                  <p>Mã nhóm</p>
                </Col>
                <Col xs={7} sm={8} className="user-info">
                  <p>{maNhom}</p>
                </Col>
              </Row>
              <Row className="mr-0">
                <Col xs={5} sm={4} md={3} className="info-title">
                  <p>Email</p>
                </Col>
                <Col xs={7} sm={8} md={9} className="user-info">
                  <p>{thongTinNguoiDung.email}</p>
                </Col>
              </Row>
              <Row className="mr-0">
                <Col xs={5} sm={4} md={3} className="info-title">
                  <p>SĐT</p>
                </Col>
                <Col xs={7} sm={8} md={9} className="user-info">
                  {thongTinNguoiDung.soDT}
                </Col>
              </Row>
            </div>
          </div>
          <div className="bottom">
            <ButtonGroup className="social-link">
              <Button variant="secondary">
                <i className="fab fa-facebook-f"></i>
              </Button>
              <Button variant="secondary">
                <i className="fab fa-twitter"></i>
              </Button>
              <Button variant="secondary">
                <i className="fab fa-google"></i>
              </Button>
              <Button variant="secondary">
                <i className="fab fa-linkedin-in"></i>
              </Button>
              <Button variant="secondary">
                <i className="fab fa-skype"></i>
              </Button>
              <Button variant="secondary">
                <i className="fab fa-telegram-plane"></i>
              </Button>
            </ButtonGroup>
          </div>
        </Col>
      </Row>
      <ChangePasswordModal
        show={show}
        setShow={setShow}
        thongTinNguoiDung={thongTinNguoiDung}
        setAlert={setAlert}
      />
    </React.Fragment>
  );
}
