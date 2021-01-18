import React, { useState } from "react";
import * as RBootstrap from "react-bootstrap";
import MovieModal from "../MovieModal/MovieModal";

export default function ItemCarousel(props) {
  const { history } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOnClick = (maPhim) => {
    history.push(`/detail/${maPhim}`);
  };

  return (
    <React.Fragment>
      <img
        className="movie-carousel-img d-block w-100"
        src={props.hinhAnh}
        alt="slide"
        onError={(evt) => {
          evt.target.src = "./img/error404.jpg";
        }}
        onClick={() => {
          handleOnClick(props.maPhim);
        }}
      />

      <div className="movie-trailer">
        <RBootstrap.Button variant="primary" onClick={handleShow}>
          <img src="./img/play-video.png" alt="play-button" />
        </RBootstrap.Button>
      </div>
      <MovieModal
        handleShow={handleShow}
        handleClose={handleClose}
        show={show}
        trailer={props.trailer}
      />
    </React.Fragment>
  );
}
