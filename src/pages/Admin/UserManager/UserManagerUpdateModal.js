import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import Swal from "sweetalert2";
import {
  capNhatNguoiDung,
  getListLoaiNguoiDung,
} from "../../../redux/actions/nguoiDungActions";
import { maNhom } from "../../../utils/common";

export default function UserManagerUpdateModal(props) {
  const { updateUser, showUpdate, setShowUpdate, setAlert } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListLoaiNguoiDung());
    // eslint-disable-next-line
  }, []);

  const { danhSachLoaiNguoiDung } = useSelector(
    (state) => state.loaiNguoiDungReducer
  );

  return (
    <Modal size="lg" show={showUpdate} onHide={() => setShowUpdate(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          hoTen: updateUser.hoTen,
          email: updateUser.email,
          soDt: updateUser.soDt,
          taiKhoan: updateUser.taiKhoan,
          matKhau: updateUser.matKhau,
          maNhom: maNhom,
          maLoaiNguoiDung: updateUser.maLoaiNguoiDung,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.matKhau) {
            errors.matKhau = "Không được để trống mật khẩu";
          }
          if (!values.hoTen) {
            errors.hoTen = "Không được để trống họ tên";
          }
          if (!values.soDt) {
            errors.soDt = "Không được để trống số điện thoại";
          } else if (!/^\d+$/.test(values.soDt)) {
            errors.soDt = "Chỉ được nhập số";
          }
          if (!values.email) {
            errors.email = "Không được để trống email";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Email không đúng định dạng";
          }
          return errors;
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          setSubmitting,
          isSubmitting,
        }) => (
          <Form
            onSubmit={(evt) => {
              evt.preventDefault();
              Swal.fire({
                icon: "question",
                title: "Cập nhật tài khoản",
                text: "Bạn có thực sự muốn cập nhật tài khoản này ?",
                showCancelButton: true,
                cancelButtonText: "Đóng",
                confirmButtonText: "Chấp nhận",
              }).then((result) => {
                if (result.isConfirmed === true) {
                  dispatch(capNhatNguoiDung(values));
                  setSubmitting(true);
                  setTimeout(() => {
                    setAlert(true);
                    setSubmitting(false);
                  }, 500);
                }
              });
            }}
          >
            <Modal.Body>
              <Form.Group>
                <Form.Label>Tài khoản</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tài khoản"
                  name="taiKhoan"
                  value={values.taiKhoan}
                  disabled
                />
              </Form.Group>
              <Form.Group className="position-relative">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu"
                  name="matKhau"
                  value={values.matKhau}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={errors.matKhau && touched.matKhau}
                />
                <Form.Control.Feedback tooltip type="invalid">
                  {errors.matKhau}
                </Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Col md={4}>
                  <Form.Group className="position-relative">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Nhập email"
                      name="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={errors.email && touched.email}
                    />
                    <Form.Control.Feedback tooltip type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="position-relative">
                    <Form.Label>SĐT</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Nhập điện thoại"
                      name="soDt"
                      value={values.soDt}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={errors.soDt && touched.soDt}
                    />
                    <Form.Control.Feedback tooltip type="invalid">
                      {errors.soDt}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="position-relative">
                    <Form.Label>Họ tên</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập fullname"
                      name="hoTen"
                      value={values.hoTen}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={errors.hoTen && touched.hoTen}
                    />
                    <Form.Control.Feedback tooltip type="invalid">
                      {errors.hoTen}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Mã nhóm</Form.Label>
                    <Form.Control
                      type="string"
                      placeholder="Mã nhóm"
                      name="hoTen"
                      value={maNhom}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Label>Loại người dùng</Form.Label>
                  <Form.Control
                    as="select"
                    name="maLoaiNguoiDung"
                    onChange={handleChange}
                    defaultValue={values.maLoaiNguoiDung}
                  >
                    {danhSachLoaiNguoiDung.map((item, index) => {
                      return (
                        <option value={item.maLoaiNguoiDung} key={index}>
                          {item.tenLoai}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowUpdate(false)}>
                Đóng
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={
                  !isValid ||
                  !isSubmitting ||
                  (Object.keys(touched).length === 0 &&
                    touched.constructor === Object)
                }
              >
                Cập nhật
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
