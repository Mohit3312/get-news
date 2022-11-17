import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, desc } = this.props;

    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="https://images.hindustantimes.com/img/2022/11/17/1600x900/samson_no_1668671104004_1668671109880_1668671109880.JPG"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
            <a href="/newsDeatil" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    );
  }
}
