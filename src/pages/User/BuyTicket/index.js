import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Redirect, Link } from "react-router-dom";
import { Button, Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { getPhongVe, postDatVe } from "../../../redux/actions/phongVeActions";
import Swal from "sweetalert2";

export default function BuyTicket() {
  const [alert, setAlert] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { maLichChieu } = useParams();
  const [gheDaChon, setGheDaChon] = useState([]);
  const { userInfo } = useSelector((state) => state.authReducer);
  const { danhSachPhongVe, loading, error } = useSelector(
    (state) => state.phongVeReducer
  );
  const { dataDatVe } = useSelector((state) => state.datVeReducer);

  useEffect(() => {
    dispatch(getPhongVe(maLichChieu));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (alert) {
      if (dataDatVe === "Đặt vé thành công!") {
        Swal.fire({
          icon: "success",
          title: "Mua vé",
          text: "Mua vé thành công",
        }).then((result) => {
          console.log(result);
          if (result.isConfirmed || result.isDismissed) {
            history.push("/");
            window.location.reload();
          }
        });
      }
    }
    setAlert(false);
    // eslint-disable-next-line
  }, [dataDatVe]);

  if (loading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>Error</p>;
  }
  if (userInfo.length === 0) {
    return <Redirect to="/login"></Redirect>;
  }

  const handleOnClick = (item, index, type) => {
    switch (type) {
      case "chonGhe": {
        setGheDaChon([...gheDaChon, item]);
        danhSachPhongVe.danhSachGhe[index] = { ...item, isActive: true };
        break;
      }
      case "huyGhe": {
        setGheDaChon(
          gheDaChon.filter((itemList) => itemList.tenGhe !== item.tenGhe)
        );
        danhSachPhongVe.danhSachGhe[index] = { ...item, isActive: false };
        break;
      }
      default:
        break;
    }
  };

  const handleOnClickDatVe = () => {
    let data = {};
    data["maLichChieu"] = danhSachPhongVe.thongTinPhim.maLichChieu;
    let arrayDanhSachVe = [];
    gheDaChon.map((item) => {
      let arrayItem = {};
      arrayItem["maGhe"] = item.maGhe;
      arrayItem["giaVe"] = item.giaVe;
      arrayDanhSachVe.push(arrayItem);
      return null;
    });
    data["danhSachVe"] = arrayDanhSachVe;
    data["taiKhoanNguoiDung"] = userInfo.taiKhoan;
    dispatch(postDatVe(data));
    setAlert(true);
  };

  return (
    <div className="phong-ve-screen">
      <Container fluid>
        <Row>
          <Col md={8} className="p-0 left">
            <header>
              <Navbar bg="light">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                  <Nav className="justify-content-lg-around w-100">
                    <li
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                      onClick={() => history.goBack()}
                    >
                      <i className="fa fa-arrow-left"></i>
                      <span className="ml-2">Trở về</span>
                    </li>
                    <Link className="ml-auto nav-link" to="/profile">
                      Người dùng: {userInfo.hoTen}
                    </Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </header>
            <div className="chon-ve">
              <div className="cinema-screen-simulator">
                <div className="screen"></div>
                <p>Màn hình</p>
              </div>
              <div className="chon-ve-content">
                {danhSachPhongVe.danhSachGhe?.map((item, index) => {
                  if (item.taiKhoanNguoiDat === null) {
                    if (item.isActive === true) {
                      return (
                        <Button
                          key={index}
                          variant="success"
                          onClick={() => handleOnClick(item, index, "huyGhe")}
                        >
                          {item.tenGhe}
                        </Button>
                      );
                    } else {
                      if (item.loaiGhe === "Vip") {
                        return (
                          <Button
                            key={index}
                            variant="warning"
                            onClick={() =>
                              handleOnClick(item, index, "chonGhe")
                            }
                          >
                            {item.tenGhe}
                          </Button>
                        );
                      } else {
                        return (
                          <Button
                            key={index}
                            onClick={() =>
                              handleOnClick(item, index, "chonGhe")
                            }
                          >
                            {item.tenGhe}
                          </Button>
                        );
                      }
                    }
                  } else {
                    return (
                      <Button key={index} variant="light" disabled>
                        X
                      </Button>
                    );
                  }
                })}
              </div>
              <div className="chair-info">
                <Row>
                  <Col
                    xs={3}
                    className="d-flex align-items-center justify-content-center my-2 p-0"
                  >
                    <Button variant="light" disabled>
                      <span>x</span>
                    </Button>
                    <p>Ghế đã đặt</p>
                  </Col>
                  <Col
                    xs={3}
                    className="d-flex align-items-center justify-content-center my-2 p-0"
                  >
                    <Button variant="warning" disabled></Button>
                    <p>Ghế Vip</p>
                  </Col>
                  <Col
                    xs={3}
                    className="d-flex align-items-center justify-content-center my-2 p-0"
                  >
                    <Button variant="success" disabled></Button>
                    <p>Ghế đang chọn</p>
                  </Col>
                  <Col
                    xs={3}
                    className="d-flex align-items-center justify-content-center my-2 p-0"
                  >
                    <Button variant="primary" disabled></Button>
                    <p>Ghế thường</p>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col md={4} className="p-0 right">
            <Container fluid>
              <h4 className="text-center">Thông tin</h4>
              <hr />
              <div className="cinema-info">
                <p>
                  <span>Địa chỉ:</span> {danhSachPhongVe.thongTinPhim?.diaChi}
                </p>
                <p>
                  <span>Giờ chiếu:</span>{" "}
                  {danhSachPhongVe.thongTinPhim?.gioChieu},{" "}
                  {danhSachPhongVe.thongTinPhim?.ngayChieu}
                </p>
                <p>
                  <span>Rạp:</span> {danhSachPhongVe.thongTinPhim?.tenCumRap}
                </p>
              </div>
              <hr />
              <div className="movie-info">
                <h5 className="text-center">
                  {danhSachPhongVe.thongTinPhim?.tenPhim}
                </h5>
                <div className="movie-img">
                  <i className="fa fa-caret-right"></i>
                  <i className="fa fa-caret-right"></i>
                  <i className="fa fa-caret-right"></i>
                  <img
                    src={danhSachPhongVe.thongTinPhim?.hinhAnh}
                    onError={(evt) => {
                      evt.target.src = "/img/error404.jpg";
                    }}
                    alt="movie"
                  />
                  <i className="fa fa-caret-left"></i>
                  <i className="fa fa-caret-left"></i>
                  <i className="fa fa-caret-left"></i>
                </div>
              </div>
              <hr />
              <div className="buy-ticket-info">
                <Row>
                  <Col md={7}>
                    <div className="ghe-info">
                      <p>Ghế</p>
                      <p>
                        {gheDaChon.length !== 0 ? (
                          <React.Fragment>
                            [
                            {gheDaChon.map((item, index) => {
                              return (
                                <span className="m-1" key={index}>
                                  {item.tenGhe}
                                </span>
                              );
                            })}
                            ]
                          </React.Fragment>
                        ) : (
                          <React.Fragment></React.Fragment>
                        )}
                      </p>
                    </div>
                  </Col>
                  <Col md={5} className="p-0">
                    <p className="gia-tien-info">
                      {gheDaChon
                        .reduce((acc, currValue) => {
                          return acc + currValue.giaVe;
                        }, 0)
                        .toLocaleString()}{" "}
                      VNĐ
                    </p>
                  </Col>
                </Row>
              </div>
              <Button
                className="btn-muave"
                variant={gheDaChon.length === 0 ? "secondary" : "success"}
                disabled={gheDaChon.length === 0 ? true : false}
                onClick={() => handleOnClickDatVe()}
              >
                Mua vé
              </Button>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
