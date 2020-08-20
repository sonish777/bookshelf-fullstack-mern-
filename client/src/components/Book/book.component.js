import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getBookWithReviewer,
  clearBookWithReviewer,
} from "../../actions/index";

class Book extends Component {
  componentDidMount() {
    console.log("COMPONENT DID MOUNT");
    this.props.getBookWithReviewer(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearBookWithReviewer();
  }

  renderBook = ({ book, reviewer }) => {
    console.log("RENDERING");
    return book && reviewer ? (
      <div className="br_container">
        <div className="br_header">
          <h2>{book.name}</h2>
          <h5>{book.author}</h5>
          <div className="br_reviewer">
            <span>Review by: </span>
            {reviewer.firstname} {reviewer.lastname}
          </div>
          <div className="br_review">{book.review}</div>
          <div className="br_box">
            <div className="left">
              <div>
                <span>Pages: </span>
                {book.pages}
              </div>
              <div>
                <span>Price: </span>
                {book.price}
              </div>
            </div>
            <div className="right">
              <div style={{ fontSize: "20px" }}>
                <span>Rating: </span>
                <div>{book.rating}/5</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  };

  render() {
    let books = this.props.books;
    return <div>{this.renderBook(books)}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBookWithReviewer: (id) => dispatch(getBookWithReviewer(id)),
    clearBookWithReviewer: () => dispatch(clearBookWithReviewer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);
