import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    pageSize: 8,
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
      totalResults: 0,
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
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    await this.updateNews();
  }

  fetchMoreData = async () => {
    let updatedPage = this.state.page + 1;
    console.log(this.state.page);
    this.setState({ page: updatedPage });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=e448d3d02a284a1588ab38b39a1e19f8&category=${this.props.category}&page=${updatedPage}&pageSize=${this.props.pageSize}`;
    console.log(this.state.page);
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-center my-4">
          GetNews - Top {this.capitalize(this.props.category)} Headlines
        </h1>

        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
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
        </InfiniteScroll>
      </div>
    );
  }
}
