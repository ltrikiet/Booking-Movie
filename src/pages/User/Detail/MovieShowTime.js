import React from "react";
import { useSelector } from "react-redux";
import {
  Tab,
  Nav,
  Col,
  Row,
  Card,
  Tabs,
  Button,
  Accordion,
} from "react-bootstrap";
import Moment from "moment";
import { useHistory } from "react-router-dom";

export default function MovieShowTime(props) {
  const history = useHistory();
  const { noiDung, windowSize } = props;

  const { danhSachHeThongRap } = useSelector(
    (state) => state.heThongRapReducer
  );
  const { userInfo } = useSelector((state) => state.authReducer);

  const handleOnClick = (maLichChieu) => {
    if (userInfo.length !== 0) {
      history.push(`/dat-ve/${maLichChieu}`);
    } else {
      history.push("/login");
    }
  };

  var rapPhim = [];
  for (let i = 0; danhSachHeThongRap?.length > i; i++) {
    let item = {};
    item["maHeThongRap"] = danhSachHeThongRap[i].maHeThongRap;
    item["logoRap"] = danhSachHeThongRap[i].logo;
    let allThongTin = noiDung?.lichChieu?.filter((item) => {
      return (
        item.thongTinRap.maHeThongRap === danhSachHeThongRap[i].maHeThongRap
      );
    });

    let allNgayChieu = [];
    let allRapChieu = [];

    if (allThongTin !== undefined) {
      allThongTin.map((item) => {
        if (
          !allNgayChieu.includes(
            Moment(item.ngayChieuGioChieu).format("DD/MM/YYYY")
          )
        ) {
          allNgayChieu.push(
            Moment(item.ngayChieuGioChieu).format("DD/MM/YYYY")
          );
        }

        if (
          allRapChieu.find(
            (itemFind) => itemFind.maCumRap === item.thongTinRap.maCumRap
          ) === undefined
        ) {
          let itemRapChieu = {};
          itemRapChieu["maCumRap"] = item.thongTinRap.maCumRap;
          itemRapChieu["tenCumRap"] = item.thongTinRap.tenCumRap;
          allRapChieu.push(itemRapChieu);
        }
        return null;
      });

      let itemArrayNgayChieu = [];
      allNgayChieu.map((itemNgayChieu) => {
        let objectNgayChieu = {};
        objectNgayChieu["ngay"] = itemNgayChieu;
        let arrayRapChieu = [];
        allRapChieu.map((itemRapChieu) => {
          let arrayThongTin = [];
          let objectRapChieu = {};
          objectRapChieu["maRapChieu"] = itemRapChieu.maCumRap;
          objectRapChieu["tenRapChieu"] = itemRapChieu.tenCumRap;
          allThongTin.map((itemThongTin) => {
            if (
              itemNgayChieu ===
                Moment(itemThongTin.ngayChieuGioChieu).format("DD/MM/YYYY") &&
              itemRapChieu.maCumRap === itemThongTin.thongTinRap.maCumRap
            ) {
              arrayThongTin.push(itemThongTin);
            }
            return null;
          });
          objectRapChieu["thongTinChieu"] = arrayThongTin;
          if (objectRapChieu.thongTinChieu.length !== 0) {
            arrayRapChieu.push(objectRapChieu);
          }
          return null;
        });
        objectNgayChieu["rap"] = arrayRapChieu;
        itemArrayNgayChieu.push(objectNgayChieu);
        return null;
      });
      item["ngayChieu"] = itemArrayNgayChieu;
      rapPhim.push(item);
    }
  }

  return (
    <React.Fragment>
      {windowSize.width > 768 ? (
        <Card body>
          <Tab.Container defaultActiveKey="0">
            <Row>
              <Col md={3} className="left">
                <Nav variant="pills" className="flex-column">
                  {rapPhim?.map((item, index) => {
                    return (
                      <Nav.Item key={index}>
                        <Nav.Link
                          className="d-flex align-items-center"
                          eventKey={index}
                        >
                          <img src={item.logoRap} alt="rap-logo" />
                          <span className="ml-3">{item.maHeThongRap}</span>
                        </Nav.Link>
                        <hr style={{ margin: "10px auto", width: "80%" }} />
                      </Nav.Item>
                    );
                  })}
                </Nav>
              </Col>
              <Col md={9} className="right">
                <Tab.Content>
                  {rapPhim?.map((item, index) => {
                    return (
                      <Tab.Pane
                        eventKey={index}
                        className="text-dark"
                        key={index}
                      >
                        <Tabs defaultActiveKey={0}>
                          {item.ngayChieu.map((item, index) => {
                            return (
                              <Tab
                                className="rap-chieu-content"
                                eventKey={index}
                                title={item.ngay}
                                key={index}
                              >
                                <hr className="mt-0" />
                                {item.rap.map((item, index) => {
                                  return (
                                    <React.Fragment key={index}>
                                      <div className="rap-chieu-info">
                                        <div className="rap-chieu-name-img">
                                          <img
                                            className="rap-chieu-img"
                                            src="/img/cgv-pearl-plaza-15380174196813.jpg"
                                            alt="rap-phim"
                                          />
                                          <p className="rap-chieu-ten">
                                            <span>
                                              {item.tenRapChieu.substr(
                                                0,
                                                item.tenRapChieu.indexOf("-")
                                              )}
                                            </span>{" "}
                                            -{" "}
                                            {item.tenRapChieu.substr(
                                              item.tenRapChieu.indexOf("-") + 1
                                            )}
                                          </p>
                                        </div>
                                        <p className="phim-version">
                                          2D Digital
                                        </p>
                                      </div>
                                      <div className="rap-chieu-time">
                                        {item.thongTinChieu.map(
                                          (item, index) => {
                                            return (
                                              <Button
                                                key={index}
                                                onClick={() =>
                                                  handleOnClick(
                                                    item.maLichChieu
                                                  )
                                                }
                                              >
                                                <span>
                                                  {Moment(
                                                    item.ngayChieuGioChieu
                                                  ).format("HH:mm")}
                                                </span>{" "}
                                                ~{" "}
                                                {Moment(item.ngayChieuGioChieu)
                                                  .add(
                                                    item.thoiLuong,
                                                    "minutes"
                                                  )
                                                  .format("HH:mm")}
                                              </Button>
                                            );
                                          }
                                        )}
                                      </div>
                                      <hr />
                                    </React.Fragment>
                                  );
                                })}
                              </Tab>
                            );
                          })}
                        </Tabs>
                      </Tab.Pane>
                    );
                  })}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Card>
      ) : (
        <Accordion className="text-dark">
          {rapPhim.map((item, index) => {
            index = index + 1;
            return (
              <Card key={index}>
                <Card.Header>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey={index}
                    className="w-100 text-left"
                  >
                    <img src={item.logoRap} alt="logo-rap" />
                    <span className="ml-2">{item.maHeThongRap}</span>
                  </Accordion.Toggle>
                  <i className="fa fa-angle-right"></i>
                </Card.Header>
                <Accordion.Collapse eventKey={index}>
                  <Card.Body>
                    <Tabs defaultActiveKey={0}>
                      {item.ngayChieu.map((item, index) => {
                        return (
                          <Tab
                            key={index}
                            eventKey={index}
                            title={item.ngay}
                            className="mt-4"
                          >
                            {item.rap.map((item, index) => {
                              return (
                                <React.Fragment key={index}>
                                  <div className="rap-chieu-info">
                                    <div className="rap-chieu-name-img">
                                      <img
                                        className="rap-chieu-img"
                                        src="/img/cgv-pearl-plaza-15380174196813.jpg"
                                        alt="rap-phim"
                                      />
                                      <p className="rap-chieu-ten">
                                        <span>
                                          {item.tenRapChieu.substr(
                                            0,
                                            item.tenRapChieu.indexOf("-")
                                          )}
                                        </span>{" "}
                                        -{" "}
                                        {item.tenRapChieu.substr(
                                          item.tenRapChieu.indexOf("-") + 1
                                        )}
                                      </p>
                                    </div>
                                    <p className="phim-version">2D Digital</p>
                                  </div>
                                  <div className="rap-chieu-time">
                                    {item.thongTinChieu.map((item, index) => {
                                      return (
                                        <Button
                                          key={index}
                                          onClick={() =>
                                            handleOnClick(item.maLichChieu)
                                          }
                                        >
                                          <span>
                                            {Moment(
                                              item.ngayChieuGioChieu
                                            ).format("HH:mm")}
                                          </span>{" "}
                                          ~{" "}
                                          {Moment(item.ngayChieuGioChieu)
                                            .add(item.thoiLuong, "minutes")
                                            .format("HH:mm")}
                                        </Button>
                                      );
                                    })}
                                  </div>
                                  <hr />
                                </React.Fragment>
                              );
                            })}
                          </Tab>
                        );
                      })}
                    </Tabs>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
        </Accordion>
      )}
    </React.Fragment>
  );
}
