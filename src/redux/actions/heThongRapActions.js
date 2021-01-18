import axiosClient from "../../utils/axiosClient";
import { GET_LIST_HE_THONG_RAP } from "../constants/heThongRapConstants";

export const getHeThongRap = () => {
  return (dispatch, setState) => {
    dispatch({
      type: GET_LIST_HE_THONG_RAP.REQUEST,
    });

    axiosClient
      .get(`QuanLyRap/LayThongTinHeThongRap`)
      .then((result) => {
        dispatch({
          type: GET_LIST_HE_THONG_RAP.SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: GET_LIST_HE_THONG_RAP.FAIL });
      });
  };
};
