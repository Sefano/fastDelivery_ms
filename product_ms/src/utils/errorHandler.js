export default class ErrorHandler extends Error {
  status;
  errors;
  constructor(status, errors, message) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static BadRequest(message, errors = []) {
    return new ErrorHandler(400, errors, message);
  }
  static UnathorizedError() {
    return new ErrorHandler(401, "Пользователь не авторизован");
  }
}
