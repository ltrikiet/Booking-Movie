import { GET_LIST_RAP } from "../constants/rapConstants";

const initialState = {
  danhSachRap: [],
  loading: false,
  error: false,
};

const rapReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_RAP.REQUEST:
      return { ...state, loading: true, error: false };
    case GET_LIST_RAP.SUCCESS:
      return {
        ...state,
        danhSachRap: action.payload.data,
        loading: false,
        error: false,
      };
    case GET_LIST_RAP.FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default rapReducer;
