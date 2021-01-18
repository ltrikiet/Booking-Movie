import React from "react";
import * as RBootstrap from "react-bootstrap";
export default function Mobile() {
  return (
    <div
      className="mobile"
      id="ungdung"
      style={{ backgroundImage: `url("img/backapp.jpg")` }}
    >
      <RBootstrap.Container>
        <RBootstrap.Row>
          <RBootstrap.Col md={6} className="mobile-content">
            <p className="mobile-title">
              Ứng dụng tiện lợi dành cho người yêu điện ảnh
            </p>
            <p className="mobile-info">
              Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và
              đổi quà hấp dẫn.
            </p>
            <RBootstrap.Button className="btn-download">
              App miễn phí - Tải về ngay
            </RBootstrap.Button>
            <p className="mobile-download">
              Tix có hai phiên bản <a href="#ios">iOS</a> &{" "}
              <a href="#android">Android</a>
            </p>
          </RBootstrap.Col>
          <RBootstrap.Col md={6} className="mobile-simulator">
            <img
              className="mobile-background"
              src="./img/mobile.png"
              alt="mobile-background"
            />
            <RBootstrap.Carousel
              controls={false}
              indicators={false}
              interval={2000}
              pause={false}
              className="mobile-slide"
            >
              <RBootstrap.Carousel.Item>
                <img
                  className="d-block w-100"
                  src="./img/slide10.jpg"
                  alt="First slide"
                />
              </RBootstrap.Carousel.Item>
              <RBootstrap.Carousel.Item>
                <img
                  className="d-block w-100"
                  src="./img/slide11.jpg"
                  alt="Third slide"
                />
              </RBootstrap.Carousel.Item>
              <RBootstrap.Carousel.Item>
                <img
                  className="d-block w-100"
                  src="./img/slide13.jpg"
                  alt="Third slide"
                />
              </RBootstrap.Carousel.Item>
            </RBootstrap.Carousel>
          </RBootstrap.Col>
        </RBootstrap.Row>
      </RBootstrap.Container>
    </div>
  );
}
