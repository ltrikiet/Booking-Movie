import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Table, Button, Form, Col, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { getListNguoiDungPhanTrang } from "../../../redux/actions/nguoiDungActions";
import UserManagerItem from "./UserManagerItem";
import UserManagerUpdateModal from "./UserManagerUpdateModal";
import UserManagerCreateModal from "./UserManagerCreateModal";
import Swal from "sweetalert2";

export default function UserManager(props) {
  const { windowSize } = props;
  const dispatch = useDispatch();
  const [showUpdate, setShowUpdate] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [updateUser, setUpdateUser] = useState({
    hoTen: "",
    email: "",
    soDt: "",
    taiKhoan: "",
    matKhau: "",
    maNhom: "",
    maLoaiNguoiDung: "",
  });

  const [page, setPage] = useState(1);
  const [alert, setAlert] = useState(false);
  const [itemCount, setItemCount] = useState(15);
  const [query, setQuery] = useState("");

  const { danhSachNguoiDungPhanTrang } = useSelector(
    (state) => state.nguoiDungPhanTrangReducer
  );
  const { data, error } = useSelector(
    (state) => state.tinhNangTrongNguoiDungReducer
  );

  useEffect(() => {
    dispatch(getListNguoiDungPhanTrang(page, itemCount));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (alert) {
      if (error) {
        Swal.fire({
          icon: "warning",
          title: "Lỗi",
          text: `${data}`,
        }).then(() => {
          setAlert(false);
        });
      } else {
        if (data === "Xóa thành công!") {
          Swal.fire({
            icon: "success",
            title: "Xóa người dùng",
            text: "Bạn đã xóa thành công người dùng",
          }).then(() => {
            dispatch(getListNguoiDungPhanTrang(page, itemCount, query));
            setAlert(false);
          });
        } else if (data.length !== 0) {
          setShowUpdate(false);
          Swal.fire({
            icon: "success",
            title: "Xử lý thành công",
          }).then(() => {
            dispatch(getListNguoiDungPhanTrang(page, itemCount, query));
            setShowUpdate(false);
            setShowCreate(false);
            setAlert(false);
          });
        }
      }
    }
    // eslint-disable-next-line
  }, [data, alert]);

  const handleOnClickPagination = (nextPage) => {
    setPage(nextPage);
    dispatch(getListNguoiDungPhanTrang(nextPage, itemCount, query));
  };

  const handleOnSelectCount = (nextCount) => {
    setItemCount(nextCount);
    dispatch(getListNguoiDungPhanTrang(page, nextCount, query));
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(getListNguoiDungPhanTrang(page, itemCount, query));
    }, 1000);
    return () => clearTimeout(timeOutId);
    // eslint-disable-next-line
  }, [query]);

  return (
    <div className="user-manager">
      <Card>
        <Card.Header>
          Danh sách người dùng
          <Button variant="primary" onClick={() => setShowCreate(true)}>
            <i className="fa fa-plus-circle"></i>
            {windowSize.width > 480 ? "Thêm người dùng" : ""}
          </Button>
          <UserManagerCreateModal
            setAlert={setAlert}
            showCreate={showCreate}
            setShowCreate={setShowCreate}
          />
        </Card.Header>
        <Card.Body>
          <Row>
            <Col sm={6}>
              <Form.Group className="d-flex align-items-center">
                <Form.Label className="mb-0 mr-1">Hiện</Form.Label>
                <Form.Control
                  defaultValue={itemCount}
                  as="select"
                  className={windowSize.width > 570 ? "w-25" : "w-50"}
                  onChange={(evt) => handleOnSelectCount(evt.target.value)}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="35">35</option>
                  <option value="50">50</option>
                </Form.Control>
                <Form.Label className="mb-0 ml-2">người dùng</Form.Label>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group
                className={`d-flex align-items-center ${
                  windowSize.width > 800 ? "float-right" : ""
                } position-relative`}
              >
                <Form.Label
                  className={`mb-0 mr-2 ${
                    windowSize.width < 360 ? "w-50" : ""
                  } `}
                  style={windowSize.width >= 575 ? { width: "35%" } : {}}
                >
                  Tìm kiếm:
                </Form.Label>
                <Form.Control
                  type="text"
                  className="w-75 pr-5"
                  value={query}
                  onChange={(evt) => setQuery(evt.target.value)}
                  size={5}
                />
                {query === undefined || query === null || query === "" ? (
                  <React.Fragment></React.Fragment>
                ) : (
                  <Button
                    className="remove-search"
                    onClick={() => setQuery("")}
                  >
                    <i className="fa fa-times position-absolute right-0"></i>
                  </Button>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Table bordered hover>
            <thead>
              <tr>
                <th className="d-none d-sm-table-cell">#</th>
                <th>Họ tên</th>
                <th style={windowSize.width < 480 ? { width: "98px" } : {}}>
                  Tài khoản
                </th>
                <th className="d-none d-sm-table-cell">Email</th>
                <th className="d-none d-lg-table-cell">SĐT</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {danhSachNguoiDungPhanTrang.items !== undefined ? (
                danhSachNguoiDungPhanTrang.items.map((item, index) => {
                  return (
                    <UserManagerItem
                      key={index}
                      item={item}
                      page={page}
                      index={index}
                      itemCount={itemCount}
                      query={query}
                      setShowUpdate={setShowUpdate}
                      setUpdateUser={setUpdateUser}
                      setAlert={setAlert}
                    />
                  );
                })
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </tbody>
          </Table>

          <UserManagerUpdateModal
            page={page}
            itemCount={itemCount}
            showUpdate={showUpdate}
            query={query}
            setShowUpdate={setShowUpdate}
            updateUser={updateUser}
            setAlert={setAlert}
          />

          <ReactPaginate
            previousLabel={<i className="fa fa-chevron-left"></i>}
            nextLabel={<i className="fa fa-chevron-right"></i>}
            pageCount={danhSachNguoiDungPhanTrang.totalPages}
            breakLabel={windowSize.width > 768 ? "..." : ""}
            marginPagesDisplayed={windowSize.width > 768 ? 2 : 0}
            pageRangeDisplayed={windowSize.width > 768 ? 5 : 2}
            initialPage={page - 1}
            onPageChange={(data) => {
              handleOnClickPagination(data.selected + 1);
              window.scrollTo(0, 0);
            }}
            containerClassName={"pagination float-right"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            breakClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
          />
        </Card.Body>
      </Card>
    </div>
  );
}
