import axiosClient from "../axios";
import { TSigninInterface } from "../../types/SigninType";

const signup = async (user: any) => {
  try {
    const response = await axiosClient.post("/user/registration", user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (err) {}
};

const getUser = async () => {
  try {
    const response = await axiosClient.get("/user/session");

    return response;
  } catch (error: any) {}
};

const signin = async (user: TSigninInterface) => {
  try {
    const response = await axiosClient.post(
      "/user/new-session",
      JSON.stringify(user)
    );

    return response;
  } catch (error: any) {}
};

const signOut = async () => {
  try {
    const response = await axiosClient.delete("/user/delete-session");

    return response;
  } catch (error: any) {}
};

const userContxt = { signup, signin, getUser, signOut };

export default userContxt;
