import { GET_PHIM_DETAIL } from "../constants/phimDetailConstants";
import axiosClient from "../../utils/axiosClient";

export const getPhimDetail = (maPhim) => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_PHIM_DETAIL.REQUEST,
    });
    axiosClient
      .get(`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
      .then((result) => {
        dispatch({
          type: GET_PHIM_DETAIL.SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: GET_PHIM_DETAIL.FAIL,
        });
      });
  };
};
