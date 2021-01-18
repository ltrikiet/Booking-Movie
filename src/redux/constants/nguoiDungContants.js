import { createActionTypes } from "../../utils/createAsyncAction";

export const LIST_NGUOI_DUNG = createActionTypes("LIST_NGUOI_DUNG");
export const LIST_NGUOI_DUNG_PHAN_TRANG = createActionTypes(
  "LIST_NGUOI_DUNG_PHAN_TRANG"
);
export const LIST_LOAI_NGUOI_DUNG = createActionTypes("LIST_LOAI_NGUOI_DUNG");
export const THONG_TIN_NGUOI_DUNG = createActionTypes("THONG_TIN_NGUOI_DUNG");
export const THEM_NGUOI_DUNG = createActionTypes("THEM_NGUOI_DUNG");
export const CAP_NHAT_NGUOI_DUNG = createActionTypes("CAP_NHAT_NGUOI_DUNG");
export const XOA_NGUOI_DUNG = createActionTypes("XOA_NGUOI_DUNG");
