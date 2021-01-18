import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { maNhom } from "../../../utils/common";
import { capNhatNguoiDung } from "../../../redux/actions/nguoiDungActions";

export default function ChangePasswordModal(props) {
  const dispatch = useDispatch();
  const { show, setShow, thongTinNguoiDung, setAlert } = props;
  const { userInfo } = useSelector((state) => state.authReducer);
  const [updateUserInfo, setUpdateUserInfo] = useState({
    hoTen: thongTinNguoiDung.hoTen,
    email: thongTinNguoiDung.email,
    soDt: thongTinNguoiDung.soDT,
    taiKhoan: thongTinNguoiDung.taiKhoan,
    matKhau: thongTinNguoiDung.matKhau,
    maNhom: maNhom,
    maLoaiNguoiDung: userInfo.maLoaiNguoiDung,
  });

  const handleOnChange = (evt) => {
    const { name, value } = evt.target;
    setUpdateUserInfo({ ...updateUserInfo, [name]: value });
    console.log(updateUserInfo);
  };

  const handleOnClick = () => {
    dispatch(capNhatNguoiDung(updateUserInfo));
    setAlert(true);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Đổi mật khẩu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Mật khẩu mới</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="matKhau"
              onChange={(evt) => handleOnChange(evt)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nhập lại mật khẩu mới</Form.Label>
            <Form.Control type="password" placeholder="Comfirm password" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Đóng
        </Button>
        <Button variant="primary" onClick={() => handleOnClick()}>
          Thay đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
