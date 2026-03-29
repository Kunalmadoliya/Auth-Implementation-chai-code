import BaseDto from "../../../common/dto/base.dto";
import Joi from "joi";

class LoginDto extends BaseDto {
  static schema = Joi.object({
    email: Joi.string()
      .trim()
      .email({ tlds: { allow: false } })
      .lowercase()
      .required()
      .messages({
        "string.base": "Email must be a string",
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
      }),

    password: Joi.string()
      .min(8)
      .max(30)
      .required()
      .messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters",
      }),
  });
}

export default LoginDto;