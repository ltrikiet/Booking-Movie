import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getListPhim } from "../../../../redux/actions/lichChieuPhimActions";
import * as RBootstrap from "react-bootstrap";
import MovieShowcaseItem from "./MovieShowcaseItem";

export default function MovieShowcaseCarousel(props) {
  const { history } = props;
  const { danhSachPhim, loading, error } = useSelector(
    (state) => state.lichChieuPhimReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListPhim());
    // eslint-disable-next-line
  }, []);

  // Convert lại dữ liệu
  var listItem = {};
  for (let i = 0; i < danhSachPhim.length; i += 8) {
    let item = [];
    for (let j = i - 8; j < i; j++) {
      if (danhSachPhim[j + 8] !== undefined) {
        item.push(danhSachPhim[j + 8]);
      }
    }
    listItem[i / 8 + 1] = item;
  }

  // Set dữ liệu show ra màn hình
  var listShow = [];
  for (const index in listItem) {
    listShow.push(
      <RBootstrap.Carousel.Item key={index}>
        <RBootstrap.Row>
          {listItem[index].map((item) => {
            return (
              <MovieShowcaseItem
                {...item}
                key={item.maPhim}
                history={history}
              />
            );
          })}
        </RBootstrap.Row>
      </RBootstrap.Carousel.Item>
    );
  }

  if (error) {
    return <p>error</p>;
  }
  return (
    <React.Fragment>
      {loading ? (
        <RBootstrap.Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </RBootstrap.Spinner>
      ) : (
        <RBootstrap.Carousel
          interval={900000000}
          indicators={false}
          nextIcon={<i className="fa fa-chevron-right"></i>}
          prevIcon={<i className="fa fa-chevron-left"></i>}
        >
          {listShow}
        </RBootstrap.Carousel>
      )}
    </React.Fragment>
  );
}
