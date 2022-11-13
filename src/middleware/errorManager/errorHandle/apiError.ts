import { HttpStatusCode } from '../../../utils/statusCode';
import BaseError from './bassError';

class APIError extends BaseError {
  constructor(
    name: string,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true,
    description = 'internal server error',
  ) {
    // Calling parent constructor of base Error class.
    super(name, httpCode, description, isOperational);
  }
}
export default APIError;
