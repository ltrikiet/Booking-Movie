import React from "react";

export default function CinemaLocalItem(props) {
  return (
    <React.Fragment>
      <img
        className="cinema-img"
        src="./img/cgv-pearl-plaza-15380174196813.jpg"
        alt="cinema-img"
      />
      <div className="cinema-info">
        <p className="cinema-name">
          <span>{props.tenCumRap.substr(0, props.tenCumRap.indexOf("-"))}</span>{" "}
          - {props.tenCumRap.substr(props.tenCumRap.indexOf("-") + 1)}
        </p>
        <p className="cinema-local">{props.diaChi}</p>
      </div>
    </React.Fragment>
  );
}
