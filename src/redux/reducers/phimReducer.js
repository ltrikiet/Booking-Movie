import {
  DELETE_PHIM,
  GET_LIST_PHIM,
  GET_LIST_PHIM_PHAN_TRANG,
  POST_PHIM_MOI,
  GET_THONG_TIN_LICH_CHIEU_PHIM,
  POST_CAP_NHAT_PHIM,
} from "../constants/phimConstants";

const initialState = {
  danhSachPhim: [],
  loading: false,
  error: false,
};

const initialState2 = {
  danhSachPhimPhanTrang: [],
  loading: false,
  error: false,
};

const initialState3 = {
  thongTinLichChieuPhim: [],
};

const initialState4 = {
  data: "",
  error: false,
};

export const phimReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_PHIM.REQUEST:
      return { ...state, loading: true, error: false };
    case GET_LIST_PHIM.SUCCESS:
      return {
        ...state,
        danhSachPhim: action.payload.data,
        loading: false,
        error: false,
      };
    case GET_LIST_PHIM.FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export const phimPhanTrangReducer = (state = initialState2, action) => {
  switch (action.type) {
    case GET_LIST_PHIM_PHAN_TRANG.REQUEST:
      return { ...state, loading: true, error: false };
    case GET_LIST_PHIM_PHAN_TRANG.SUCCESS:
      return {
        ...state,
        danhSachPhimPhanTrang: action.payload.data,
        loading: false,
        error: false,
      };
    case GET_LIST_PHIM_PHAN_TRANG.FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export const thongTinLichChieuPhimReducer = (state = initialState3, action) => {
  switch (action.type) {
    case GET_THONG_TIN_LICH_CHIEU_PHIM.SUCCESS:
      return { ...state, thongTinLichChieuPhim: action.payload.data };
    default:
      return state;
  }
};

export const tinhNangQuanLyPhim = (state = initialState4, action) => {
  switch (action.type) {
    case POST_PHIM_MOI.SUCCESS:
      return { ...state, data: action.payload.data, error: false };
    case POST_PHIM_MOI.FAIL:
      return { ...state, data: action.payload.data, error: true };
    case POST_CAP_NHAT_PHIM.SUCCESS:
      return { ...state, data: action.payload.data, error: false };
    case POST_CAP_NHAT_PHIM.FAIL:
      return { ...state, data: action.payload.data, error: true };
    case DELETE_PHIM.SUCCESS:
      return { ...state, data: action.payload.data, error: false };
    case DELETE_PHIM.FAIL:
      return { ...state, data: action.payload.data, error: true };
    default:
      return state;
  }
};
