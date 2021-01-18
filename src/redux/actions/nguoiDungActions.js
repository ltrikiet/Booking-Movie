import {
  CAP_NHAT_NGUOI_DUNG,
  LIST_NGUOI_DUNG,
  LIST_NGUOI_DUNG_PHAN_TRANG,
  XOA_NGUOI_DUNG,
  LIST_LOAI_NGUOI_DUNG,
  THEM_NGUOI_DUNG,
  THONG_TIN_NGUOI_DUNG,
} from "../constants/nguoiDungContants";
import axiosClient from "../../utils/axiosClient";
import { maNhom } from "../../utils/common";

export const getListNguoiDung = () => {
  return (dispatch, getState) => {
    dispatch({
      type: LIST_NGUOI_DUNG.REQUEST,
    });
    axiosClient
      .get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}`)
      .then((result) => {
        dispatch({
          type: LIST_NGUOI_DUNG.SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: LIST_NGUOI_DUNG.FAIL,
        });
      });
  };
};

export const getListNguoiDungPhanTrang = (soTrang, soPhanTu, tuKhoa) => {
  return (dispatch, getState) => {
    dispatch({
      type: LIST_NGUOI_DUNG_PHAN_TRANG.REQUEST,
    });
    if (tuKhoa === undefined || tuKhoa === null || tuKhoa === "") {
      axiosClient
        .get(
          `QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${maNhom}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTu}`
        )
        .then((result) => {
          dispatch({
            type: LIST_NGUOI_DUNG_PHAN_TRANG.SUCCESS,
            payload: { data: result.data },
          });
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: LIST_NGUOI_DUNG_PHAN_TRANG.FAIL,
          });
        });
    } else {
      axiosClient
        .get(
          `QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${maNhom}&tuKhoa=${tuKhoa}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTu}`
        )
        .then((result) => {
          dispatch({
            type: LIST_NGUOI_DUNG_PHAN_TRANG.SUCCESS,
            payload: { data: result.data },
          });
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: LIST_NGUOI_DUNG_PHAN_TRANG.FAIL,
          });
        });
    }
  };
};

export const getListLoaiNguoiDung = () => {
  return (dispatch, getState) => {
    dispatch({
      type: LIST_LOAI_NGUOI_DUNG.REQUEST,
    });
    axiosClient
      .get(`/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
      .then((result) => {
        dispatch({
          type: LIST_LOAI_NGUOI_DUNG.SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: LIST_LOAI_NGUOI_DUNG.FAIL,
        });
      });
  };
};

export const themNguoiDung = (nguoiDung) => {
  return (dispatch, getState) => {
    dispatch({
      type: THEM_NGUOI_DUNG.REQUEST,
    });
    axiosClient
      .post(`QuanLyNguoiDung/ThemNguoiDung`, {
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
          type: THEM_NGUOI_DUNG.SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        dispatch({
          type: THEM_NGUOI_DUNG.FAIL,
          payload: { data: error.response.data },
        });
      });
  };
};

export const capNhatNguoiDung = (nguoiDung) => {
  return (dispatch, getState) => {
    dispatch({
      type: CAP_NHAT_NGUOI_DUNG.REQUEST,
    });
    axiosClient
      .put(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, {
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
          type: CAP_NHAT_NGUOI_DUNG.SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        dispatch({
          type: CAP_NHAT_NGUOI_DUNG.FAIL,
          payload: { data: error.response.data },
        });
      });
  };
};

export const xoaNguoiDung = (taiKhoan) => {
  return (dispatch, getState) => {
    dispatch({
      type: XOA_NGUOI_DUNG.REQUEST,
    });
    axiosClient
      .delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
      .then((result) => {
        dispatch({
          type: XOA_NGUOI_DUNG.SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: XOA_NGUOI_DUNG.FAIL,
          payload: { data: error.response.data },
        });
      });
  };
};

export const getThongTinNguoiDung = (taiKhoan) => {
  return (dispatch, getState) => {
    dispatch({
      type: THONG_TIN_NGUOI_DUNG.REQUEST,
    });
    axiosClient
      .post(`QuanLyNguoiDung/ThongTinTaiKhoan`, {
        taiKhoan: taiKhoan,
      })
      .then((result) => {
        dispatch({
          type: THONG_TIN_NGUOI_DUNG.SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: THONG_TIN_NGUOI_DUNG.FAIL,
        });
      });
  };
};
