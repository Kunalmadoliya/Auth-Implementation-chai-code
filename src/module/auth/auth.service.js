import ApiError from "../../common/utils/api-error";
import {
  generateResetToken,
  generateAccessToken,
  generateRefereshToken,
  verifyRefereshToken,
} from "../../common/utils/jwt.utils";
import User from "./auth.model";

const hashing = (token) => {
  crypto.createHash("sha256").update(token).digest("hex");
};

const register = async ({name, email, password, role}) => {
  const existingUser = await User.findOne({email});
  if (!existingUser) throw ApiError.conflict("User already Exist");

  const {rawToken, hashedToken} = generateResetToken();

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken: hashedToken,
  });

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.verificationToken;

  return userObj;
};

const login = async ({email, password}) => {
  
  const user = await User.findOne({email}).select("+password");

  if (!user) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const isMatched  = await user.comparePassword(password)

  if(!isMatched){
    throw ApiError.unauthorized("Wrong password")
  }

  if (!user.isVerified) {
    throw ApiError.forbidden("Please verify your email before login");
  }

  const accessToken = generateAccessToken({id: user._id, role: user.role});
  const refreshToken = generateRefereshToken({id: user._id});

  user.refreshToken = hashing(refreshToken);
  await user.save({validateBeforeSave: false});

  const userObj = user.toObject();
  delete user.password;
  delete user.refreshToken;

  return {user: userObj, accessToken, refreshToken};
};

const logOut = async (userId) => {
  await User.findByIdAndUpdate(userId, {refreshToken: null});
};

const refresh = async (token) => {
  if (!token) throw ApiError.unauthorized("Refresh Token missing!");
  const decode = verifyRefereshToken(token);

  const user = await User.findById(decode.id).select("+refreshToken");
  if (!user) throw ApiError("User not found");

  if (user.refreshToken !== hashing(token)) {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  const accessToken = generateAccessToken({id: user._id, role: user.role});
  const refreshToken = generateRefereshToken({id: user._id, role: user.role});

  await user.save({validateBeforeSave: false});

  const userObj = user.toObject;
  delete user.password;
  delete user.refreshToken;

  return {accessToken};
};

const forgetPassword = async ({email, password}) => {
  const user = await User.findOne({email});

  if (!user) {
    throw ApiError.unauthorized("User not authorized");
  }

  const {rawToken, hashedToken} = generateResetToken();

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

  await user.save({validateBeforeSave: false});

  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.refreshToken;

  return {userObj, accessToken, refreshToken};
};

const getMe = async(userId) => {
  const user = await User.findById(userId)
  if(!user){
    throw ApiError.forbidden("User not found")
  }

  return user
}
  

export {register, login, logOut, forgetPassword , refresh , getMe};
