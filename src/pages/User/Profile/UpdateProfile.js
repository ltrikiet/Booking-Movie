import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Row, Badge, ButtonGroup, Button, Form } from "react-bootstrap";
import { maNhom } from "../../../utils/common";
import { capNhatNguoiDung } from "../../../redux/actions/nguoiDungActions";

export default function UpdateProfile(props) {
  const dispatch = useDispatch();
  const { thongTinNguoiDung, setIsUpdate, userInfo, setAlert } = props;
  const [updateUserInfo, setUpdateUserInfo] = useState({
    hoTen: thongTinNguoiDung.hoTen,
    email: thongTinNguoiDung.email,
    soDt: thongTinNguoiDung.soDT,
    taiKhoan: thongTinNguoiDung.taiKhoan,
    matKhau: thongTinNguoiDung.matKhau,
    maNhom: maNhom,
    maLoaiNguoiDung: userInfo.maLoaiNguoiDung,
  });

  const handleOnChangeValue = (evt) => {
    const { name, value } = evt.target;
    setUpdateUserInfo({
      ...updateUserInfo,
      [name]: value,
    });
  };

  const handleUpdateAccount = () => {
    dispatch(capNhatNguoiDung(updateUserInfo));
    setAlert(true);
  };

  return (
    <React.Fragment>
      <Row className="update-user-profile-content">
        <Button className="btn-cancel" onClick={() => setIsUpdate(false)}>
          <i className="fa fa-times"></i>
        </Button>
        <Button className="btn-accept" onClick={() => handleUpdateAccount()}>
          <i className="fa fa-check"></i>
        </Button>
        <Col md={5} className="left p-0">
          <img className="avatar-img" src="img/male-avatar.png" alt="avatar" />
        </Col>
        <Col md={7} className="right p-0">
          <div className="top">
            <Badge variant="success">Xin chào</Badge>
            {userInfo.maLoaiNguoiDung === "QuanTri" ? (
              <p className="user-type d-block d-sm-flex align-items-center">
                Quản trị
                <Form.Control
                  className="ml-3"
                  type="text"
                  defaultValue={thongTinNguoiDung.hoTen}
                  name="hoTen"
                  onChange={(evt) => handleOnChangeValue(evt)}
                  placeholder="Họ & tên"
                />
              </p>
            ) : (
              <p className="user-type">
                <p className="user-type d-block d-sm-flex align-items-center">
                  Khách hàng
                  <Form.Control
                    className="w-50 ml-3"
                    type="text"
                    name="hoTen"
                    defaultValue={thongTinNguoiDung.hoTen}
                    onChange={(evt) => handleOnChangeValue(evt)}
                    placeholder="name@example.com"
                  />
                </p>
              </p>
            )}

            <hr />

            <div className="user-info">
              <Row>
                <Col xs={5} sm={4} md={3} className="info-title">
                  <p>Tài khoản</p>
                </Col>
                <Col xs={7} sm={8} md={9}>
                  <p>{thongTinNguoiDung.taiKhoan}</p>
                </Col>
              </Row>
              <Row>
                <Col xs={5} sm={4} md={3} className="info-title">
                  <p>Mã nhóm</p>
                </Col>
                <Col xs={7} sm={8} md={9}>
                  <p>{thongTinNguoiDung.maNhom}</p>
                </Col>
              </Row>
              <Row>
                <Col xs={4} sm={3} md={2} className="info-title">
                  <p>Email</p>
                </Col>
                <Col xs={8} sm={9} md={10}>
                  <Form.Control
                    className="ml-3"
                    type="email"
                    name="email"
                    defaultValue={thongTinNguoiDung.email}
                    placeholder="name@example.com"
                    onChange={(evt) => handleOnChangeValue(evt)}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={4} sm={3} md={2} className="info-title">
                  <p>SĐT</p>
                </Col>
                <Col xs={8} sm={9} md={10}>
                  <Form.Control
                    className="ml-3"
                    type="text"
                    name="soDt"
                    defaultValue={thongTinNguoiDung.soDT}
                    placeholder="Số điện thoại"
                    onChange={(evt) => handleOnChangeValue(evt)}
                  />
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
    </React.Fragment>
  );
}
