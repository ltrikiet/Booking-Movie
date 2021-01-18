import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";

export default function AdminTemplate(props) {
  const { windowSize } = props;
  const [hide, setHide] = useState(true);
  const [small, setSmall] = useState(false);

  return (
    <div className="admin-page d-flex">
      <Sidebar
        hide={hide}
        small={small}
        setHide={setHide}
        setSmall={setSmall}
        windowSize={windowSize}
      />
      <div
        className="admin-layout"
        style={
          hide && windowSize.width < 768
            ? { marginLeft: "0px" }
            : small || (windowSize.width <= 992 && windowSize.width >= 768)
            ? { marginLeft: "105px" }
            : { marginLeft: "200px" }
        }
      >
        <Header
          hide={hide}
          setHide={setHide}
          small={small}
          windowSize={windowSize}
        />
        <Container fluid className="admin-content">
          {props.children}
        </Container>
        <hr className="footer-hr" />
        <Footer />
      </div>
      {!hide && windowSize.width < 768 ? (
        <div
          onMouseDown={() => setHide(true)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: "500",
          }}
        ></div>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </div>
  );
}
