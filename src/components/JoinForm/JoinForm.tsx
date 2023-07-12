import { useState } from "react";
import { FormValuesErrors } from "../../types";
import { validateForm } from "../../validators/form-validators";
import { useUserContext } from "../../hooks/CustomUseHooks";
import FormInputBase from "../FormInputBase/FormInputBase";
import FormErrors from "../FormErrors/FormErrors";

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
    placeholder: "Enter A Username",
  },
  {
    key: "join-email",
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter An Email",
  },
  {
    key: "join-password",
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter A Password",
  },
  {
    key: "join-confirm-password",
    id: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm Your Password",
  },
];

const initialFormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
} as FormValuesErrors;

export default function JoinForm() {
  const { users, addNewUser, checkForExistingEmail, checkForExistingUserId } =
    useUserContext();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({} as FormValuesErrors);
  const errorsArray = Object.values(errors);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { valid, errors }: ValidForm = validateForm(formValues);

    if (valid) {
      const { username, email, password } = formValues;
      if (!checkForExistingUserId(username) && !checkForExistingEmail(email)) {
        addNewUser({
          id: users.length + 1,
          userId: username,
          username: username,
          email: email,
          password: password,
        });
        setFormValues(initialFormValues);
        alert(`Welcome to the community ${username}!`);
      } else errors.user = "Username or email already exists";
    }

    setErrors(errors);
  };
  return (
    <form className="account-form join" onSubmit={handleSubmit}>
      <h2 className="form-title">Join Our Wonderful Quote Community</h2>

      <div className="form-body">
        {joinFormInputs.map((input) => (
          <FormInputBase
            key={input.key}
            input={input}
            value={formValues[input.id]}
            change={handleInputChange}
            showPassword={showPassword}
            showPasswordClick={handleShowPassword}
          />
        ))}
      </div>

      {errorsArray.length > 0 && (
        <FormErrors errors={errorsArray} formKey="join" />
      )}

      <input className="submit-btn" type="submit" />
    </form>
  );
}
