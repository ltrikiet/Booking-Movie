import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Table, Row, Col, Form, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { getListPhimPhanTrang } from "../../../redux/actions/phimActions";
import MovieManagerItem from "./MovieManagerItem";
import MovieManagerCreateModal from "./MovieManagerCreateModal";
import MovieManagerUpdateModal from "./MovieManagerUpdateModal";
import Swal from "sweetalert2";

export default function MovieManager(props) {
  const { windowSize } = props;
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [itemCount, setItemCount] = useState(15);
  const { danhSachPhimPhanTrang } = useSelector(
    (state) => state.phimPhanTrangReducer
  );
  const { data, error } = useSelector((state) => state.tinhNangQuanLyPhim);

  const [updateMovie, setUpdateMovie] = useState({
    maPhim: 0,
    tenPhim: "",
    biDanh: "",
    trailer: "",
    hinhAnh: "",
    moTa: "",
    maNhom: "",
    ngayKhoiChieu: "",
    danhGia: 0,
  });

  useEffect(() => {
    if (alert) {
      if (error) {
        Swal.fire({
          icon: "warning",
          title: "Lỗi",
          text: `${data}`,
        }).then(() => {
          dispatch(getListPhimPhanTrang(page, itemCount, query));
          setAlert(false);
        });
      } else {
        if (data === "Xóa thành công !") {
          Swal.fire({
            icon: "success",
            title: "Xóa phim",
            text: "Đã thành công",
          }).then(() => {
            dispatch(getListPhimPhanTrang(page, itemCount, query));
            setAlert(false);
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Xử lý thành công",
          }).then(() => {
            dispatch(getListPhimPhanTrang(page, itemCount, query));
            setShowCreate(false);
            setShowUpdate(false);
            setAlert(false);
          });
        }
      }
    }
    // eslint-disable-next-line
  }, [alert, data]);

  useEffect(() => {
    dispatch(getListPhimPhanTrang(page, itemCount, query));
    // eslint-disable-next-line
  }, []);

  const handleOnSelectCount = (nextItemCount) => {
    setItemCount(nextItemCount);
    dispatch(getListPhimPhanTrang(page, nextItemCount, query));
  };

  const handleOnClickPagination = (nextPage) => {
    setPage(nextPage);
    dispatch(getListPhimPhanTrang(nextPage, itemCount, query));
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(getListPhimPhanTrang(page, itemCount, query));
    }, 1000);
    return () => clearTimeout(timeOutId);
    // eslint-disable-next-line
  }, [query]);

  return (
    <div className="movie-manager">
      <Card>
        <Card.Header>
          Danh sách phim
          <Button variant="primary" onClick={() => setShowCreate(true)}>
            <i className="fa fa-plus-circle"></i>
            {windowSize.width > 480 ? "Thêm phim mới" : ""}
          </Button>
          <MovieManagerCreateModal
            setAlert={setAlert}
            showCreate={showCreate}
            setShowCreate={setShowCreate}
          />
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
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
                <Form.Label className="mb-0 ml-2">phim</Form.Label>
              </Form.Group>
            </Col>
            <Col md={6}>
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
                <th className="d-none d-sm-table-cell">Mã phim</th>
                <th>Tên phim</th>
                <th>Hình ảnh</th>
                <th className="d-none d-lg-table-cell">Trailer</th>
                <th className="d-none d-sm-table-cell">Mô tả</th>
                <th className="d-none d-xl-table-cell">Ngày khởi chiếu</th>
                <th className="d-none d-xl-table-cell">Đánh giá</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {danhSachPhimPhanTrang.items !== undefined ? (
                danhSachPhimPhanTrang.items.map((item, index) => {
                  return (
                    <MovieManagerItem
                      windowSize={windowSize}
                      setAlert={setAlert}
                      key={index}
                      item={item}
                      setUpdateMovie={setUpdateMovie}
                      setShowUpdate={setShowUpdate}
                    />
                  );
                })
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </tbody>
          </Table>
          <MovieManagerUpdateModal
            setAlert={setAlert}
            updateMovie={updateMovie}
            showUpdate={showUpdate}
            setShowUpdate={setShowUpdate}
          />
          <ReactPaginate
            previousLabel={<i className="fa fa-chevron-left"></i>}
            nextLabel={<i className="fa fa-chevron-right"></i>}
            pageCount={danhSachPhimPhanTrang.totalPages}
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
