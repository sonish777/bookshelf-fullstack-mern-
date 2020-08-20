const INITIAL_STATE = {};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_BOOKS": {
      return {
        ...state,
        list: action.payload,
      };
    }

    case "GET_BOOK": {
      return {
        ...state,
        book: action.payload,
      };
    }

    case "UPDATE_BOOK": {
      return {
        ...state,
        updateBook: action.payload.status,
        book: action.payload.book,
      };
    }

    case "DELETE_BOOK": {
      return {
        ...state,
        postDeleted: action.payload,
      };
    }

    case "CLEAR_BOOK": {
      // console.log("BOOK CLEARED FROM REDUX");
      return {
        ...state,
        postDeleted: action.payload.postDeleted,
        book: action.payload.book,
        updateBook: action.payload.updateBook,
        // ...action.payload,
      };
    }

    case "GET_BOOK_WITH_REVIEWER": {
      return {
        ...state,
        book: action.payload.book,
        reviewer: action.payload.reviewer,
      };
    }

    case "CLEAR_BOOK_WITH_REVIEWER": {
      return {
        ...state,
        book: action.payload.book,
        reviewer: action.payload.reviewer,
      };
    }

    case "ADD_BOOK": {
      return {
        ...state,
        newBook: action.payload,
      };
    }

    // case "CLEAR_BOOK": {
    //   return {
    //     ...state,
    //     newBook: action.payload,
    //   };
    // }

    default:
      return state;
  }
};

export default reducer;
