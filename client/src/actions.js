// gets a user from the DB
export const getUser = (user) => ({
  type: "GET_USER",
  user,
});

// logs user out clears store
export const logOut = () => ({
  type: "USER_LOGGED_OUT",
});
