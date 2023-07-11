import { useState } from "react";
import FormInputBase from "../FormInputBase/FormInputBase";
import { FormValuesErrors } from "../../types";
import { validateForm } from "../../validators/form-validators";
import { useUserContext } from "../../hooks/CustomUseHooks";

type ValidForm = {
  valid: boolean;
  errors: FormValuesErrors;
};

const joinFormInputs = [
  {
    key: "join-username",
    id: "username",
    label: "Username",
    type: "text",
  },
  {
    key: "join-email",
    id: "email",
    label: "Email",
    type: "email",
  },
  {
    key: "join-password",
    id: "password",
    label: "Password",
    type: "password",
  },
  {
    key: "join-confirm-password",
    id: "confirmPassword",
    label: "Confirm Password",
    type: "password",
  },
];

const initialFormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
} as FormValuesErrors;

export default function JoinForm() {
  const { users, addNewUser, checkForExistingUser } = useUserContext();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [error, setError] = useState({} as FormValuesErrors);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { valid, errors }: ValidForm = validateForm(formValues);

    if (valid) {
      const { username, email, password } = formValues;
      const newUser = {
        id: users.length + 1,
        userId: username,
        username: username,
        email: email,
        password: password,
      };
      if (!checkForExistingUser(newUser)) {
        addNewUser(newUser);
        setFormValues(initialFormValues);
        alert(`Welcome to the community ${username}!`);
      } else errors.user = "Username or email already exists";
    }
    setError(errors);
  };
  return (
    <form className="account-form join" onSubmit={handleSubmit}>
      <h2>Join Our Wonderful Quote Community</h2>
      {Object.keys(error).length > 0 && (
        <div className="error-box">
          <p>There were errors with your submission: </p>
          <ul className="error-list">
            {Object.keys(error).map((key) => (
              <li key={key}>{error[key]}</li>
            ))}
          </ul>
        </div>
      )}

      {}

      {joinFormInputs.map((input) => {
        const { id, key, label, type } = input;

        return (
          <FormInputBase
            key={key}
            id={id}
            label={label}
            type={type}
            value={formValues[id]}
            change={handleInputChange}
          />
        );
      })}
      <input type="submit" />
    </form>
  );
}
