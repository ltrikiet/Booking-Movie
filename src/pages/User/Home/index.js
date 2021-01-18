import React from "react";
import Carousel from "./Carousel/Carousel";
import TicketPicker from "./TicketPicker/TicketPicker";
import MovieShowcase from "./MovieShowcase";
import Cinema from "./Cinema/Cinema";
// import News from "./News/News";
import Mobile from "./Mobile/Mobile";

export default function Home(props) {
  const { history } = props;
  return (
    <React.Fragment>
      <Carousel history={history} />
      <TicketPicker />
      <MovieShowcase history={history} />
      <Cinema />
      {/* <News /> */}
      <Mobile />
    </React.Fragment>
  );
}
