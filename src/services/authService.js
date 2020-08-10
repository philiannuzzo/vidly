import jwtDecode from "jwt-decode";
import http from "./httpService";

const jwtKey = "jwt";

http.setJwt(getJwt(jwtKey));

export async function login({ username: email, password }) {
  const { data: jwt } = await http.post("/auth", { email, password });
  localStorage.setItem(jwtKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(jwtKey, jwt);
}

export function logout() {
  localStorage.removeItem(jwtKey);
}

export function getUser() {
  try {
    const jwt = localStorage.getItem(jwtKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(jwtKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getUser,
  getJwt,
};
