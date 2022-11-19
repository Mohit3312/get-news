import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    pageSize: 5,
    country: "in",
    category: "general",
  };

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `GetNews - ${this.capitalize(this.props.category)}`;
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=e448d3d02a284a1588ab38b39a1e19f8&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    await this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    // await this.setState({ loading: true });
    this.updateNews();
  }

  handlePrevClick = async () => {
    // await this.setState({ loading: true });
    await this.setState({
      page: this.state.page - 1,
    });
    this.updateNews();
  };

  handleNextClick = async () => {
    // await this.setState({ loading: true });
    await this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-center my-4">
          GetNews - Top {this.capitalize(this.props.category)} Headlines
        </h1>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    desc={element.description ? element.description : ""}
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://img.global.news.samsung.com/global/wp-content/uploads/2022/11/Bixby_Availability_Thumb728.jpg"
                    }
                    newsUrl={element.url}
                    author={element.author ? element.author : "Unknown"}
                    date={new Date(element.publishedAt).toLocaleString()}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark"
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            disabled={
              this.state.page ===
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
