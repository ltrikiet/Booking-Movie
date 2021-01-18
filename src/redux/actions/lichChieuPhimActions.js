import axiosClient from "../../utils/axiosClient";
import { GET_LIST_LICH_CHIEU_PHIM } from "../constants/lichChieuPhimConstants";
import { maNhom } from "../../utils/common";

export const getListPhim = () => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_LIST_LICH_CHIEU_PHIM.REQUEST,
    });
    axiosClient
      .get(`QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`)
      .then((result) => {
        dispatch({
          type: GET_LIST_LICH_CHIEU_PHIM.SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: GET_LIST_LICH_CHIEU_PHIM.FAIL });
      });
  };
};
