import ApiError from "../../common/utils/api-error";
import {generateResetToken} from "../../common/utils/jwt.utils";
import User from "./auth.model";

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

export {register};
