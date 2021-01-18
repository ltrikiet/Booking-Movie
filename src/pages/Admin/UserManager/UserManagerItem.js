import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { xoaNguoiDung } from "../../../redux/actions/nguoiDungActions";
import Swal from "sweetalert2";

export default function UserManagerItem(props) {
  const dispatch = useDispatch();
  const {
    item,
    index,
    page,
    itemCount,
    setShowUpdate,
    setUpdateUser,
    setAlert,
  } = props;

  const handleOnClick = (data) => {
    setShowUpdate(true);
    setUpdateUser({
      hoTen: data.hoTen,
      email: data.email,
      soDt: data.soDt,
      taiKhoan: data.taiKhoan,
      matKhau: data.matKhau,
      maNhom: data.maNhom,
      maLoaiNguoiDung: data.maLoaiNguoiDung,
    });
  };

  const handleOnClickXoaNguoiDung = (taiKhoan) => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa?",
      text: "Khi đã xóa thì sẽ không bao giờ khôi phục lại được!",
      icon: "warning",
      buttons: ["Cancel", "Chấp nhận"],
      dangerMode: true,
      showCancelButton: true,
      cancelButtonText: "Đóng",
      confirmButtonColor: "#d33",
      confirmButtonText: "Chấp nhận",
    }).then((result) => {
      if (result.isConfirmed === true) {
        dispatch(xoaNguoiDung(taiKhoan));
        setAlert(true);
      }
    });
  };

  return (
    <tr>
      <td className="d-none d-sm-table-cell">
        {(+page - 1) * itemCount + index + 1}
      </td>
      <td>{item.hoTen}</td>
      <td>
        {item.taiKhoan.length > 10
          ? item.taiKhoan.slice(0, 10) + "..."
          : item.taiKhoan}
      </td>
      <td className="d-none d-sm-table-cell">{item.email}</td>
      <td className="d-none d-lg-table-cell">{item.soDt}</td>
      <td className="setting-cell">
        <div className="setting-cell-div d-flex justify-content-around">
          <Button variant="warning" onClick={() => handleOnClick(item)}>
            <i className="fa fa-pencil-alt"></i>
          </Button>

          <Button
            variant="danger"
            onClick={() => handleOnClickXoaNguoiDung(item.taiKhoan)}
          >
            <i className="fa fa-trash"></i>
          </Button>
        </div>
      </td>
    </tr>
  );
}
