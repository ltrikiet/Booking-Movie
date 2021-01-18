import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as RBootstrap from "react-bootstrap";
import { getPhimDetail } from "../../../redux/actions/phimDetailActions";
import BottomDetail from "./BottomDetail";
import TopDetail from "./TopDetail";

export default function Detail(props) {
  const { match } = props;
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { noiDung, loading, error } = useSelector(
    (state) => state.phimDetailReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPhimDetail(match.params.maPhim));
    //eslint-disable-next-line
  }, []);

  if (error) {
    return <p>error</p>;
  }
  return (
    <div className="detail">
      {loading ? (
        <RBootstrap.Spinner animation="border" role="status" variant="light">
          <span className="sr-only">Loading...</span>
        </RBootstrap.Spinner>
      ) : (
        <React.Fragment>
          {windowSize.width > 576 ? (
            <div
              className="detail-background"
              style={{
                backgroundImage: `url(${noiDung.hinhAnh})`,
              }}
            ></div>
          ) : (
            <React.Fragment></React.Fragment>
          )}
          {windowSize.width < 768 ? (
            <TopDetail noiDung={noiDung} windowSize={windowSize} />
          ) : (
            <React.Fragment></React.Fragment>
          )}
          <RBootstrap.Container>
            {windowSize.width > 768 ? (
              <TopDetail noiDung={noiDung} windowSize={windowSize} />
            ) : (
              <React.Fragment></React.Fragment>
            )}
            <BottomDetail noiDung={noiDung} windowSize={windowSize} />
          </RBootstrap.Container>
        </React.Fragment>
      )}
    </div>
  );
}
