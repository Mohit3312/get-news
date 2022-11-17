import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  render() {
    return (
      <div className="container my-3">
        <h2>GetNews - Top Headlines</h2>
        <div className="row">
          <div className="col-md-4">
            <NewsItem title="myTitle" desc="myDescription" />
          </div>
          <div className="col-md-4">
            <NewsItem title="myTitle" desc="myDescription" />
          </div>
          <div className="col-md-4">
            <NewsItem title="myTitle" desc="myDescription" />
          </div>
        </div>
      </div>
    );
  }
}
