import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { maNhom } from "../../utils/common";
import { dangKy, login } from "../../redux/actions/authActions";
import { Formik } from "formik";

export default function Register(props) {
  const { register, setRegister } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);

  const { data } = useSelector((state) => state.registerReducer);

  useEffect(() => {
    if (alert) {
      if (data === "Tài khoản đã tồn tại!" || data === "Email đã tồn tại!") {
        Swal.fire({
          icon: "warning",
          title: "Đăng ký thất bại",
          text: `${data}`,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Đăng ký",
          text: "Đăng ký thành công",
        }).then((result) => {
          if (result.isDismissed || result.isConfirmed) {
            dispatch(login(data));
            setTimeout(() => {
              history.push("/");
            }, 500);
          }
        });
      }
    }
    setAlert(false);
    // eslint-disable-next-line
  }, [alert, data]);

  return (
    <div className="register-content text-white">
      <h3 className="text-center">Đăng ký</h3>

      <Formik
        initialValues={{
          taiKhoan: "",
          matKhau: "",
          nhapLaiMatKhau: "",
          email: "",
          soDt: "",
          maNhom: maNhom,
          maLoaiNguoiDung: "KhachHang",
          hoTen: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.taiKhoan) {
            errors.taiKhoan = "Không được để trống tài khoản";
          }
          if (!values.matKhau) {
            errors.matKhau = "Không được để trống mật khẩu";
          }
          if (!values.nhapLaiMatKhau) {
            errors.nhapLaiMatKhau = "Không được để trống nhập lại mật khẩu";
          } else if (values.matKhau !== values.nhapLaiMatKhau) {
            errors.nhapLaiMatKhau = "Không khớp với mật khẩu";
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
          isValid,
          errors,
          handleChange,
          handleBlur,
          touched,
          isSubmitting,
          setSubmitting,
        }) => (
          <Form
            className="mt-3 text-left register-form"
            onSubmit={(evt) => {
              evt.preventDefault();
              dispatch(dangKy(values));
              setSubmitting(true);
              setTimeout(() => {
                setAlert(true);
                setSubmitting(false);
              }, 700);
            }}
          >
            <Row>
              <Col xs={6}>
                <Form.Group className="position-relative">
                  <Form.Label>Họ & tên</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Họ & tên"
                    name="hoTen"
                    value={values.hoTen}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.hoTen && touched.hoTen}
                  />
                  <Form.Control.Feedback
                    tooltip
                    type="invalid"
                    className="w-100"
                  >
                    {errors.hoTen}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="position-relative">
                  <Form.Label>Tài khoản</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tài khoản"
                    name="taiKhoan"
                    value={values.taiKhoan}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.taiKhoan && touched.taiKhoan}
                  />
                  <Form.Control.Feedback
                    tooltip
                    type="invalid"
                    className="w-100"
                  >
                    {errors.taiKhoan}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={12} lg={6}>
                <Form.Group className="position-relative">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Mật khẩu"
                    name="matKhau"
                    value={values.matKhau}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.matKhau && touched.matKhau}
                  />
                  <Form.Control.Feedback
                    tooltip
                    type="invalid"
                    className="w-100"
                  >
                    {errors.matKhau}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={12} lg={6}>
                <Form.Group className="position-relative">
                  <Form.Label>Nhập lại mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    name="nhapLaiMatKhau"
                    value={values.nhapLaiMatKhau}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.nhapLaiMatKhau && touched.nhapLaiMatKhau}
                  />
                  <Form.Control.Feedback
                    tooltip
                    type="invalid"
                    className="w-100"
                  >
                    {errors.nhapLaiMatKhau}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="position-relative">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.email && touched.email}
                  />
                  <Form.Control.Feedback
                    tooltip
                    type="invalid"
                    className="w-100"
                  >
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="position-relative">
                  <Form.Label>SĐT</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Số điện thoại"
                    name="soDt"
                    value={values.soDt}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.soDt && touched.soDt}
                  />
                  <Form.Control.Feedback
                    tooltip
                    type="invalid"
                    className="w-100"
                  >
                    {errors.soDt}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center btn-dangky mt-3">
              <Row>
                <Col>
                  <Button
                    variant="success"
                    type="submit"
                    // onClick={handleSumbit}
                    disabled={
                      !isValid ||
                      (Object.keys(touched).length === 0 &&
                        touched.constructor === Object) ||
                      isSubmitting
                    }
                  >
                    Đăng ký
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="danger"
                    type="submit"
                    onClick={() => setRegister(!register)}
                  >
                    Hủy
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
