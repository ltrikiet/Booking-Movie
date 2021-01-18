import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Moment from "moment";

import {
  getListPhim,
  getThongTinLichChieuPhim,
} from "../../../../redux/actions/phimActions";

export default function TicketPicker() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [ticketPicker, setTicketPicker] = useState({
    selectPhim: "unselect",
    selectRap: "unselect",
    selectNgay: "unselect",
    selectSuatChieu: "unselect",
  });

  useEffect(() => {
    dispatch(getListPhim());
    // eslint-disable-next-line
  }, []);
  const { danhSachPhim } = useSelector((state) => state.phimReducer);
  const { thongTinLichChieuPhim } = useSelector(
    (state) => state.thongTinLichChieuPhimReducer
  );

  const ngayChieu = [];
  const suatChieu = [];
  /* eslint-disable no-unused-vars */
  const data = thongTinLichChieuPhim?.heThongRapChieu?.map((item) => {
    return item.cumRapChieu.map((item) => {
      if (item.maCumRap === ticketPicker.selectRap) {
        item.lichChieuPhim.map((item) => {
          if (
            !ngayChieu.includes(
              Moment(item.ngayChieuGioChieu).format("DD/MM/YYYY")
            )
          ) {
            ngayChieu.push(Moment(item.ngayChieuGioChieu).format("DD/MM/YYYY"));
          }
          return null;
        });
      }
      return null;
    });
  });

  const data2 = thongTinLichChieuPhim?.heThongRapChieu?.map((item) => {
    return item.cumRapChieu.map((item) => {
      if (item.maCumRap === ticketPicker.selectRap) {
        item.lichChieuPhim.map((item) => {
          const suatChieuObject = {};
          if (
            ticketPicker.selectNgay ===
            Moment(item.ngayChieuGioChieu).format("DD/MM/YYYY")
          ) {
            suatChieuObject["thoiGian"] = Moment(item.ngayChieuGioChieu).format(
              "HH:mm"
            );
            suatChieuObject["maLichChieu"] = item.maLichChieu;
          }
          if (Object.keys(suatChieuObject).length !== 0) {
            suatChieu.push(suatChieuObject);
          }
          return null;
        });
      }
      return null;
    });
  });
  /* eslint-disable no-unused-vars */

  const handleOnChange = (evt) => {
    const { name, value } = evt.target;

    switch (name) {
      case "selectPhim":
        dispatch(getThongTinLichChieuPhim(value));
        setTicketPicker({
          ...ticketPicker,
          selectPhim: value,
          selectRap: "unselect",
          selectNgay: "unselect",
          selectSuatChieu: "unselect",
        });
        break;
      case "selectRap":
        setTicketPicker({
          ...ticketPicker,
          selectRap: value,
          selectNgay: "unselect",
          selectSuatChieu: "unselect",
        });
        break;
      case "selectNgay":
        setTicketPicker({
          ...ticketPicker,
          selectNgay: value,
          selectSuatChieu: "unselect",
        });
        break;
      default:
        setTicketPicker({
          ...ticketPicker,
          [name]: value,
        });
        break;
    }
  };

  return (
    <div className="ticket-picker">
      <div className="row ticket-picker__content">
        <div className="col-md-4 ticket-picker__item">
          <Form.Group className="mb-0">
            <Form.Control
              as="select"
              name="selectPhim"
              defaultValue="unselect"
              onChange={(evt) => handleOnChange(evt)}
            >
              <option value="unselect" disabled hidden>
                Phim
              </option>
              {danhSachPhim.map((item, index) => {
                return (
                  <option value={item.maPhim} key={index}>
                    {item.tenPhim}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        </div>
        <div className="col-md-2 ticket-picker__item">
          <Form.Group className="mb-0">
            <Form.Control
              as="select"
              name="selectRap"
              value={ticketPicker.selectRap}
              onChange={(evt) => handleOnChange(evt)}
            >
              <option value="unselect" disabled hidden>
                Rạp
              </option>
              {ticketPicker.selectPhim === "unselect" ? (
                <option disabled>Vui lòng chọn phim trước</option>
              ) : (
                <React.Fragment>
                  <option value="unselect" disabled hidden>
                    Rạp
                  </option>
                  {thongTinLichChieuPhim?.heThongRapChieu?.map((item) => {
                    return item.cumRapChieu.map((item, index) => {
                      return (
                        <option key={index} value={item.maCumRap}>
                          {item.tenCumRap}
                        </option>
                      );
                    });
                  })}
                </React.Fragment>
              )}
            </Form.Control>
          </Form.Group>
        </div>
        <div className="col-md-2 ticket-picker__item">
          <Form.Group className="mb-0">
            <Form.Control
              as="select"
              name="selectNgay"
              value={ticketPicker.selectNgay}
              onChange={(evt) => handleOnChange(evt)}
            >
              <option value="unselect" disabled hidden>
                Ngày xem
              </option>
              {ticketPicker.selectPhim === "unselect" ||
              ticketPicker.selectRap === "unselect" ? (
                <option disabled>Vui lòng chọn phim và rạp trước</option>
              ) : (
                <React.Fragment>
                  <option value="unselect" disabled hidden>
                    Ngày xem
                  </option>
                  {ngayChieu.map((item, index) => {
                    return <option key={index}>{item}</option>;
                  })}
                </React.Fragment>
              )}
            </Form.Control>
          </Form.Group>
        </div>
        <div className="col-md-2 ticket-picker__item">
          <Form.Group className="mb-0">
            <Form.Control
              as="select"
              name="selectSuatChieu"
              value={ticketPicker.selectSuatChieu}
              onChange={(evt) => handleOnChange(evt)}
            >
              <option value="unselect" disabled hidden>
                Suất chiếu
              </option>
              {ticketPicker.selectPhim === "unselect" ||
              ticketPicker.selectRap === "unselect" ||
              ticketPicker.selectNgay === "unselect" ? (
                <option disabled>
                  Vui lòng chọn phim, rạp và ngày chiếu trước
                </option>
              ) : (
                <React.Fragment>
                  <option value="unselect" disabled hidden>
                    Suất chiếu
                  </option>
                  {suatChieu.map((item, index) => {
                    return (
                      <option key={index} value={item.maLichChieu}>
                        {item.thoiGian}
                      </option>
                    );
                  })}
                </React.Fragment>
              )}
            </Form.Control>
          </Form.Group>
        </div>

        <div className="col-md-2 muave">
          <Button
            style={
              ticketPicker.selectPhim === "unselect" ||
              ticketPicker.selectRap === "unselect" ||
              ticketPicker.selectSuatChieu === "unselect" ||
              ticketPicker.selectPhim === "unselect"
                ? { backgroundColor: "#6c757d", borderColor: "#6c757d" }
                : { backgroundColor: "#ff6600", borderColor: "#ff6600" }
            }
            disabled={
              ticketPicker.selectPhim === "unselect" ||
              ticketPicker.selectRap === "unselect" ||
              ticketPicker.selectSuatChieu === "unselect" ||
              ticketPicker.selectPhim === "unselect"
            }
            onClick={() =>
              history.push(`/dat-ve/${ticketPicker.selectSuatChieu}`)
            }
          >
            MUA VÉ NGAY
          </Button>
        </div>
      </div>
    </div>
  );
}
