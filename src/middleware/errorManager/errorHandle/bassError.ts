import { HttpStatusCode } from '../../../utils/statusCode';

class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpStatusCode;
  public readonly isOperational: boolean;

  constructor(name: string, httpCode: HttpStatusCode, description: string, isOperational: boolean) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this);
  }
}
export default BaseError;
