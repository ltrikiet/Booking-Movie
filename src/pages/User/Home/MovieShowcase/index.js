import React from "react";
import * as RBootstrap from "react-bootstrap";
import MovieShowcaseCarousel from "./MovieShowcaseCarousel";

export default function MovieShowcase(props) {
  const { history } = props;
  return (
    <div className="movie-showcase" id="lichchieu">
      <RBootstrap.Container>
        <RBootstrap.Tabs
          defaultActiveKey="dang-chieu"
          id="uncontrolled-tab-example"
        >
          <RBootstrap.Tab eventKey="dang-chieu" title="Đang chiếu">
            <MovieShowcaseCarousel history={history} />
          </RBootstrap.Tab>
          <RBootstrap.Tab eventKey="sap-chieu" title="Sắp chiếu">
            <MovieShowcaseCarousel history={history} />
          </RBootstrap.Tab>
        </RBootstrap.Tabs>
      </RBootstrap.Container>
    </div>
  );
}
