import React, { useState } from "react";
import Moment from "moment";
import { Row, Col, Button } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import MovieModal from "../Home/MovieModal/MovieModal";

export default function TopDetail(props) {
  const { noiDung, windowSize } = props;
  const [showTrailer, setShowTrailer] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //Tính số sao
  const listStar = [];
  let star;
  if (noiDung.danhGia % 2 !== 0) {
    star = (noiDung.danhGia - 1) / 2;
  } else {
    star = noiDung.danhGia / 2;
  }
  for (let i = 0; i < star; i++) {
    listStar.push(<img src="/img/star1.png" alt="star" key={i} />);
  }
  if (noiDung.danhGia % 2 !== 0) {
    listStar.push(<img src="/img/star1.2.png" alt="star" key={5} />);
  }
  return (
    <React.Fragment>
      {windowSize.width > 576 ? (
        <Row className="movie-top">
          <Col sm={8} className="left">
            <div className="movie-img">
              <img
                src={noiDung.hinhAnh}
                alt="movie-img"
                onError={(evt) => {
                  evt.target.src = "/img/error404.jpg";
                }}
              />
              <Button
                className="movie-trailer"
                variant="primary"
                onClick={handleShow}
              >
                <img src="/img/play-video.png" alt="btn-play" />
              </Button>
              <MovieModal
                handleShow={handleShow}
                handleClose={handleClose}
                show={show}
                trailer={noiDung.trailer}
              />
            </div>
            <div className="movie-info">
              <p className="movie-premiere-time">
                {Moment(noiDung.ngayKhoiChieu).format("DD.MM.yyyy")}
              </p>
              <p className="movie-name">
                <span>C16</span>
                {noiDung.tenPhim}
              </p>
              <p className="movie-raiting">103 phút - {noiDung.danhGia} IMDb</p>

              {/* <RBootstrap.Button className="btn-muave">Mua vé</RBootstrap.Button> */}
            </div>
          </Col>
          <Col sm={4} className="right">
            <CircularProgressbar
              className="percent-circle"
              value={noiDung.danhGia * 10}
              text={noiDung.danhGia}
              strokeWidth={7}
              background
              styles={buildStyles({
                backgroundColor: "rgba(0,0,0,.4)",
                strokeLinecap: "butt",
                textSize: "50px",
                textColor: "white",
                pathColor: "#7ed321",
                trailColor: "#3a3a3a",
              })}
            />
            <div className="movie-star">{listStar}</div>
          </Col>
        </Row>
      ) : (
        <div className="movie-top-small-screen">
          <div className="movie-img-content">
            {showTrailer ? (
              <iframe
                title="movie-trailer"
                width="100%"
                height="200px"
                src={noiDung.trailer}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <React.Fragment>
                <img
                  className="movie-img"
                  src={noiDung.hinhAnh}
                  alt="movie-img"
                />
                <div className="movie-rank">
                  <p className="movie-point">{noiDung.danhGia}</p>
                  <div className="review-star">{listStar}</div>
                </div>
                <Button
                  className="movie-trailer"
                  variant="primary"
                  onClick={() => setShowTrailer(true)}
                >
                  <img src="/img/play-video.png" alt="btn-play" />
                </Button>
                <div className="overlay-blur-effect"></div>
              </React.Fragment>
            )}
          </div>
          <div className="movie-info">
            <p className="movie-showtime">
              {Moment(noiDung.ngayKhoiChieu).format("DD.MM.yyyy")}
            </p>
            <p className="movie-name">{noiDung.tenPhim}</p>
            <p className="movie-points">103 phút - {noiDung.danhGia} IMDb</p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
