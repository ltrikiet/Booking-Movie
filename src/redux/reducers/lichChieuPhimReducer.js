const {
  GET_LIST_LICH_CHIEU_PHIM,
} = require("../constants/lichChieuPhimConstants");

const initialState = {
  danhSachPhim: [],
  loading: false,
  error: false,
};

const lichChieuPhimReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_LICH_CHIEU_PHIM.REQUEST:
      return { ...state, loading: true, error: false };
    case GET_LIST_LICH_CHIEU_PHIM.SUCCESS:
      return {
        ...state,
        danhSachPhim: action.payload.data,
        loading: false,
        error: false,
      };
    case GET_LIST_LICH_CHIEU_PHIM.FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default lichChieuPhimReducer;
