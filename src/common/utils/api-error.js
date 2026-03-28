class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad Request") {
    return new ApiError(400, message);
  }

  static conflict(message = "User already exists") {
    return new ApiError(409, message);
  }

  static unauthorized(message = "User not authorized") {
    return new ApiError(401, message);
  }

  static forbidden(message = "User not allowed") {
    return new ApiError(403, message);
  }
}

export default ApiError;