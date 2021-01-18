import React from "react";
import * as RBootstrap from "react-bootstrap";
import NewsContent from "./NewsContent";
export default function News() {
  return (
    <div className="news">
      <RBootstrap.Container>
        <RBootstrap.Tabs
          defaultActiveKey="dien-anh"
          id="uncontrolled-tab-example"
        >
          <RBootstrap.Tab eventKey="dien-anh" title="Điện ảnh 24h">
            <NewsContent />
          </RBootstrap.Tab>
          <RBootstrap.Tab eventKey="review" title="Review">
            DEF
          </RBootstrap.Tab>
          <RBootstrap.Tab eventKey="khuyen-mai" title="Khuyến mãi">
            DEF123
          </RBootstrap.Tab>
        </RBootstrap.Tabs>
      </RBootstrap.Container>
    </div>
  );
}
