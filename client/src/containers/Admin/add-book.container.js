import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addBook, clearNewBook } from "../../actions/index";

class AddBook extends Component {
  state = {
    formData: {
      name: "",
      author: "",
      review: "",
      pages: "",
      rating: "",
      price: "",
    },
  };

  submitForm = (e) => {
    e.preventDefault();
    this.props.dispatch(
      addBook({
        ...this.state.formData,
        ownerId: this.props.user.login.id,
      })
    );
  };

  handleInput = (e, name) => {
    const newFormData = { ...this.state.formData };
    newFormData[name] = e.target.value;
    this.setState({
      formData: newFormData,
    });
  };

  showNewBook = (book) =>
    book.status === "success" ? (
      <div className="conf_link">
        Cool !!{" "}
        <Link to={`/books/${book.book._id}`}>
          Click the link to see the post
        </Link>
      </div>
    ) : null;

  componentWillMount() {
    this.props.dispatch(clearNewBook());
  }

  render() {
    // console.log(this.props);
    return (
      <div className="rl_container article">
        <form onSubmit={this.submitForm}>
          <h2>Add a review</h2>
          <div className="form_element">
            <input
              type="text"
              placeholder="Enter name"
              value={this.state.formData.name}
              onChange={(e) => this.handleInput(e, "name")}
            />
          </div>
          <div className="form_element">
            <input
              type="text"
              placeholder="Enter author"
              value={this.state.formData.author}
              onChange={(e) => this.handleInput(e, "author")}
            />
          </div>
          <textarea
            value={this.state.formData.review}
            onChange={(e) => this.handleInput(e, "review")}
          ></textarea>
          <div className="form_element">
            <input
              type="number"
              placeholder="Enter pages"
              value={this.state.formData.pages}
              onChange={(e) => this.handleInput(e, "pages")}
            />
          </div>
          <div className="form_element">
            <select
              value={this.state.formData.rating}
              onChange={(e) => this.handleInput(e, "rating")}
            >
              <option val="1">1</option>
              <option val="2">2</option>
              <option val="3">3</option>
              <option val="4">4</option>
              <option val="5">5</option>
            </select>
          </div>
          <div className="form_element">
            <input
              type="number"
              placeholder="Enter price"
              value={this.state.formData.price}
              onChange={(e) => this.handleInput(e, "price")}
            />
          </div>
          <button type="submit">Add review</button>
          {this.props.books.newBook
            ? this.showNewBook(this.props.books.newBook)
            : null}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //   console.log(state);
  return {
    books: state.books,
  };
};

export default connect(mapStateToProps)(AddBook);
