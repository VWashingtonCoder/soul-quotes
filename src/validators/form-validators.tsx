import { FormValuesErrors } from "../types";

function validateAlphaNumeric(value: string) {
  if (!value.match(/^[a-zA-Z0-9]*$/)) return false;
  else return true;
}

function validateEmail(value: string) {
  if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) return false;
  else return true;
}

function validatePassword(value: string) {
  if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/))
    return false;
  else return true;
}

export function validateForm(formValues: FormValuesErrors) {
  const messageKey = {
    username: "Username",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
  } as FormValuesErrors;
  const errors = {} as FormValuesErrors;
  let valid = true;

  Object.keys(formValues).forEach((key) => {
    const value = formValues[key].trim();

    if (!value || typeof value === "undefined") {
      valid = false;
      errors[key] = `${messageKey[key]} is required`;
    } else if (key === "username" || key === "password") {
      if (value.length < 8) {
        valid = false;
        errors[key] = `${messageKey[key]} must be at least 8 characters long`;
      } else if (value.length > 15) {
        valid = false;
        errors[key] = `${messageKey[key]} must be less than 15 characters long`;
      } else if (key === "username" && !validateAlphaNumeric(value)) {
        valid = false;
        errors[
          key
        ] = `${messageKey[key]} must contain only letters and numbers`;
      } else if (key === "password" && !validatePassword(value)) {
        valid = false;
        errors[
          key
        ] = `${messageKey[key]} must contain at least one uppercase letter, one lowercase letter, and one number`;
      }
    } else if (key === "email" && !validateEmail(value)) {
      valid = false;
      errors[key] = `${messageKey[key]} is invalid`;
    } else if (key === "confirmPassword" && value !== formValues.password) {
      valid = false;
      errors[key] = `${messageKey[key]} does not match password`;
    }
  });

  return { valid, errors };
}
