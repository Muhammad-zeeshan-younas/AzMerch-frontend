import axiosClient from "../axios";

import { TSigninInterface } from "../../types/SigninType";
import { TSignupInterface } from "../../types/SignupType";

const signup = async (user: any) => {
  try {
    const response = await axiosClient.post("/user/registration", user);
    return response;
  } catch (err) {}
};

const getUser = async () => {};

const signin = async (user: TSigninInterface) => {
  try {
    const response = await axiosClient.post(
      "/user/new-session",
      JSON.stringify(user)
    );

    return response;
  } catch (error: any) {}
};

const userContxt = { signup, signin, getUser };

export default userContxt;
