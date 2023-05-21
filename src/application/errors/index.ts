export class AppError{
  public readonly statusCode: number;
  public readonly message: string;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export class InvalidOperationError extends AppError {
  constructor() {
    super('Invalid operation type', 422);
  }
}

export class BadRequestValidationError extends AppError {
  constructor() {
    super("Invalid transaction body request", 400);
  }
}
