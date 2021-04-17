const initialState = {
  user: "",
  status: "no user",
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_USER": {
      return {
        ...state,
        user: { currentUser: `${action.user}` },
        status: "signed-in",
      };
    }

    default: {
      return state;
    }
  }
}
