import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export const getValidationErrors = (yupError: ValidationError): Errors => {
  const validationErrors: Errors = {};

  yupError.inner.forEach(err => {
    validationErrors[err.path] = err.message;
  });

  return validationErrors;
};
