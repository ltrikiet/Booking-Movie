import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { login } from "../../redux/actions/authActions";
import { Formik } from "formik";

export default function Login(props) {
  const { register, setRegister } = props;
  const [alert, setAlert] = useState(false);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 1000);
    }
  }, [alert, userInfo]);

  if (userInfo.maLoaiNguoiDung === "KhachHang") {
    return <Redirect to="/"></Redirect>;
  }
  if (userInfo.maLoaiNguoiDung === "QuanTri") {
    return <Redirect to="/admin"></Redirect>;
  }

  return (
    <div className="login-content">
      <div className="login-form text-center text-white">
        <Link to="/">
          <div className="close">
            <span>x</span>
          </div>
        </Link>
        <Link to="/">
          <div className="logo-img">
            <img src="/img/login-logo.png" alt="logo" />
          </div>
        </Link>
        {alert && userInfo === "Tài khoản hoặc mật khẩu không đúng!" ? (
          <div className="alert alert-danger p-1 mb-2">{userInfo}</div>
        ) : (
          <p>Đăng nhập để được nhiều ưu đãi, mua vé và bảo mật thông tin!</p>
        )}

        <Formik
          initialValues={{ taiKhoan: "", matKhau: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.taiKhoan) {
              errors.taiKhoan = "Không được bỏ trống tài khoản";
            }
            if (!values.matKhau) {
              errors.matKhau = "Không được bỏ trống mật khẩu";
            }
            return errors;
          }}
        >
          {({
            values,
            errors,
            isValid,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            setSubmitting,
          }) => (
            <Form
              onSubmit={(evt) => {
                evt.preventDefault();
                dispatch(login(values));
                setSubmitting(true);
                setTimeout(() => {
                  setAlert(true);
                  setSubmitting(false);
                }, 500);
              }}
            >
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
                <Form.Control.Feedback type="invalid" tooltip className="w-100">
                  {errors.taiKhoan}
                </Form.Control.Feedback>
              </Form.Group>
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
                <Form.Control.Feedback type="invalid" tooltip className="w-100">
                  {errors.matKhau}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="text-center btn-dangnhap mb-3">
                <Button
                  type="submit"
                  disabled={
                    !isValid ||
                    (Object.keys(touched).length === 0 &&
                      touched.constructor === Object) ||
                    isSubmitting
                  }
                >
                  Đăng nhập
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <p
          className="dang-ky pt-3"
          onClick={() => {
            setRegister(!register);
          }}
        >
          Đăng ký tài khoản ngay!
        </p>
      </div>
    </div>
  );
}
