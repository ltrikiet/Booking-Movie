import {
  CAP_NHAT_NGUOI_DUNG,
  LIST_LOAI_NGUOI_DUNG,
  LIST_NGUOI_DUNG,
  LIST_NGUOI_DUNG_PHAN_TRANG,
  THEM_NGUOI_DUNG,
  THONG_TIN_NGUOI_DUNG,
  XOA_NGUOI_DUNG,
} from "../constants/nguoiDungContants";

const initialState = {
  danhSachNguoiDung: [],
  loading: false,
  error: false,
};

const initialState2 = {
  danhSachNguoiDungPhanTrang: [],
  loading: false,
  error: false,
};

const initialState3 = {
  danhSachLoaiNguoiDung: [],
};

const initialState4 = {
  data: [],
  loading: false,
  error: false,
};

const initialState5 = {
  thongTinNguoiDung: [],
  loading: false,
};

export const nguoiDungReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_NGUOI_DUNG.REQUEST:
      return { ...state, loading: true, error: false };
    case LIST_NGUOI_DUNG.SUCCESS:
      return {
        ...state,
        danhSachNguoiDung: action.payload.data,
        loading: false,
        error: false,
      };
    case LIST_NGUOI_DUNG.FAIL:
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export const nguoiDungPhanTrangReducer = (state = initialState2, action) => {
  switch (action.type) {
    case LIST_NGUOI_DUNG_PHAN_TRANG.REQUEST:
      return { ...state, loading: true, error: false };
    case LIST_NGUOI_DUNG_PHAN_TRANG.SUCCESS:
      return {
        ...state,
        danhSachNguoiDungPhanTrang: action.payload.data,
        loading: false,
        error: false,
      };
    case LIST_NGUOI_DUNG_PHAN_TRANG.FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export const loaiNguoiDungReducer = (state = initialState3, action) => {
  switch (action.type) {
    case LIST_LOAI_NGUOI_DUNG.SUCCESS:
      return { ...state, danhSachLoaiNguoiDung: action.payload.data };
    default:
      return state;
  }
};

export const tinhNangTrongNguoiDungReducer = (
  state = initialState4,
  action
) => {
  switch (action.type) {
    case THEM_NGUOI_DUNG.SUCCESS:
      return { ...state, data: action.payload.data, error: false };
    case THEM_NGUOI_DUNG.FAIL:
      return { ...state, data: action.payload.data, error: true };
    case CAP_NHAT_NGUOI_DUNG.SUCCESS:
      return { ...state, data: action.payload.data, error: false };
    case CAP_NHAT_NGUOI_DUNG.FAIL:
      return { ...state, data: action.payload.data, error: true };
    case XOA_NGUOI_DUNG.SUCCESS:
      return { ...state, data: action.payload.data, error: false };
    case XOA_NGUOI_DUNG.FAIL:
      return { ...state, data: action.payload.data, error: true };
    default:
      return state;
  }
};

export const thongTinNguoiDungReducer = (state = initialState5, action) => {
  switch (action.type) {
    case THONG_TIN_NGUOI_DUNG.REQUEST: {
      return { ...state, loading: true };
    }
    case THONG_TIN_NGUOI_DUNG.SUCCESS: {
      return {
        ...state,
        thongTinNguoiDung: action.payload.data,
        loading: false,
      };
    }
    default:
      return state;
  }
};
