import { HttpStatusCode } from '../../../utils/statusCode';
import BaseError from './bassError';

/**
 * Customizing base Error class to specific error classes for better readability
 */

export class HTTP400Error extends BaseError {
  constructor(description = 'Not Found') {
    super('NOT FOUND', HttpStatusCode.NOT_FOUND, description, true);
  }
}
export class HTTP401Error extends BaseError {
  constructor(description = 'Unauthorized') {
    super('UNAUTHORIZED', HttpStatusCode.UNAUTHORIZED, description, true);
  }
}
export class HTTP403Error extends BaseError {
  constructor(description = 'Forbidden') {
    super('FORBIDDEN', HttpStatusCode.FORBIDDEN, description, true);
  }
}
export class HTTP404Error extends BaseError {
  constructor(description = 'Bad Request') {
    super('BAD REQUEST', HttpStatusCode.BAD_REQUEST, description, true);
  }
}