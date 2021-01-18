import React, { useState } from "react";
import { Table } from "react-bootstrap";
import Moment from "moment";
import TicketModal from "./TicketModal";

export default function BuyTicketInfo(props) {
  const [show, setShow] = useState(false);
  const [itemModal, setItemModal] = useState({});
  const { thongTinDatVe } = props.thongTinNguoiDung;

  const handleOnClick = (item) => {
    setShow(true);
    setItemModal(item);
  };

  return (
    <React.Fragment>
      <p className="text-center">Click vào vé để xem chi tiết</p>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Mã vé</th>
            <th>Ngày đặt</th>
            <th>Phim</th>
          </tr>
        </thead>
        <tbody>
          {thongTinDatVe?.map((item, index) => {
            return (
              <tr
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => handleOnClick(item)}
              >
                <td>{index + 1}</td>
                <td>{item.maVe}</td>
                <td>{Moment(item.ngayDat).format("DD/MM/YYYY")}</td>
                <td>{item.tenPhim}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <TicketModal show={show} setShow={setShow} item={itemModal} />
    </React.Fragment>
  );
}
