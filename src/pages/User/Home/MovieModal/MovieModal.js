import React from "react";
import { Modal } from "react-bootstrap";

export default function MovieModal(props) {
  return (
    <React.Fragment>
      <Modal
        size="lg"
        show={props.show}
        onHide={props.handleClose}
        className="movie-modal"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <iframe
            width="100%"
            height="450"
            src={props.trailer}
            title="movie-trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
