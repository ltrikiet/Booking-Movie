import { GET_PHONG_VE, POST_DAT_VE } from "../constants/phongVeConstants";

const initialState = {
  danhSachPhongVe: [],
  loading: false,
  error: false,
};

const initialState2 = {
  dataDatVe: [],
};

export const phongVeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PHONG_VE.REQUEST:
      return { ...state, loading: true };
    case GET_PHONG_VE.SUCCESS:
      return { ...state, danhSachPhongVe: action.payload.data, loading: false };
    case GET_PHONG_VE.FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export const datVeReducer = (state = initialState2, action) => {
  switch (action.type) {
    case POST_DAT_VE.SUCCESS:
      return { ...state, dataDatVe: action.payload.data };
    default:
      return state;
  }
};
