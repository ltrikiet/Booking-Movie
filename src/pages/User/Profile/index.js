import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Tabs, Tab, Container, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { getThongTinNguoiDung } from "../../../redux/actions/nguoiDungActions";
import UpdateProfile from "./UpdateProfile";
import UserProfile from "./UserProfile";
import BuyTicketInfo from "./BuyTicketInfo";

export default function Profile() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authReducer);
  const [isUpdate, setIsUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const { thongTinNguoiDung, loading } = useSelector(
    (state) => state.thongTinNguoiDungReducer
  );
  const { data } = useSelector((state) => state.tinhNangTrongNguoiDungReducer);

  useEffect(() => {
    dispatch(getThongTinNguoiDung(userInfo.taiKhoan));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (alert) {
      if (data.length !== 0) {
        Swal.fire({
          icon: "success",
          title: "Cập nhật",
          text: "Cập nhật tài khoản thành công",
        }).then(() => {
          dispatch(getThongTinNguoiDung(userInfo.taiKhoan));
          setIsUpdate(false);
        });
      }
    }
    setAlert(false);
    // eslint-disable-next-line
  }, [data]);

  if (loading) {
    return (
      <div className="bg-dark" style={{ height: "79.5vh" }}>
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (userInfo.length === 0) {
    return <Redirect to="/login"></Redirect>;
  }

  return (
    <div className="user-profile">
      <Container>
        <Tabs defaultActiveKey="profile" className="mt-3">
          <Tab eventKey="profile" title="Tài khoản">
            {isUpdate ? (
              <UpdateProfile
                thongTinNguoiDung={thongTinNguoiDung}
                setIsUpdate={setIsUpdate}
                userInfo={userInfo}
                setAlert={setAlert}
              />
            ) : (
              <UserProfile
                thongTinNguoiDung={thongTinNguoiDung}
                setIsUpdate={setIsUpdate}
                loading={loading}
                userInfo={userInfo}
                setAlert={setAlert}
              />
            )}
          </Tab>
          <Tab eventKey="ticket-info" title="Thông tin mua vé">
            <BuyTicketInfo thongTinNguoiDung={thongTinNguoiDung} />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}
