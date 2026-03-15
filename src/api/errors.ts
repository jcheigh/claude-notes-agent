// 400 error code
export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

// 401 error code
export class UserNotAuthenticatedError extends Error {
  constructor(message: string) {
    super(message);
  }
}

// 403 error code
export class UserForbiddenError extends Error {
  constructor(message: string) {
    super(message);
  }
}

// 404 error code
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}
