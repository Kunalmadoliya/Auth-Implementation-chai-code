import * as authService from "./auth.service.js";
import ApiResponse from "../../../src/common/utils/api-response";

const register = async () => {
  const user = await authService.register(req.body);
  ApiResponse.created(res, "Register Successfully", user);
};

const login = async (req, res) => {
  const {user, accessToken, refreshToken} = await authService.login(req.body);

  (res.cookie("refreshToken", refreshToken),
    {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

  ApiResponse.ok("Login successfull", {user, accessToken});
};

const logout = async (req, res) => {
  await authService.logOut(req.user.id);
  res.clearCookie("refreshToken");
  ApiResponse.ok(res, "Logout Successful");
};

const getMe = async (req, res) => {
  const user = await authService.getMe(req.user.id);
  ApiResponse.ok(res, "User Profile", user);
};
export {register, login, logout , getMe};
