/**
 * Validation utilities for form inputs and data
 */
import { ValidationError } from './errors';

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether the email is valid
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} - Validation result with isValid and message
 */
export function validatePassword(password) {
  if (!password || password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long'
    };
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number'
    };
  }
  
  // Check for at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one special character'
    };
  }
  
  return {
    isValid: true,
    message: 'Password is strong'
  };
}

/**
 * Validate file type
 * @param {File} file - File to validate
 * @param {Array<string>} allowedTypes - Array of allowed MIME types
 * @returns {boolean} - Whether the file type is valid
 */
export function isValidFileType(file, allowedTypes = ['image/jpeg', 'image/png', 'image/gif']) {
  return allowedTypes.includes(file.type);
}

/**
 * Validate file size
 * @param {File} file - File to validate
 * @param {number} maxSizeInBytes - Maximum file size in bytes
 * @returns {boolean} - Whether the file size is valid
 */
export function isValidFileSize(file, maxSizeInBytes = 10 * 1024 * 1024) {
  return file.size <= maxSizeInBytes;
}

/**
 * Validate form data
 * @param {FormData} formData - Form data to validate
 * @param {Object} validationRules - Validation rules
 * @returns {Object} - Validation result with errors object
 */
export function validateFormData(formData, validationRules) {
  const errors = {};
  
  for (const [field, rules] of Object.entries(validationRules)) {
    const value = formData.get(field);
    
    // Check required fields
    if (rules.required && (!value || value.trim() === '')) {
      errors[field] = `${field} is required`;
      continue;
    }
    
    // Skip further validation if field is empty and not required
    if (!value && !rules.required) {
      continue;
    }
    
    // Check min length
    if (rules.minLength && value.length < rules.minLength) {
      errors[field] = `${field} must be at least ${rules.minLength} characters`;
      continue;
    }
    
    // Check max length
    if (rules.maxLength && value.length > rules.maxLength) {
      errors[field] = `${field} must be at most ${rules.maxLength} characters`;
      continue;
    }
    
    // Check pattern
    if (rules.pattern && !new RegExp(rules.pattern).test(value)) {
      errors[field] = rules.patternMessage || `${field} has an invalid format`;
      continue;
    }
    
    // Check custom validator
    if (rules.validator && typeof rules.validator === 'function') {
      const validationResult = rules.validator(value);
      if (!validationResult.isValid) {
        errors[field] = validationResult.message;
        continue;
      }
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validate subscription plan
 * @param {string} planId - Plan ID to validate
 * @param {Object} availablePlans - Available plans
 * @returns {boolean} - Whether the plan is valid
 */
export function isValidPlan(planId, availablePlans) {
  return Object.keys(availablePlans).includes(planId);
}

/**
 * Validate domain name format
 * @param {string} domain - Domain to validate
 * @returns {boolean} - Whether the domain is valid
 */
export function isValidDomain(domain) {
  const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
}

/**
 * Validate tags
 * @param {Array<string>} tags - Tags to validate
 * @param {number} maxTags - Maximum number of tags allowed
 * @param {number} maxTagLength - Maximum length of each tag
 * @returns {Object} - Validation result with isValid and message
 */
export function validateTags(tags, maxTags = 10, maxTagLength = 20) {
  if (!Array.isArray(tags)) {
    return {
      isValid: false,
      message: 'Tags must be an array'
    };
  }
  
  if (tags.length > maxTags) {
    return {
      isValid: false,
      message: `Maximum of ${maxTags} tags allowed`
    };
  }
  
  for (const tag of tags) {
    if (typeof tag !== 'string') {
      return {
        isValid: false,
        message: 'All tags must be strings'
      };
    }
    
    if (tag.length > maxTagLength) {
      return {
        isValid: false,
        message: `Tags must be at most ${maxTagLength} characters`
      };
    }
    
    if (tag.trim() === '') {
      return {
        isValid: false,
        message: 'Empty tags are not allowed'
      };
    }
  }
  
  return {
    isValid: true,
    message: 'Tags are valid'
  };
}

