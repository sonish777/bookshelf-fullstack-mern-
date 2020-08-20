import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  getBook,
  updateBook,
  clearBook,
  deleteBook,
} from "../../actions/index";

class EditBook extends PureComponent {
  state = {
    formData: {
      _id: this.props.match.params.id,
      name: "",
      author: "",
      review: "",
      pages: "",
      rating: "",
      price: "",
    },
    loaded: false,
  };

  submitForm = (e) => {
    e.preventDefault();
    // console.log(this.state.formData);
    this.props.dispatch(updateBook(this.state.formData));
  };

  handleInput = (e, name) => {
    const newFormData = { ...this.state.formData };
    newFormData[name] = e.target.value;
    this.setState({
      formData: newFormData,
    });
  };

  componentDidMount() {
    // console.log(this.state);
    this.props.dispatch(getBook(this.props.match.params.id));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.books.book && !prevState.loaded) {
      let book = nextProps.books.book.book;
      return {
        ...prevState,
        formData: { ...book },
        loaded: true,
      };
    } else {
      return {
        ...prevState,
        // loaded: false,
      };
    }
  }

  deletePost = () => {
    this.props.dispatch(deleteBook(this.props.match.params.id));
  };

  redirectUser = () => {
    setTimeout(() => {
      this.props.history.push("/user/reviews");
    }, 1000);
  };

  componentWillUnmount() {
    this.props.dispatch(clearBook());
  }

  render() {
    let books = this.props.books;
    return (
      <div className="rl_container article">
        {books.updateBook ? (
          <div className="edit_confirm">
            Post Updated,
            <Link to={`/books/${books.book._id}`}>
              Click here to see your post
            </Link>
          </div>
        ) : null}

        {books.postDeleted ? (
          <div className="red_tag">
            Post deleted
            {this.redirectUser()}
          </div>
        ) : null}
        <form onSubmit={this.submitForm}>
          <h2>Edit Review</h2>
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
          <button type="submit">Edit review</button>
          <div className="delete_post">
            <div className="button" onClick={this.deletePost}>
              Delete review
            </div>
          </div>
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

export default connect(mapStateToProps)(EditBook);
