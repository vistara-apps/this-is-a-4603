/**
 * Custom error classes and error handling utilities
 */

/**
 * Base application error class
 */
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error for authentication failures
 */
export class AuthError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401);
  }
}

/**
 * Error for authorization failures
 */
export class ForbiddenError extends AppError {
  constructor(message = 'You do not have permission to access this resource') {
    super(message, 403);
  }
}

/**
 * Error for resource not found
 */
export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

/**
 * Error for validation failures
 */
export class ValidationError extends AppError {
  constructor(message = 'Validation failed', errors = {}) {
    super(message, 400);
    this.errors = errors;
  }
}

/**
 * Error for subscription-related issues
 */
export class SubscriptionError extends AppError {
  constructor(message = 'Subscription error', statusCode = 402) {
    super(message, statusCode);
  }
}

/**
 * Error for API integration failures
 */
export class ApiError extends AppError {
  constructor(message = 'API error', statusCode = 500, originalError = null) {
    super(message, statusCode);
    this.originalError = originalError;
  }
}

/**
 * Format error response for API endpoints
 * @param {Error} error - The error object
 * @returns {Object} - Formatted error response
 */
export function formatErrorResponse(error) {
  const response = {
    error: {
      message: error.message || 'An unexpected error occurred'
    }
  };

  if (error instanceof ValidationError && error.errors) {
    response.error.details = error.errors;
  }

  if (process.env.NODE_ENV === 'development' && error.stack) {
    response.error.stack = error.stack;
  }

  return response;
}

/**
 * Log error details
 * @param {Error} error - The error object
 * @param {Object} request - Request object (optional)
 */
export function logError(error, request = null) {
  console.error('Error:', error.message);
  
  if (request) {
    console.error('Request URL:', request.url);
    console.error('Request Method:', request.method);
  }
  
  if (error.stack) {
    console.error('Stack:', error.stack);
  }
  
  if (error.originalError) {
    console.error('Original Error:', error.originalError);
  }
}

/**
 * Validate required fields in an object
 * @param {Object} data - The data object to validate
 * @param {Array<string>} requiredFields - Array of required field names
 * @throws {ValidationError} If any required fields are missing
 */
export function validateRequiredFields(data, requiredFields) {
  const errors = {};
  
  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      errors[field] = `${field} is required`;
    }
  }
  
  if (Object.keys(errors).length > 0) {
    throw new ValidationError('Validation failed', errors);
  }
}

/**
 * Handle errors in Remix actions and loaders
 * @param {Function} fn - The action or loader function
 * @returns {Function} - Wrapped function with error handling
 */
export function withErrorHandling(fn) {
  return async (args) => {
    try {
      return await fn(args);
    } catch (error) {
      logError(error, args.request);
      
      if (error instanceof AppError) {
        return new Response(JSON.stringify(formatErrorResponse(error)), {
          status: error.statusCode,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      
      // For unexpected errors, return a generic 500 error
      return new Response(JSON.stringify({
        error: {
          message: 'An unexpected error occurred'
        }
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  };
}

