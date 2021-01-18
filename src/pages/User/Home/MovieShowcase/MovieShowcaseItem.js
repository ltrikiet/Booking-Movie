import React, { useState } from "react";
import { Col, Button } from "react-bootstrap";
import MovieModal from "../MovieModal/MovieModal";
export default function MovieShowcaseItem(props) {
  const { history } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Tính số sao
  const listStar = [];
  let star;
  if (props.danhGia % 2 !== 0) {
    star = (props.danhGia - 1) / 2;
  } else {
    star = props.danhGia / 2;
  }
  for (let i = 0; i < star; i++) {
    listStar.push(<img src="./img/star1.png" alt="star" key={i} />);
  }
  if (props.danhGia % 2 !== 0) {
    listStar.push(<img src="./img/star1.2.png" alt="star" key={5} />);
  }
  return (
    <Col xs={6} md={3}>
      <div className="movie">
        <div className="movie-type">
          <img src="./img/film_type_1.png" alt="movie-type" />
        </div>
        <div className="movie-img-content">
          <div className="movie-rank">
            <p className="movie-point">{props.danhGia}</p>
            <div className="review-star">{listStar}</div>
          </div>
          <div className="movie-img">
            <img
              src={props.hinhAnh}
              alt="movie-img"
              onError={(evt) => {
                evt.target.src = "img/error404.jpg";
              }}
            />
          </div>
          <div className="movie-trailer">
            <Button variant="primary" onClick={handleShow}>
              <img src="./img/play-video.png" alt="btn-play" />
            </Button>
            <MovieModal
              handleShow={handleShow}
              handleClose={handleClose}
              show={show}
              trailer={props.trailer}
            />
          </div>
          <div
            className="movie-img-overlay"
            onClick={() => history.push(`/detail/${props.maPhim}`)}
          ></div>
        </div>
        <div className="movie-info-content">
          <p className="movie-name">
            <span>C16</span>
            {props.tenPhim}
          </p>
          <p className="movie-time">100 phút - {props.danhGia} TIX</p>
          <button
            className="btn btn-muave"
            onClick={() => history.push(`/detail/${props.maPhim}`)}
          >
            MUA VÉ
          </button>
        </div>
      </div>
    </Col>
  );
}
