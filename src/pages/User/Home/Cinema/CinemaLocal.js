import React from "react";
import * as RBootstrap from "react-bootstrap";
import CinemaLocalItem from "./CinemaLocalItem";
import CinemaMovie from "./CinemaMovie";

export default function CinemaLocal(props) {
  var listPhim = [];
  return (
    <RBootstrap.Tab.Container id="left-tabs-example" defaultActiveKey={0}>
      <RBootstrap.Row>
        <RBootstrap.Col sm={4} className="cinema-content">
          <RBootstrap.Nav variant="pills" className="flex-column">
            {props.danhSachRap[0].lstCumRap.map((item, index) => {
              listPhim.push(item);
              return (
                <RBootstrap.Nav.Item key={index}>
                  <RBootstrap.Nav.Link eventKey={index}>
                    <CinemaLocalItem
                      tenCumRap={item.tenCumRap}
                      diaChi={item.diaChi}
                    />
                  </RBootstrap.Nav.Link>
                </RBootstrap.Nav.Item>
              );
            })}
          </RBootstrap.Nav>
        </RBootstrap.Col>
        <RBootstrap.Col sm={8} className="movie-content">
          <RBootstrap.Tab.Content>
            {listPhim.map((item, index) => {
              return (
                <RBootstrap.Tab.Pane eventKey={index} key={index}>
                  {item.danhSachPhim.map((item, index) => {
                    return <CinemaMovie {...item} key={index} />;
                  })}
                </RBootstrap.Tab.Pane>
              );
            })}
          </RBootstrap.Tab.Content>
        </RBootstrap.Col>
      </RBootstrap.Row>
    </RBootstrap.Tab.Container>
  );
}
