import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as RBootstrap from "react-bootstrap";
import { getHeThongRap } from "../../../redux/actions/heThongRapActions";

export default function Footer() {
  const dispatch = useDispatch();
  const { danhSachHeThongRap, loading, error } = useSelector(
    (state) => state.heThongRapReducer
  );
  useEffect(() => {
    dispatch(getHeThongRap());
    // eslint-disable-next-line
  }, []);

  //Convert data
  const listItem = {};
  for (let i = 0; i < danhSachHeThongRap.length; i += 5) {
    let item = [];
    for (let j = i - 5; j < i; j++) {
      if (danhSachHeThongRap[j + 5] !== undefined) {
        item.push(danhSachHeThongRap[j + 5]);
      }
    }
    listItem[i] = item;
  }

  //List rạp
  const listRap = [];
  for (const index in listItem) {
    listRap.push(
      <RBootstrap.Col md={12} key={index}>
        {listItem[index].map((item, index) => {
          return (
            <a href="#company" key={index}>
              <img
                className="company-logo"
                src={item.logo}
                alt="company-logo"
              />
            </a>
          );
        })}
      </RBootstrap.Col>
    );
  }

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error</p>;
  }
  return (
    <footer className="footer bg-dark">
      <RBootstrap.Container>
        {/* <div className="footer-top">
          <RBootstrap.Row>
            <RBootstrap.Col md={4} className="tix d-none d-md-block">
              <p className="footer-title tix-title">TIX</p>
              <div className="row tix-content">
                <RBootstrap.Col md={6}>
                  <a href="#.">FAQ</a>
                  <a href="#.">Brand Guidelines</a>
                </RBootstrap.Col>
                <RBootstrap.Col md={6}>
                  <a href="#.">Thỏa thuận sử dụng</a>
                  <a href="#.">Chính sách bảo mật</a>
                </RBootstrap.Col>
              </div>
            </RBootstrap.Col>
            <RBootstrap.Col md={4} className="company d-none d-md-block">
              <p className="footer-title">ĐỐI TÁC</p>
              <div className="row">{listRap}</div>
            </RBootstrap.Col>
            <RBootstrap.Col md={4} className="app-content">
              <div className="row">
                <RBootstrap.Col md={6} className="mobile-app text-center">
                  <p className="footer-title">MOBILE APP</p>
                  <a href="#android">
                    <img src="/img/android-logo.png" alt="android-logo" />
                  </a>
                  <a href="#apple">
                    <img src="/img/apple-logo.png" alt="apple-logo" />
                  </a>
                </RBootstrap.Col>
                <RBootstrap.Col md={6} className="social-app text-center">
                  <p className="footer-title">SOCIAL</p>
                  <a href="#facebook">
                    <img src="/img/facebook-logo.png" alt="fb-logo" />
                  </a>
                  <a href="#zalo">
                    <img src="/img/zalo-logo.png" alt="zalo-logo" />
                  </a>
                </RBootstrap.Col>
              </div>
            </RBootstrap.Col>
          </RBootstrap.Row>
        </div> */}
        <hr />
        <div className="footer-bottom">
          <div className="row">
            {/* <RBootstrap.Col md={2} className="zion">
              <img src="/img/zion-logo.jpg" alt="zion-logo" />
            </RBootstrap.Col>
            <RBootstrap.Col md={8} className="company-introduce">
              <span className="footer-title">
                TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION
              </span>
              <p>
                Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ
                Chí Minh, Việt Nam.
              </p>
              <p>Giấy chứng nhận đăng ký kinh doanh số: 0101659783,</p>
              <p>
                đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế
                hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
              </p>
              <p>Số Điện Thoại (Hotline): 1900 545 436</p>
              <p>
                Email: <a href="#email">support@tix.vn</a>
              </p>
            </RBootstrap.Col>
            <RBootstrap.Col md={2} className="bocongthuong">
              <img
                src="/img/d1e6bd560daa9e20131ea8a0f62e87f8.png"
                alt="bocongthuong-logo"
              />
            </RBootstrap.Col> */}
          </div>
          <p
            className="text-center"
            style={{ fontSize: "30px", fontWeight: "bold" }}
          >
            Website này bản thân tôi làm để học ReactJS ở Cybersoft
          </p>
        </div>
      </RBootstrap.Container>
    </footer>
  );
}
