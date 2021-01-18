import axiosClient, { setToken } from "../../utils/axiosClient";
import { LOGIN, REGISTER } from "../constants/authContansts";
import { maNhom } from "../../utils/common";

export const login = (values) => {
  return (dispatch, getState) => {
    dispatch({
      type: LOGIN.REQUEST,
    });
    axiosClient
      .post(`QuanLyNguoiDung/DangNhap`, values)
      .then((result) => {
        localStorage.setItem("userInfo", JSON.stringify(result.data));
        setToken(result.data.accessToken);
        dispatch({
          type: LOGIN.SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        dispatch({
          type: LOGIN.FAIL,
          payload: { data: error.response.data },
        });
      });
  };
};

export const dangKy = (nguoiDung) => {
  return (dispatch, getState) => {
    dispatch({
      type: REGISTER.REQUEST,
    });
    axiosClient
      .post(`QuanLyNguoiDung/DangKy`, {
        taiKhoan: nguoiDung.taiKhoan,
        matKhau: nguoiDung.matKhau,
        email: nguoiDung.email,
        soDt: nguoiDung.soDt,
        maNhom: maNhom,
        maLoaiNguoiDung: nguoiDung.maLoaiNguoiDung,
        hoTen: nguoiDung.hoTen,
      })
      .then((result) => {
        dispatch({
          type: REGISTER.SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        dispatch({
          type: REGISTER.FAIL,
          payload: { data: error.response.data },
        });
      });
  };
};
