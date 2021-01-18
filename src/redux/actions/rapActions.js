import axiosClient from "../../utils/axiosClient";
import { GET_LIST_RAP } from "../constants/rapConstants";
import { maNhom } from "../../utils/common";

export const getListRap = (maRap) => {
  return (dispatch, setState) => {
    dispatch({
      type: GET_LIST_RAP.REQUEST,
    });

    axiosClient
      .get(
        `QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maRap}&maNhom=${maNhom}`
      )
      .then((result) => {
        dispatch({
          type: GET_LIST_RAP.SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: GET_LIST_RAP.FAIL });
      });
  };
};
