import Joi from "joi";

// Joi validation schema
const roleValidationSchema = Joi.object({
  // userName: Joi.string()
  //   .max(20)
  //   .required()
  //   .messages({
  //     "string.max": "Name cannot exceed 20 characters",
  //     "any.required": "Name is required",
  //   }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).+$"))
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must include uppercase, lowercase, number, and special character",
      "any.required": "Password is required",
    }),

  role: Joi.string()
    .valid("seller", "user", "admin")
    .required()
    .messages({
      "any.only": "Role must be one of seller, user, admin",
      "any.required": "Role is required",
    }),

  // image: Joi.array()
  //   .items(
  //     Joi.object({
  //       image_url: Joi.string()
  //         .required()
  //         .messages({ "any.required": "Image URL is required" }),
  //       image_key: Joi.string()
  //         .required()
  //         .messages({ "any.required": "Image key is required" }),
  //     })
  //   )
  //   .min(1)
  //   .max(1)
  //   .required()
  //   .messages({
  //     "array.min": "At least one image is required",
  //     "array.max": "Only one image is allowed",
  //   }),
});

export default roleValidationSchema