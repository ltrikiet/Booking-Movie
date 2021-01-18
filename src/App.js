import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeRoute from "./components/User/HomeRoute";
import AdminRoute from "./components/Admin/AdminRoute";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/User/Home";
import Detail from "./pages/User/Detail";
import LoginHome from "./pages/Login_Register";
import AdminHome from "./pages/Admin/Home";
import UserManager from "./pages/Admin/UserManager";
import MovieManager from "./pages/Admin/MovieManager";
import Profile from "./pages/User/Profile";
import BuyTicket from "./pages/User/BuyTicket";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <BrowserRouter>
          <Switch>
            {/* Home */}
            <HomeRoute exact path="/" component={Home} />
            <HomeRoute path="/detail/:maPhim" component={Detail} />
            <HomeRoute path="/profile" component={Profile} />
            {/* Đặt vé */}
            <Route path="/dat-ve/:maLichChieu" component={BuyTicket} />
            {/* Login */}
            <Route path="/login" component={LoginHome} />
            {/* Admin */}
            <AdminRoute exact path="/admin" component={AdminHome} />
            <AdminRoute path="/admin/user-manager" component={UserManager} />
            <AdminRoute path="/admin/movie-manager" component={MovieManager} />
          </Switch>
        </BrowserRouter>
      </div>
    </React.Fragment>
  );
}

export default App;
