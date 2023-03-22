import db from "../../firebase/config";

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      const user = await db
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log(user);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
      console.log(user);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

export const authSignOutUser = async (dispatch, getState) => {};
