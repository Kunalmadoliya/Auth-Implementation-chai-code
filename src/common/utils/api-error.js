class ApiError extends express {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    isOperation = true;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad Request") {
    return new ApiError(400, message);
  }

  static conflict(message = "User already Exist"){
    return new ApiError(400 , message)
  }
}

export default ApiError;
 