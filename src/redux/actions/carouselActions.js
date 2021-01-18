import axiosClient from "../../utils/axiosClient";
import { GET_LIST_CAROUSEL } from "../constants/carouselConstants";
import { maNhom } from "../../utils/common";

export const getListCarousel = () => {
  return (dispatch, setState) => {
    dispatch({
      type: GET_LIST_CAROUSEL.REQUEST,
    });
    axiosClient
      .get(
        `QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${maNhom}&soTrang=1&soPhanTuTrenTrang=4`
      )
      .then((result) => {
        dispatch({
          type: GET_LIST_CAROUSEL.SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: GET_LIST_CAROUSEL.FAIL });
      });
  };
};
