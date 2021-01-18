import React from "react";
import { Route } from "react-router-dom";
import HomeTemplate from "../HomeTemplate";
const HomeRoute = (props) => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(routerProps) => {
        return (
          <HomeTemplate>
            <Component {...routerProps} />
          </HomeTemplate>
        );
      }}
    />
  );
};

export default HomeRoute;
