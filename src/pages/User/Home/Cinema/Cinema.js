import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as RBootstrap from "react-bootstrap";
import CinemaLocal from "./CinemaLocal";
import { getHeThongRap } from "../../../../redux/actions/heThongRapActions";
import { getListRap } from "../../../../redux/actions/rapActions";

export default function Cinema() {
  const {
    danhSachHeThongRap,
    loading: loadingHeThongRap,
    error: errorHeThongRap,
  } = useSelector((state) => state.heThongRapReducer);
  const {
    danhSachRap,
    // , loading: loadingRap
    // , error: errorRap
  } = useSelector((state) => state.rapReducer);

  //Rạp
  var heThongFirst;
  if (danhSachHeThongRap.length !== 0) {
    heThongFirst = danhSachHeThongRap[0].maHeThongRap;
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHeThongRap());
    dispatch(getListRap("BHDSTAR"));
    // eslint-disable-next-line
  }, []);

  const handleOnClick = (maRap) => {
    dispatch(getListRap(maRap));
  };

  if (errorHeThongRap) {
    return <p>error</p>;
  }
  return (
    <div className="cinema d-none d-md-block" id="cumrap">
      <RBootstrap.Container>
        {loadingHeThongRap ? (
          <RBootstrap.Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </RBootstrap.Spinner>
        ) : (
          <RBootstrap.Tab.Container
            id="left-tabs-example"
            defaultActiveKey={heThongFirst}
          >
            <RBootstrap.Row className="px-3">
              <RBootstrap.Col md={1} className="cinema-logo">
                <RBootstrap.Nav variant="pills" className="flex-column">
                  {danhSachHeThongRap.map((item, index) => {
                    return (
                      <RBootstrap.Nav.Item
                        key={index}
                        onClick={() => handleOnClick(item.maHeThongRap)}
                      >
                        <RBootstrap.Nav.Link eventKey={item.maHeThongRap}>
                          <img src={item.logo} alt={item.biDanh} />
                        </RBootstrap.Nav.Link>
                      </RBootstrap.Nav.Item>
                    );
                  })}
                </RBootstrap.Nav>
              </RBootstrap.Col>
              <RBootstrap.Col md={11} className="cinema-company-content">
                <RBootstrap.Tab.Content>
                  {danhSachRap.map((item, index) => {
                    return (
                      <RBootstrap.Tab.Pane
                        key={index}
                        eventKey={item.maHeThongRap}
                      >
                        <CinemaLocal danhSachRap={danhSachRap} />
                      </RBootstrap.Tab.Pane>
                    );
                  })}
                </RBootstrap.Tab.Content>
              </RBootstrap.Col>
            </RBootstrap.Row>
          </RBootstrap.Tab.Container>
        )}
      </RBootstrap.Container>
    </div>
  );
}
