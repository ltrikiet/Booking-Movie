import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminTemplate from "../AdminTemplate";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = (props) => {
  const { component: Component, ...rest } = props;
  const { userInfo } = useSelector((state) => state.authReducer);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (userInfo.length === 0) {
    return <Redirect to="/login"></Redirect>;
  }
  if (userInfo.maLoaiNguoiDung !== "QuanTri") {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <Route
      {...rest}
      render={(routerProps) => {
        return (
          <AdminTemplate windowSize={windowSize}>
            <Component {...routerProps} windowSize={windowSize} />
          </AdminTemplate>
        );
      }}
    />
  );
};

export default AdminRoute;
