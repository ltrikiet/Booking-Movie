import { GET_LIST_HE_THONG_RAP } from "../constants/heThongRapConstants";

const initialState = {
  danhSachHeThongRap: [],
  loading: false,
  error: false,
};

const heThongRapReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_HE_THONG_RAP.REQUEST:
      return { ...state, loading: true, error: false };
    case GET_LIST_HE_THONG_RAP.SUCCESS:
      return {
        ...state,
        danhSachHeThongRap: action.payload.data,
        loading: false,
        error: false,
      };
    case GET_LIST_HE_THONG_RAP.FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default heThongRapReducer;
