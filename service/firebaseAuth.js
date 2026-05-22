import { auth, db, functions } from "./firebaseConfig";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import {
  httpsCallable,
} from "firebase/functions";



const createUserFn = httpsCallable(functions, "createUser");



export const createUser = async (data) => {
  try {
    const response = await createUserFn(data);

    return response.data;
  } catch (error) {
    console.log("Create user error:", error);
    throw error;
  }
};



export const loginUsername = async ({
  username,
  password,
}) => {
  try {
    const cleanUsername = username
      .trim()
      .toLowerCase();

    const q = query(
      collection(db, "users"),
      where("username", "==", cleanUsername)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      const error = new Error(
        "Username not found"
      );

      error.code = "username/not-found";

      throw error;
    }

    const userData = snapshot.docs[0].data();

    const email = userData.email;

    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    return userCredential.user;

  } catch (error) {
    console.log("Login error:", error);
    throw error;
  }
};



export const logoutUser = async () => {
  try {
    await signOut(auth);

    return true;

  } catch (error) {
    console.log("Logout error:", error);
    return false;
  }
};




export const watchStudentAuthState = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

export const getCurrentStudent = () => {
  return auth.currentUser || null;
};

export const getCurrentUserUid = () => {
  return auth.currentUser?.uid || null;
};



export const getAuthErrorMessage = (
  error
) => {
  switch (error.code) {

    case "username/not-found":
      return "No account with this username.";

    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect password.";

    case "auth/network-request-failed":
      return "Check your internet connection.";

    case "auth/user-disabled":
      return "This account has been disabled.";

    case "auth/too-many-requests":
      return "Too many login attempts. Try again later.";

    case "auth/user-not-found":
      return "User account not found.";

    case "functions/already-exists":
      return "Username or email already exists.";

    case "functions/permission-denied":
      return "Permission denied.";

    case "functions/unavailable":
      return "Server unavailable.";

    default:
      return (
        error.message ||
        "Something went wrong. Please try again."
      );
  }
};