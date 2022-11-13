import { Response } from 'express';
import BaseError from './errorHandle/bassError';
import { ErrorResponse } from './responseHandler';

class ErrorHandler {
  /**
   * Centralized error handler.Can also do something with the error.
   * EX: send error notifications to admin
   * @param {Response} res
   * @param {any} error
   * @returns
   */
  public async handleError(res: Response, error: any): Promise<any> {
    return ErrorResponse(res, error, error?.httpCode);
  }
  /**
   *Distinguish between error types(Operational & Programmer) and
   * send them to the centralized error-handling component.
   * @param {any} error
   * @returns {boolean}
   */
  public isTrustedError(error: any) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}
export const errorHandler = new ErrorHandler();
