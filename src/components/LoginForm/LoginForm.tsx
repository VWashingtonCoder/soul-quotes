import { useState } from "react";
import FormInputBase from "../FormInputBase/FormInputBase";
import { FormValuesErrors } from "../../types";
import { validateForm } from "../../validators/form-validators";
import { useUserContext } from "../../hooks/CustomUseHooks";

type LoginProps = {
  changePage: (page: string) => void;
};

const loginFormInputs = [
  {
    key: "login-username",
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "Enter Your Username",
  },
  {
    key: "login-password",
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter Your Password",
  },
];

const initialFormValues = {
  username: "",
  password: "",
} as FormValuesErrors;

export default function LoginForm({ changePage }: LoginProps) {
  const { users, checkForExistingUserId, loginActiveUser } = useUserContext();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [error, setError] = useState({} as FormValuesErrors);
  const errorsArray = Object.keys(error);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login form submitted");
    console.log(formValues);
    const { valid, errors } = validateForm(formValues);

    if (valid) {
      const { username, password } = formValues;
      if (checkForExistingUserId(username)) {
        const user = users.find((u) => u.userId === username);
        if (user?.password === password) {
          loginActiveUser(user);
          setFormValues(initialFormValues);
          changePage("home");
          alert("Login successful");
        } else errors.user = "Wrong password for this user";
      } else errors.user = "User does not exist";
    }

    setError(errors);
  };

  return (
    <form className="account-form login" onSubmit={handleSubmit}>
      <h2>Login To Your Account</h2>

      {errorsArray.length > 0 && (
        <div className="error-container">
          <p className="error-message">Please fix the following errors:</p>
          <ul className="error-list">
            {errorsArray.map((key) => (
              <li key={key} className="error-item">
                {error[key]}
              </li>
            ))}
          </ul>
        </div>
      )}

      {loginFormInputs.map((input) => (
        <FormInputBase
          key={input.key}
          input={input}
          value={formValues[input.id]}
          change={handleInputChange}
        />
      ))}
      <button className="submit-btn" type="submit">
        Login
      </button>
    </form>
  );
}
