import React from "react";
import { useDispatch } from "react-redux";
import Moment from "moment";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { xoaPhim } from "../../../redux/actions/phimActions";

export default function MovieManagerItem(props) {
  const { item, setShowUpdate, setUpdateMovie, setAlert, windowSize } = props;
  const dispatch = useDispatch();

  const handleOnClick = () => {
    setShowUpdate(true);
    setUpdateMovie({
      maPhim: item.maPhim,
      tenPhim: item.tenPhim,
      biDanh: item.biDanh,
      trailer: item.trailer,
      hinhAnh: item.hinhAnh,
      moTa: item.moTa,
      maNhom: item.maNhom,
      ngayKhoiChieu: Moment(item.ngayKhoiChieu).format("YYYY-MM-DD"),
      danhGia: item.danhGia,
    });
  };

  const handleOnClickRemoveItem = (maPhim) => {
    Swal.fire({
      title: "Xóa phim",
      text: "Một khi đã xóa sẽ không thể hồi phục lại",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      // cancelButtonColor: "#d33",
      confirmButtonText: "Chấp nhận",
      cancelButtonText: "Đóng",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(xoaPhim(maPhim));
        setAlert(true);
      }
    });
  };

  return (
    <tr>
      <td className="d-none d-sm-table-cell">{item.maPhim}</td>
      <td>{item.tenPhim}</td>
      <td>
        <img
          src={item.hinhAnh}
          alt="hinh-anh-phim"
          style={
            windowSize.width < 480 ? { width: "70px" } : { width: "100px" }
          }
        />
      </td>
      <td className="d-none d-lg-table-cell">
        <iframe
          title={item.biDanh}
          width="200"
          src={item.trailer}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </td>
      <td className="d-none d-sm-table-cell" style={{ wordBreak: "break-all" }}>
        {item.moTa.length > 120 && windowSize.width > 992
          ? item.moTa.slice(0, 120) + "..."
          : item.moTa.length > 65 && windowSize.width < 992
          ? item.moTa.slice(0, 65) + "..."
          : item.moTa}
      </td>
      <td className="d-none d-xl-table-cell">
        {Moment(item.ngayKhoiChieu).format("DD/MM/yyyy")}
      </td>
      <td className="d-none d-xl-table-cell">{item.danhGia} đ</td>
      <td className="setting-cell">
        <div className="setting-cell-div d-flex justify-content-around">
          <Button variant="warning" onClick={() => handleOnClick()}>
            <i className="fa fa-pencil-alt"></i>
          </Button>

          <Button
            variant="danger"
            onClick={() => handleOnClickRemoveItem(item.maPhim)}
          >
            <i className="fa fa-trash"></i>
          </Button>
        </div>
      </td>
    </tr>
  );
}
