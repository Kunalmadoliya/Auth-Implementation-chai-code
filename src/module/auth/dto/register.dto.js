import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto";

class RegisterDto extends BaseDto {
  static schema = Joi.object({
    name: Joi.string()
      .trim()
      .min(2)
      .max(50)
      .pattern(/^[a-zA-Z\s]+$/)
      .required()
      .messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 2 characters",
        "string.max": "Name cannot exceed 50 characters",
        "string.pattern.base": "Name can only contain letters and spaces",
      }),

    email: Joi.string()
      .trim()
      .email({tlds: {allow: false}})
      .lowercase()
      .required()
      .messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
      }),

    password: Joi.string()
      .min(8)
      .max(30)
      .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/)
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters",
        "string.max": "Password cannot exceed 30 characters",
        "string.pattern.base":
          "Password must include uppercase, lowercase, number and special character",
      }),

    role: Joi.string()
      .valid("customer", "seller" , "admin")
      .default("customer")
      .messages({
        "any.only": "Role must be either customer , admin or seller",
      }),
  });
}

export default RegisterDto;
