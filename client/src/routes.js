import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/layout";
import Home from "./components/Home/home.component";
import Book from "./components/Book/book.component";
import Login from "./containers/Admin/login.container";
import User from "./components/User/user.component";
import AddReview from "./containers/Admin/add-book.container";
import UserPosts from "./containers/Admin/user-posts.container";
import EditBook from "./containers/Admin/edit-book.container";
import Register from "./containers/Admin/register.container";
import auth from "./hoc/auth";
import Logout from "./components/User/logout.component";

const Routes = (props) => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={auth(Home, null)} />
        <Route path="/login" exact component={auth(Login, false)} />
        <Route path="/books/:id" exact component={auth(Book, null)} />
        <Route path="/user" exact component={auth(User, true)} />
        <Route path="/user/add" exact component={auth(AddReview, true)} />
        <Route path="/user/reviews" exact component={auth(UserPosts, true)} />
        <Route
          path="/user/edit-post/:id"
          exact
          component={auth(EditBook, true)}
        />
        <Route path="/user/register" exact component={auth(Register, true)} />
        <Route path="/user/logout" exact component={auth(Logout, true)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
