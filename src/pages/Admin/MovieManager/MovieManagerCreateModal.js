import React from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import slugify from "slugify";
import Moment from "moment";
import { maNhom } from "../../../utils/common";
import { themPhimMoi } from "../../../redux/actions/phimActions";

export default function MovieManagerCreateModal(props) {
  const dispatch = useDispatch();
  const { showCreate, setShowCreate, setAlert } = props;

  return (
    <Modal size="lg" show={showCreate} onHide={() => setShowCreate(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm phim mới</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          maPhim: 0,
          tenPhim: "",
          biDanh: "",
          trailer: "",
          hinhAnh: "",
          moTa: "",
          maNhom: maNhom,
          ngayKhoiChieu: "",
          danhGia: 0,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.tenPhim) {
            errors.tenPhim = "Tên phim không được để trống";
          }
          if (!values.trailer) {
            errors.trailer = "Trailer không được dể trống";
          }
          if (!values.hinhAnh) {
            errors.hinhAnh = "Hình ảnh không được dể trống";
          }
          if (!values.moTa) {
            errors.moTa = "Mô tả không được dể trống";
          }
          if (!values.ngayKhoiChieu) {
            errors.ngayKhoiChieu = "Ngày khởi chiếu không được dể trống";
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
          setValues,
          isValid,
          isSubmitting,
          setSubmitting,
        }) => (
          <Form
            onSubmit={(evt) => {
              evt.preventDefault();
              dispatch(themPhimMoi(values));
              setSubmitting(true);
              setTimeout(() => {
                setAlert(true);
                setSubmitting(false);
              }, 500);
            }}
          >
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="position-relative">
                    <Form.Label>Tên phim</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên phim"
                      name="tenPhim"
                      onBlur={handleBlur}
                      onChange={(evt) => {
                        const friendlyString = slugify(evt.target.value, {
                          replacement: "-",
                          remove: undefined,
                          lower: true,
                          locale: "vi",
                        });
                        setValues({
                          ...values,
                          tenPhim: evt.target.value,
                          biDanh: friendlyString,
                        });
                      }}
                      isInvalid={errors.tenPhim && touched.tenPhim}
                    />
                    <Form.Control.Feedback tooltip type="invalid">
                      {errors.tenPhim}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Bí danh</Form.Label>
                    <Form.Control
                      type="text"
                      value={values.biDanh}
                      placeholder="Bí danh"
                      name="biDanh"
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="position-relative">
                    <Form.Label>Hình ảnh</Form.Label>
                    <Form.File
                      accept="image/png, image/jpeg"
                      name="hinhAnh"
                      style={{ overflow: "hidden" }}
                      onBlur={handleBlur}
                      onChange={(evt) => {
                        if (evt.target.files[0]) {
                          setValues({
                            ...values,
                            hinhAnh: evt.target.files[0],
                          });
                        }
                      }}
                      isInvalid={errors.hinhAnh && touched.hinhAnh}
                      feedback={errors.hinhAnh}
                      feedbackTooltip
                    />
                  </Form.Group>
                  {values.hinhAnh === "" ? (
                    <React.Fragment></React.Fragment>
                  ) : (
                    <div style={{ overflow: "hidden" }}>
                      <img
                        src={URL.createObjectURL(values.hinhAnh)}
                        alt="preview"
                        height="200"
                        className="mt-1"
                      />
                    </div>
                  )}
                </Col>
                <Col md={6}>
                  <Form.Group className="position-relative">
                    <Form.Label>Trailer</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="https://www.youtube.com/embed/VIDEO_ID"
                      name="trailer"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={errors.trailer && touched.trailer}
                    />
                    <Form.Control.Feedback tooltip type="invalid">
                      {errors.trailer}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {values.trailer === "" ? (
                    <React.Fragment></React.Fragment>
                  ) : (
                    <iframe
                      src={values.trailer}
                      title="preview"
                      width="100%"
                      height="195"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </Col>
              </Row>
              <Form.Group className="position-relative">
                <Form.Label>Mô tả phim</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Đoạn mô tả về phim"
                  name="moTa"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={errors.moTa && touched.moTa}
                />
                <Form.Control.Feedback tooltip type="invalid">
                  {errors.moTa}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="position-relative">
                <Form.Label>Ngày khởi chiếu</Form.Label>
                <Form.Control
                  type="date"
                  name="ngayKhoiChieu"
                  onBlur={handleBlur}
                  onChange={(evt) => {
                    setValues({
                      ...values,
                      ngayKhoiChieu: Moment(
                        evt.target.value,
                        "YYYY-MM-DD"
                      ).format("DD/MM/YYYY"),
                    });
                  }}
                  isInvalid={errors.ngayKhoiChieu && touched.ngayKhoiChieu}
                />
                <Form.Control.Feedback tooltip type="invalid">
                  {errors.ngayKhoiChieu}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Mã nhóm</Form.Label>
                <Form.Control
                  value={maNhom}
                  placeholder="Mã nhóm"
                  name="maNhom"
                  disabled
                />
              </Form.Group>
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
                Thêm phim
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
