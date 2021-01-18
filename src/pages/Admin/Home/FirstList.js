import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Card } from "react-bootstrap";
import { getListNguoiDung } from "../../../redux/actions/nguoiDungActions";
import { getListPhim } from "../../../redux/actions/lichChieuPhimActions";
import { getHeThongRap } from "../../../redux/actions/heThongRapActions";

export default function FirstList() {
  const dispatch = useDispatch();
  const { danhSachNguoiDung } = useSelector((state) => state.nguoiDungReducer);
  const { danhSachPhim } = useSelector((state) => state.lichChieuPhimReducer);
  const { danhSachHeThongRap } = useSelector(
    (state) => state.heThongRapReducer
  );

  useEffect(() => {
    dispatch(getListNguoiDung());
    dispatch(getListPhim());
    dispatch(getHeThongRap());
    //eslint-disable-next-line
  }, []);

  const firstColor = "#4e73df";
  const secondColor = "#1cc88a";
  const thirdColor = "#36b9cc";
  const fourthColor = "#f6c23e";

  return (
    <div className="first-list">
      <Row>
        <Col xs={6} lg={3}>
          <Card style={{ borderLeft: `3px solid ${firstColor}` }}>
            <Card.Body className="d-flex">
              <div className="card-content">
                <p style={{ color: `${firstColor}` }}>User</p>
                <p>{danhSachNguoiDung.length}</p>
              </div>
              <i className="fa fa-user"></i>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} lg={3}>
          <Card style={{ borderLeft: `3px solid ${secondColor}` }}>
            <Card.Body className="d-flex">
              <div className="card-content">
                <p style={{ color: `${secondColor}` }}>Phim</p>
                <p>{danhSachPhim.length}</p>
              </div>
              <i className="fa fa-film"></i>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} lg={3}>
          <Card style={{ borderLeft: `3px solid ${thirdColor}` }}>
            <Card.Body className="d-flex">
              <div className="card-content">
                <p style={{ color: `${thirdColor}` }}>Rạp</p>
                <p>{danhSachHeThongRap.length}</p>
              </div>
              <i className="fa fa-star"></i>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} lg={3}>
          <Card style={{ borderLeft: `3px solid ${fourthColor}` }}>
            <Card.Body className="d-flex">
              <div className="card-content">
                <p style={{ color: `${fourthColor}` }}>Like</p>
                <p>300</p>
              </div>
              <i className="fa fa-thumbs-up"></i>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
