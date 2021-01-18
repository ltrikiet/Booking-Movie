import { createActionTypes } from "../../utils/createAsyncAction";

export const GET_LIST_PHIM = createActionTypes("GET_LIST_PHIM");
export const GET_LIST_PHIM_PHAN_TRANG = createActionTypes(
  "GET_LIST_PHIM_PHAN_TRANG"
);
export const GET_THONG_TIN_LICH_CHIEU_PHIM = createActionTypes(
  "GET_THONG_TIN_LICH_CHIEU_PHIM"
);

export const POST_PHIM_MOI = createActionTypes("POST_PHIM_MOI");
export const POST_CAP_NHAT_PHIM = createActionTypes("POST_CAP_NHAT_PHIM");
export const DELETE_PHIM = createActionTypes("DELETE_PHIM");
