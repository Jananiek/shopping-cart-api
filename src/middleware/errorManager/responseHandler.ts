import { Response } from 'express';

/**
 * Format error response
 * @param {Response} res
 * @param {Object} error - The error object with message
 * @param {string} error.message - The error message
 * @param {number} code - Error code
 * @returns JSON error object
 */
export const ErrorResponse = (res: Response, error: { message: string }, code = 400): Response => {
  return res.status(code).json({ success: false, data: { errorMessage: error.message } });
};
/**
 * Format success response
 * @param {Response} res 
 * @param {any} data - The data coming form api as output
 * @param {string} message - Message to display
 * @param {number} code - Error code
 * @returns JSON success object
 */
export const SuccessResponse = (res: Response, data: any, message: string, code = 200): Response => {
  return res.status(code).json({ success: true, data, message });
};
