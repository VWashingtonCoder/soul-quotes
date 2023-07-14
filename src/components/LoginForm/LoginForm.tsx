import { useState } from "react";
import { FormValuesErrors } from "../../types";
import { validateForm } from "../../validators/form-validators";
import { useUserContext } from "../../hooks/CustomUseHooks";
import FormInputBase from "../FormInputBase/FormInputBase";
import FormErrors from "../FormErrors/FormErrors";

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
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({} as FormValuesErrors);
  const errorsArray = Object.values(errors);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleShowPasswordClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login form submitted");
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

    setErrors(errors);
  };

  return (
    <form className="account-form login" onSubmit={handleSubmit}>
      <h2 className="form-title">Login To Your Account</h2>

      <div className="form-body">
        {loginFormInputs.map((input) => (
          <FormInputBase
            key={input.key}
            input={input}
            value={formValues[input.id]}
            change={handleInputChange}
            showPassword={showPassword}
            showPasswordClick={handleShowPasswordClick}
          />
        ))}
      </div>

      {errorsArray.length > 0 && (
        <FormErrors errors={errorsArray} formKey="login" />
      )}

      <button className="submit-btn" type="submit">
        Login
      </button>
    </form>
  );
}
