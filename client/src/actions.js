// gets a user from the DB
export const getUser = (user) => ({
  type: "GET_USER",
  user,
});
