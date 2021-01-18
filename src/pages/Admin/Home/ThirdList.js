import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Line, Polar } from "react-chartjs-2";
export default function ThirdList() {
  return (
    <div className="third-list">
      <Row>
        <Col md={7}>
          <Card>
            <Card.Header>Lượng người dùng truy cập</Card.Header>
            <Card.Body>
              <Line
                height={80}
                data={{
                  labels: [
                    1500,
                    1600,
                    1700,
                    1750,
                    1800,
                    1850,
                    1900,
                    1950,
                    1999,
                    2050,
                  ],
                  datasets: [
                    {
                      data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
                      label: "Africa",
                      borderColor: "#3e95cd",
                      fill: false,
                    },
                  ],
                }}
                options={{
                  legend: {
                    display: false,
                  },
                }}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={5}>
          <Card>
            <Card.Header>Thống kê</Card.Header>
            <Card.Body>
              <Polar
                data={{
                  datasets: [
                    {
                      data: [11, 16, 7, 3, 14],
                      backgroundColor: [
                        "#FF6384",
                        "#4BC0C0",
                        "#FFCE56",
                        "#E7E9ED",
                        "#36A2EB",
                      ],
                      label: "My dataset", // for legend
                    },
                  ],
                  labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
