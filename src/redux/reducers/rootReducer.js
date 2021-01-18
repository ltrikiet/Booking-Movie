import { combineReducers } from "redux";
import lichChieuPhimReducer from "./lichChieuPhimReducer";
import carouselReducer from "./carouselReducer";
import heThongRapReducer from "./heThongRapReducer";
import rapReducer from "./rapReducer";
import phimDetailReducer from "./phimDetailReducer";
import {
  phimReducer,
  phimPhanTrangReducer,
  tinhNangQuanLyPhim,
  thongTinLichChieuPhimReducer,
} from "./phimReducer";
import { authReducer, registerReducer } from "./authReducer";
import {
  nguoiDungReducer,
  nguoiDungPhanTrangReducer,
  loaiNguoiDungReducer,
  tinhNangTrongNguoiDungReducer,
  thongTinNguoiDungReducer,
} from "./nguoiDungReducer";
import { datVeReducer, phongVeReducer } from "./phongVeReducer";

const rootReducer = combineReducers({
  lichChieuPhimReducer,
  carouselReducer,
  heThongRapReducer,
  rapReducer,
  phimDetailReducer,
  phimReducer,
  phimPhanTrangReducer,
  tinhNangQuanLyPhim,
  authReducer,
  registerReducer,
  nguoiDungReducer,
  nguoiDungPhanTrangReducer,
  tinhNangTrongNguoiDungReducer,
  loaiNguoiDungReducer,
  thongTinNguoiDungReducer,
  phongVeReducer,
  datVeReducer,
  thongTinLichChieuPhimReducer,
});

export default rootReducer;
