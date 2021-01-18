import React from "react";
import Moment from "moment";
import * as RBootstrap from "react-bootstrap";
import MovieShowTime from "./MovieShowTime";

export default function BottomDetail(props) {
  const { noiDung, windowSize } = props;
  return (
    <div className="movie-bottom">
      <RBootstrap.Tabs
        defaultActiveKey="lichchieu"
        id="uncontrolled-tab-example"
        className="tab-title"
      >
        <RBootstrap.Tab
          eventKey="lichchieu"
          title="Lịch chiếu"
          className="lich-chieu-content"
        >
          <MovieShowTime noiDung={noiDung} windowSize={windowSize} />
        </RBootstrap.Tab>
        <RBootstrap.Tab
          eventKey="thongtin"
          title="Thông tin"
          className="thong-tin-content"
        >
          <RBootstrap.Row>
            <RBootstrap.Col md={6} className="left">
              <RBootstrap.Row className="thong-tin-item">
                <RBootstrap.Col className="thong-tin-head" xs={5}>
                  Ngày công chiếu
                </RBootstrap.Col>
                <RBootstrap.Col className="thong-tin-info" xs={7}>
                  {Moment(noiDung.ngayKhoiChieu).format("DD.MM.yyyy")}
                </RBootstrap.Col>
              </RBootstrap.Row>
              <RBootstrap.Row className="thong-tin-item">
                <RBootstrap.Col className="thong-tin-head" xs={5}>
                  Đạo diễn
                </RBootstrap.Col>
                <RBootstrap.Col
                  className="thong-tin-info"
                  xs={7}
                ></RBootstrap.Col>
              </RBootstrap.Row>
              <RBootstrap.Row className="thong-tin-item">
                <RBootstrap.Col className="thong-tin-head" xs={5}>
                  Diễn viên
                </RBootstrap.Col>
                <RBootstrap.Col
                  className="thong-tin-info"
                  xs={7}
                ></RBootstrap.Col>
              </RBootstrap.Row>
              <RBootstrap.Row className="thong-tin-item">
                <RBootstrap.Col className="thong-tin-head" xs={5}>
                  Thể loại
                </RBootstrap.Col>
                <RBootstrap.Col
                  className="thong-tin-info"
                  xs={7}
                ></RBootstrap.Col>
              </RBootstrap.Row>
              <RBootstrap.Row className="thong-tin-item">
                <RBootstrap.Col className="thong-tin-head" xs={5}>
                  Định dạng
                </RBootstrap.Col>
                <RBootstrap.Col
                  className="thong-tin-info"
                  xs={7}
                ></RBootstrap.Col>
              </RBootstrap.Row>
              <RBootstrap.Row className="thong-tin-item">
                <RBootstrap.Col className="thong-tin-head" xs={5}>
                  Quốc gia SX
                </RBootstrap.Col>
                <RBootstrap.Col
                  className="thong-tin-info"
                  xs={7}
                ></RBootstrap.Col>
              </RBootstrap.Row>
            </RBootstrap.Col>
            <hr className="w-100" style={{ borderTop: "2px solid white" }} />
            <RBootstrap.Col md={6} className="right">
              <p className="movie-info-head">Nội dung</p>
              <p className="movie-info-content">{noiDung.moTa}</p>
            </RBootstrap.Col>
          </RBootstrap.Row>
        </RBootstrap.Tab>
      </RBootstrap.Tabs>
    </div>
  );
}
