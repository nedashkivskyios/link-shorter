import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/auth/",
  withCredentials: true,
});

export const authAPI = {
  register: (payload: RegisterRequestType) => {
    return instance.post("register", payload);
  },
  login: (payload: LoginRequestType) => {
    return instance.post("login", payload);
  },
  check: (params: { token: string; userId: string }) => {
    return instance.post("check", {
      token: params.token,
      userId: params.userId,
    });
  },
};

export type RegisterRequestType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type LoginRequestType = Pick<RegisterRequestType, "email" | "password">;
