import ApiError from "../../common/utils/api-error";
import {verifyAccessToken} from "../../common/utils/jwt.utils";
import User from "./auth.model";

const authenticated = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw ApiError.unauthorized("Not authenticated Please register again");
  }

  const decoded = verifyAccessToken(token);
  const user = await User.findById(decoded.id);
  if (!user) {
    throw ApiError.unauthorized("Please login in again");
  }

  req.user = {
    id: user._id,
    role: user.role,
    name: user.name,
    email: user.email,
  };

  next();
};

const authorize = (...roles) => {
    return (req , res , next) => {
        if (!roles.includes(req.user.role)) {
          throw ApiError.forbidden("You dont have acess to perform this action");
        }
      next()
    }
};

export {authenticated , authorize};
