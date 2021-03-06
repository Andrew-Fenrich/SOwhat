const initialState = {
  user: "",
  _id: "",
  name: "",
  delete: "",
  imgUrl: "",
  status: "no user",
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_USER": {
      return {
        ...state,
        user: `${action.user.name}`,
        _id: `${action.user._id}`,
        name: `${action.user.name}`,
        email: `${action.user.email}`,
        delete: `${action.user.delete}`,
        imgUrl: `${action.user.imgUrl}`,
      };
    }

    default: {
      return state;
    }
  }
}
