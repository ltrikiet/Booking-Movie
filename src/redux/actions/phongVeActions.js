import axiosClient from "../../utils/axiosClient";
import { GET_PHONG_VE, POST_DAT_VE } from "../constants/phongVeConstants";

export const getPhongVe = (maLichChieu) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_PHONG_VE.REQUEST,
    });
    await axiosClient
      .get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
      .then((result) => {
        dispatch({
          type: GET_PHONG_VE.SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: GET_PHONG_VE.FAIL,
        });
      });
  };
};

export const postDatVe = (data) => {
  return (dispatch, getState) => {
    dispatch({
      type: POST_DAT_VE.REQUEST,
    });
    axiosClient
      .post(`QuanLyDatVe/DatVe`, data)
      .then((result) => {
        dispatch({ type: POST_DAT_VE.SUCCESS, payload: { data: result.data } });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: POST_DAT_VE.FAIL });
      });
  };
};
