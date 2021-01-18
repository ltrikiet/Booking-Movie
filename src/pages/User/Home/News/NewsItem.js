import React from "react";

export default function NewsItem() {
  return (
    <div className="news-item">
      <img className="news-img" src="./img/news-img.png" alt="news-img" />
      <div className="news-info">
        <p className="news-title">
          Dàn mỹ nhân trong thế giới điện ảnh của quái kiệt Christopher Nolan
        </p>
        <p className="news-content">
          Làng phim đương đại những năm qua chứng kiến sự lên ngôi của cái tên
          Christopher Nolan, được biết tới như một trong những đạo diễn thiên
          tài với khả năng tạo ra siêu phẩm bạc tỉ chất lượng.
        </p>
      </div>
      <div className="news-feedback">
        <div className="news-like">
          <i className="fa fa-thumbs-up"></i>
          <span>0</span>
        </div>
        <div className="news-comment">
          <i className="fa fa-comment-alt"></i>
          <span>0</span>
        </div>
      </div>
    </div>
  );
}
