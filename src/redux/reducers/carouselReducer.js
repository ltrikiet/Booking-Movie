import { GET_LIST_CAROUSEL } from "../constants/carouselConstants";

const initialState = {
  danhSachCarousel: [],
  loading: false,
  error: false,
};

const carouselReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_CAROUSEL.REQUEST:
      return { ...state, loading: true, error: false };
    case GET_LIST_CAROUSEL.SUCCESS:
      return {
        ...state,
        danhSachCarousel: action.payload.data["items"],
        loading: false,
        error: false,
      };
    case GET_LIST_CAROUSEL.FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default carouselReducer;
