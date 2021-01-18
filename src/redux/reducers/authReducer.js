import { LOGIN, REGISTER } from "../constants/authContansts";

const userInfo = localStorage.getItem("userInfo");

const initialState = {
  userInfo: userInfo ? JSON.parse(userInfo) : [],
  loading: false,
  error: false,
};

const initialState2 = {
  data: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.REQUEST:
      return { ...state, loading: true, error: false };
    case LOGIN.SUCCESS:
      return {
        ...state,
        userInfo: action.payload.data,
        loading: false,
        error: false,
      };
    case LOGIN.FAIL:
      return {
        ...state,
        userInfo: action.payload.data,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export const registerReducer = (state = initialState2, action) => {
  switch (action.type) {
    case REGISTER.SUCCESS:
      return { ...state, data: action.payload.data };
    case REGISTER.FAIL:
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
};
