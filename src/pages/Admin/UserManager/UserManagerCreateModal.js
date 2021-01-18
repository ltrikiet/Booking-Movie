import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { Formik } from "formik";
import {
  getListLoaiNguoiDung,
  themNguoiDung,
} from "../../../redux/actions/nguoiDungActions";
import { maNhom } from "../../../utils/common";

export default function UserManagerCreateModal(props) {
  const { showCreate, setShowCreate, setAlert } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListLoaiNguoiDung());
    // eslint-disable-next-line
  }, []);

  const { danhSachLoaiNguoiDung } = useSelector(
    (state) => state.loaiNguoiDungReducer
  );

  return (
    <Modal size="lg" show={showCreate} onHide={() => setShowCreate(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm người dùng</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          hoTen: "",
          email: "",
          soDt: "",
          taiKhoan: "",
          matKhau: "",
          maNhom: maNhom,
          maLoaiNguoiDung: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.taiKhoan) {
            errors.taiKhoan = "Không được để trống tài khoản";
          }
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
          handleBlur,
          handleChange,
          isValid,
          setSubmitting,
          isSubmitting,
        }) => (
          <Form
            onSubmit={(evt) => {
              evt.preventDefault();
              dispatch(themNguoiDung(values));
              setSubmitting(true);
              setTimeout(() => {
                setAlert(true);
                setSubmitting(false);
              }, 500);
            }}
          >
            <Modal.Body>
              <Form.Group className="position-relative">
                <Form.Label>Tài khoản</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tài khoản"
                  name="taiKhoan"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.taiKhoan && touched.taiKhoan}
                />
                <Form.Control.Feedback tooltip type="invalid">
                  {errors.taiKhoan}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="position-relative">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu"
                  name="matKhau"
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={errors.email && touched.email}
                    />
                    <Form.Control.Feedback tooltip type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="position-relative">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      name="soDt"
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                      placeholder="Nhập họ tên"
                      name="hoTen"
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                  <Form.Label>Mã nhóm</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập mã nhóm"
                    value={maNhom}
                    disabled
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Loại người dùng</Form.Label>
                  <Form.Control
                    as="select"
                    name="maLoaiNguoiDung"
                    onChange={handleChange}
                  >
                    {danhSachLoaiNguoiDung.map((item, index) => {
                      return (
                        <option key={index} value={item.maLoaiNguoiDung}>
                          {item.tenLoai}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowCreate(false)}>
                Đóng
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={
                  !isValid ||
                  (Object.keys(touched).length === 0 &&
                    touched.constructor === Object) ||
                  isSubmitting
                }
              >
                Thêm
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
