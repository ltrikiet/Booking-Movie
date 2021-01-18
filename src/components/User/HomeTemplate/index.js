import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";

export default function HomeTemplate(props) {
  const [loading, setLoading] = useState(true);

  const timer = () => setTimeout(() => setLoading(false), 2000);

  useEffect(() => {
    timer();
  }, []);

  useEffect(() => {
    setLoading(true);
    timer();
  }, [props.children.props.location.pathname]);

  return (
    <React.Fragment>
      <Header />
      {props.children}
      <Footer />

      {loading ? (
        <div className="loader">
          <img className="header-logo" src="/img/web-logo.png" alt="web-logo" />
        </div>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
}
