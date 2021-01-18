import React from "react";
import { Modal, Row, Col, Table } from "react-bootstrap";
export default function TicketModal(props) {
  const { show, setShow, item } = props;

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Thông tin vé {item.maVe}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {item.danhSachGhe !== undefined ? (
          <React.Fragment>
            <Row>
              <Col xs={4}>Rạp chiếu:</Col>
              <Col xs={8}>{item.danhSachGhe[0]?.tenHeThongRap}</Col>
            </Row>
            <Row>
              <Col xs={4}>Rạp số:</Col>
              <Col xs={8}>{item.danhSachGhe[0]?.tenRap}</Col>
            </Row>{" "}
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        <Table striped bordered className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Mã ghé</th>
              <th>Số ghế</th>
            </tr>
          </thead>
          <tbody>
            {item.danhSachGhe?.map((itemGhe, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{itemGhe.maGhe}</td>
                  <td>Ghế {itemGhe.tenGhe}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}
