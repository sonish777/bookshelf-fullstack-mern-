import React, { Component } from "react";
import { connect } from "react-redux";
import { getBooks } from "../actions/index";

import BookItem from "../widgetsUI/book-item";

class HomeContainer extends Component {
  componentDidMount() {
    this.props.getBooks(1, 0, "desc");
  }

  renderItems = (books) => {
    return books.list
      ? books.list.map((item, i) => <BookItem {...item} key={i} />)
      : null;
  };

  loadmore = () => {
    let count = this.props.books.list.length;
    // console.log(count);
    this.props.getBooks(1, count, "desc", this.props.books.list);
  };

  render() {
    // console.log(this.props);
    return (
      <div>
        {this.renderItems(this.props.books)}
        <div className="loadmore" onClick={this.loadmore}>
          Load More
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBooks: (limit, start, order, list) =>
      dispatch(getBooks(limit, start, order, list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
