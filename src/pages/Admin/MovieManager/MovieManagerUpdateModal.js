import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Form, Button, Col, Row } from "react-bootstrap";
import { Formik } from "formik";
import { maNhom } from "../../../utils/common";
import slugify from "slugify";
import { capNhatPhim } from "../../../redux/actions/phimActions";

export default function MovieManagerUpdateModal(props) {
  const { showUpdate, setShowUpdate, updateMovie, setAlert } = props;
  const dispatch = useDispatch();
  const [hinhAnhPreview, setHinhAnhPreivew] = useState("");

  return (
    <Modal
      size="lg"
      show={showUpdate}
      onHide={() => {
        setShowUpdate(false);
        setHinhAnhPreivew("");
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật phim</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          maPhim: updateMovie.maPhim,
          tenPhim: updateMovie.tenPhim,
          biDanh: updateMovie.biDanh,
          trailer: updateMovie.trailer,
          moTa: updateMovie.moTa,
          maNhom: maNhom,
          ngayKhoiChieu: updateMovie.ngayKhoiChieu,
          danhGia: updateMovie.danhGia,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.tenPhim) {
            errors.tenPhim = "Tên phim không được để trống";
          }
          if (!values.trailer) {
            errors.trailer = "Trailer không được dể trống";
          }
          if (!values.moTa) {
            errors.moTa = "Mô tả không được dể trống";
          }
          if (!values.ngayKhoiChieu) {
            errors.ngayKhoiChieu = "Ngày khởi chiếu không được dể trống";
          }
          if (!values.danhGia) {
            errors.danhGia = "Đánh giá không được dể trống";
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
          setValues,
          isSubmitting,
          setSubmitting,
        }) => (
          <Form
            onSubmit={(evt) => {
              evt.preventDefault();
              dispatch(capNhatPhim(values));
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
                      value={values.tenPhim}
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
                    <Form.Label>Hình ảnh (Không đổi sẽ giữ cũ)</Form.Label>
                    <Form.File
                      accept="image/png, image/jpeg"
                      name="hinhAnh"
                      onBlur={handleBlur}
                      onChange={(evt) => {
                        if (evt.target.files[0]) {
                          setValues({
                            ...values,
                            hinhAnh: evt.target.files[0],
                          });
                          setHinhAnhPreivew(
                            URL.createObjectURL(evt.target.files[0])
                          );
                        }
                      }}
                      isInvalid={errors.hinhAnh && touched.hinhAnh}
                      feedback={errors.hinhAnh}
                      feedbackTooltip
                    />
                    <img
                      src={
                        hinhAnhPreview !== ""
                          ? hinhAnhPreview
                          : updateMovie.hinhAnh
                      }
                      alt="preview"
                      style={{ maxWidth: "220px" }}
                      height="200"
                      className="mt-1"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="position-relative">
                    <Form.Label>Trailer</Form.Label>
                    <Form.Control
                      type="text"
                      value={values.trailer}
                      placeholder="https://www.youtube.com/embed/VIDEO_ID"
                      name="trailer"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={errors.trailer && touched.trailer}
                    />
                    <Form.Control.Feedback tooltip type="invalid">
                      {errors.trailer}
                    </Form.Control.Feedback>
                    <iframe
                      title="preview"
                      src={values.trailer}
                      width="100%"
                      height="195"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="position-relative">
                <Form.Label>Mô tả phim</Form.Label>
                <Form.Control
                  as="textarea"
                  value={values.moTa}
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
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Ngày khởi chiếu</Form.Label>
                    <Form.Control
                      type="date"
                      value={values.ngayKhoiChieu}
                      name="ngayKhoiChieu"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="position-relative">
                    <Form.Label>Đánh giá</Form.Label>
                    <Form.Control
                      type="number"
                      min={0}
                      max={10}
                      value={values.danhGia}
                      name="danhGia"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={errors.danhGia && touched.danhGia}
                    />
                    <Form.Control.Feedback tooltip type="invalid">
                      {errors.danhGia}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Mã nhóm</Form.Label>
                    <Form.Control
                      value={maNhom}
                      placeholder="Mã nhóm"
                      name="maNhom"
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowUpdate(false);
                  setHinhAnhPreivew("");
                }}
              >
                Đóng
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={
                  !isValid ||
                  isSubmitting ||
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
