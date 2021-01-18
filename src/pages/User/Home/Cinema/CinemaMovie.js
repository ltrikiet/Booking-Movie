import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import moment from "moment";

export default function CinemaMovie(props) {
  const history = useHistory();
  const handleOnClick = (maLichChieu) => {
    history.push(`/dat-ve/${maLichChieu}`);
  };

  return (
    <div className="cinema-movie">
      <div className="cinema-movie-content">
        <img
          className="movie-img"
          src={props.hinhAnh}
          alt="movie-img"
          onError={(evt) => {
            evt.target.src = "./img/error404.jpg";
          }}
        />
        <div className="movie-info">
          <p className="movie-name">
            {/* <span>C18</span>Cá Sấu Tử Thần - Black Water: Abyss - */}
            {props.tenPhim}
          </p>
          <p className="movie-times">100 phút - TIX 6.5 - IMDb 0</p>
        </div>
      </div>
      <div className="movie-version">
        <p>2D Digital</p>
      </div>
      <div className="movie-checkin">
        {props.lstLichChieuTheoPhim.slice(0, 15).map((item, index) => {
          return (
            <Button key={index} onClick={() => handleOnClick(item.maLichChieu)}>
              <span>{moment(item.ngayChieuGioChieu).format("DD/MM/YYYY")}</span>{" "}
              ~ {moment(item.ngayChieuGioChieu).format("HH:mm")}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
