import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as RBootstrap from "react-bootstrap";
import { getListCarousel } from "../../../../redux/actions/carouselActions";
import ItemCarousel from "./ItemCarousel";

export default function Carousel(props) {
  const { history } = props;
  const { danhSachCarousel, loading, error } = useSelector(
    (state) => state.carouselReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListCarousel());
    // eslint-disable-next-line
  }, []);

  if (error) {
    return <p>error</p>;
  }

  return (
    <div className="home-carousel" id="home-carousel">
      <RBootstrap.Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </RBootstrap.Spinner>
      {loading ? (
        <RBootstrap.Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </RBootstrap.Spinner>
      ) : (
        <RBootstrap.Carousel
          nextIcon={<i className="fa fa-chevron-right"></i>}
          prevIcon={<i className="fa fa-chevron-left"></i>}
        >
          {danhSachCarousel.map((item) => {
            return (
              <RBootstrap.Carousel.Item key={item.maPhim}>
                <ItemCarousel {...item} history={history} />
              </RBootstrap.Carousel.Item>
            );
          })}
        </RBootstrap.Carousel>
      )}
    </div>
  );
}
