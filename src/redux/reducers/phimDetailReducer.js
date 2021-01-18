import { GET_PHIM_DETAIL } from "../constants/phimDetailConstants";

const initialState = {
  noiDung: [],
  loading: false,
  error: false,
};

const phimDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PHIM_DETAIL.REQUEST:
      return { ...state, loading: true, error: false };
    case GET_PHIM_DETAIL.SUCCESS:
      return {
        ...state,
        noiDung: action.payload.data,
        loading: false,
        error: false,
      };
    case GET_PHIM_DETAIL.FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default phimDetailReducer;
