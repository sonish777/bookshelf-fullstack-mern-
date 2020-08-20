const INITIAL_STATE = {};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        login: action.payload,
      };

    case "USER_AUTH": {
      return {
        ...state,
        login: action.payload,
      };
    }

    case "GET_USER_POSTS": {
      return {
        ...state,
        userPosts: action.payload,
      };
    }

    case "GET_USERS": {
      return {
        ...state,
        users: action.payload.users,
      };
    }

    case "USER_REGISTER": {
      return {
        ...state,
        register: action.payload.status,
        users: action.payload.users,
      };
    }

    default:
      return state;
  }
};

export default reducer;
