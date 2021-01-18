import React from "react";
import * as RBootstrap from "react-bootstrap";
import NewsItem from "./NewsItem";
import NewsSmallItem from "./NewsSmallItem";

export default function NewsContent() {
  return (
    <div className="list-news">
      <RBootstrap.Row>
        <RBootstrap.Col md={6}>
          <NewsItem />
        </RBootstrap.Col>
        <RBootstrap.Col md={6}>
          <NewsItem />
        </RBootstrap.Col>
        <RBootstrap.Col md={4}>
          <NewsItem />
        </RBootstrap.Col>
        <RBootstrap.Col md={4}>
          <NewsItem />
        </RBootstrap.Col>
        <RBootstrap.Col md={4}>
          <NewsSmallItem />
          <NewsSmallItem />
          <NewsSmallItem />
          <NewsSmallItem />
        </RBootstrap.Col>
      </RBootstrap.Row>
      <div className="text-center btn-xemthem mt-3">
        <RBootstrap.Button>XEM THÊM</RBootstrap.Button>
      </div>
    </div>
  );
}
