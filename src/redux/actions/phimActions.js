import axiosClient from "../../utils/axiosClient";
import {
  DELETE_PHIM,
  GET_LIST_PHIM,
  GET_LIST_PHIM_PHAN_TRANG,
  GET_THONG_TIN_LICH_CHIEU_PHIM,
  POST_PHIM_MOI,
  POST_CAP_NHAT_PHIM,
} from "../constants/phimConstants";
import { maNhom } from "../../utils/common";

export const getListPhim = () => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_LIST_PHIM.REQUEST,
    });
    axiosClient
      .get(`QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`)
      .then((result) => {
        dispatch({
          type: GET_LIST_PHIM.SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: GET_LIST_PHIM.FAIL,
        });
      });
  };
};

export const getListPhimPhanTrang = (soTrang, soPhanTu, tuKhoa) => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_LIST_PHIM_PHAN_TRANG.REQUEST,
    });
    if (tuKhoa === undefined || tuKhoa === "" || tuKhoa === null) {
      axiosClient
        .get(
          `QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${maNhom}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTu}`
        )
        .then((result) => {
          dispatch({
            type: GET_LIST_PHIM_PHAN_TRANG.SUCCESS,
            payload: { data: result.data },
          });
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: GET_LIST_PHIM_PHAN_TRANG.FAIL,
          });
        });
    } else {
      axiosClient
        .get(
          `QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${maNhom}&tenPhim=${tuKhoa}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTu}`
        )
        .then((result) => {
          dispatch({
            type: GET_LIST_PHIM_PHAN_TRANG.SUCCESS,
            payload: { data: result.data },
          });
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: GET_LIST_PHIM_PHAN_TRANG.FAIL,
          });
        });
    }
  };
};

export const getThongTinLichChieuPhim = (maPhim) => {
  return (dispatch, useState) => {
    dispatch({
      type: GET_THONG_TIN_LICH_CHIEU_PHIM.REQUEST,
    });
    axiosClient
      .get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
      .then((result) => {
        dispatch({
          type: GET_THONG_TIN_LICH_CHIEU_PHIM.SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: GET_THONG_TIN_LICH_CHIEU_PHIM.FAIL,
        });
      });
  };
};

export const themPhimMoi = (phim) => {
  return (dispatch, getState) => {
    dispatch({
      type: POST_PHIM_MOI.REQUEST,
    });

    const formData = new FormData();
    for (let key in phim) {
      formData.append(key, phim[key]);
    }

    axiosClient
      .post(`QuanLyPhim/ThemPhimUploadHinh`, formData)
      .then((result) => {
        dispatch({
          type: POST_PHIM_MOI.SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        dispatch({
          type: POST_PHIM_MOI.FAIL,
          payload: { data: error.response.data },
        });
      });
  };
};

export const capNhatPhim = (phim) => {
  return (dispatch, getState) => {
    dispatch({
      type: POST_CAP_NHAT_PHIM.REQUEST,
    });
    const formData = new FormData();
    for (let key in phim) {
      formData.append(key, phim[key]);
    }
    console.log(...formData);
    axiosClient
      .post(`QuanLyPhim/CapNhatPhimUpload`, formData)
      .then((result) => {
        dispatch({
          type: POST_CAP_NHAT_PHIM.SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        dispatch({
          type: POST_CAP_NHAT_PHIM.FAIL,
          payload: { data: "Lỗi cập nhật phim" },
        });
      });
  };
};

export const xoaPhim = (maPhim) => {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_PHIM.REQUEST,
    });
    axiosClient
      .delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
      .then((result) => {
        dispatch({
          type: DELETE_PHIM.SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        dispatch({
          type: DELETE_PHIM.FAIL,
          payload: { data: error.response.data },
        });
      });
  };
};
