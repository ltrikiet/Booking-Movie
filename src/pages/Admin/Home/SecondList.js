import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Row, Col, Card } from "react-bootstrap";

export default function SecondList() {
  return (
    <div className="second-list">
      <Row>
        <Col md={7}>
          <Card>
            <Card.Header>Thu nhập theo năm</Card.Header>
            <Card.Body>
              <Bar
                height={150}
                data={{
                  labels: ["2012", "2013", "2014", "2015", "2016"],
                  datasets: [
                    {
                      label: "Population (millions)",
                      backgroundColor: [
                        "#3e95cd",
                        "#8e5ea2",
                        "#3cba9f",
                        "#e8c3b9",
                        "#c45850",
                      ],
                      data: [2478, 5267, 734, 784, 433],
                    },
                  ],
                }}
                options={{
                  legend: { display: false },
                  title: {
                    display: true,
                  },
                }}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={5}>
          <Card>
            <Card.Header>Thu nhập theo kì</Card.Header>
            <Card.Body>
              <Doughnut
                height={212}
                data={{
                  labels: ["2012", "2013", "2014", "2015", "2016"],
                  datasets: [
                    {
                      cornerRadius: "1%",
                      label: "Population (millions)",
                      backgroundColor: [
                        "#3e95cd",
                        "#8e5ea2",
                        "#3cba9f",
                        "#e8c3b9",
                        "#c45850",
                      ],
                      data: [2478, 5267, 734, 784, 433],
                    },
                  ],
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
