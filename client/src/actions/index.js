import axios from "axios";

export const getBooks = async (
  limit = 10,
  start = 0,
  order = "asc",
  list = null
) => {
  const response = await axios.get(
    `/api/books?limit=${limit}&skip=${start}&order=${order}`
  );
  // console.log(response.data);

  // const response = axios
  //   .get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
  //   .then((result) => {
  //     console.log(result.data);
  //     return result.data;
  //   });
  let data = "";
  if (list) {
    // console.log("WORKING");
    data = [...list, ...response.data.books];
  } else {
    data = response.data.books;
  }

  // console.log(data);
  return {
    type: "GET_BOOKS",
    payload: data,
  };
};

export const getBookWithReviewer = async (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/books/${id}`);
      let book = response.data.book;
      const ownerResponse = await axios.get(
        `/api/books/reviewer?id=${book.ownerId}`
      );
      dispatch({
        type: "GET_BOOK_WITH_REVIEWER",
        payload: {
          book,
          reviewer: ownerResponse.data,
        },
      });
    } catch (error) {
      console.log(error.response.data);
    }
    // book.owner
  };
};

export const clearBookWithReviewer = () => {
  return {
    type: "CLEAR_BOOK_WITH_REVIEWER",
    payload: {
      books: {},
      reviwer: {},
    },
  };
};

export const addBook = async (book) => {
  const response = await axios.post("/api/books", book);
  return {
    type: "ADD_BOOK",
    payload: response.data,
  };
};

export const clearNewBook = async () => {
  return {
    type: "CLEAR_BOOK",
    payload: {},
  };
};

export const getUserPosts = async (userId) => {
  const response = await axios.get(`/api/users/posts?user=${userId}`);
  return {
    type: "GET_USER_POSTS",
    payload: response.data,
  };
};

export const getBook = async (id) => {
  const response = await axios.get(`/api/books/${id}`);

  return {
    type: "GET_BOOK",
    payload: response.data,
  };
};

export const updateBook = async ({ _id, ...otherData }) => {
  const response = await axios.patch(`/api/books/${_id}`, otherData);

  return {
    type: "UPDATE_BOOK",
    payload: response.data,
  };
};

export const deleteBook = async (id) => {
  const response = await axios.delete(`/api/books/${id}`);
  return {
    type: "DELETE_BOOK",
    payload: true,
  };
};

export const clearBook = () => {
  return {
    type: "CLEAR_BOOK",
    payload: {
      book: null,
      updateBook: false,
      postDeleted: false,
    },
  };
};

// ---------------- USER ---------------- //

export const loginUser = async ({ email, password }) => {
  let response = "";
  try {
    response = await axios.post("/api/users/login", { email, password });
  } catch (error) {
    console.log(error.response.data.message);
    response = {
      status: "fail",
    };
  }

  return {
    type: "USER_LOGIN",
    payload: response.data || response,
  };
};

export const auth = async () => {
  let response = "";
  try {
    response = await axios.get("/api/users/auth");
  } catch (error) {
    console.log(error.response.data.message);
    response = {
      status: "fail",
    };
  }

  return {
    type: "USER_AUTH",
    payload: response.data || response,
  };
};

export const getUsers = async () => {
  const response = await axios.get("/api/users");
  return {
    type: "GET_USERS",
    payload: response.data,
  };
};

export const registerUser = async (user, userList) => {
  try {
    const response = await axios.post("/api/users", user);
    return {
      type: "USER_REGISTER",
      payload: {
        ...response.data,
        users: [...userList, response.data.user],
      },
    };
  } catch (error) {
    console.log(error.response.data);
    return {
      type: "USER_REGISTER",
      payload: {
        status: "fail",
        users: userList,
      },
    };
  }
};
