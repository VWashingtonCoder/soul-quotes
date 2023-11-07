import { useState } from "react";
import { useUser } from "../../context-hooks";
import FormInput from "../shared/FormInput";
import { User } from "../../types";

type JoinFormValues = {
  [username: string]: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialJoinFormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const joinInputs = [
  {id: "username", label: "Username", type: "text"},
  {id: "email", label: "Email", type: "email"},
  {id: "password", label: "Password", type: "password"},
  {id: "confirmPassword", label: "Confirm Pwd", type: "password"},
]

function JoinForm() {
  const { users, addNewUser } = useUser();
  const [formValues, setFormValues] = useState<JoinFormValues>(
    initialJoinFormValues
  );
  const { username, email, password, confirmPassword } = formValues;
  const [errors, setErrors] = useState<JoinFormValues>({} as JoinFormValues);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const disabled =
    !username ||
    !email ||
    !password ||
    !confirmPassword ||
    Object.keys(errors).length > 0;

  function validateFormValues() {
    const { username, email, password, confirmPassword } = formValues;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    const errors = {} as JoinFormValues;

    if (users.find((user) => user.username === username) !== undefined)
      errors.username = "Username already exists";
    else if (username.trim().length < 2)
      errors.username = "Username must contain at least 2 characters";

    if (users.find((user) => user.email === email) !== undefined)
      errors.email = "Email already exists";
    else if (!emailRegex.test(email)) errors.email = "Email is invalid";

    if (!passwordRegex.test(password))
      errors.password =
        "Password must be between 8-20 characters long and contain at least one letter and one number";

    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    return errors;
  }

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { name } = e.currentTarget;
    if (name === "password") setShowPassword(!showPassword);
    else if (name === "confirmPassword")
      setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateFormValues();

    if (Object.keys(errors).length === 0) {
      const newUser: User = {
        userId: username,
        username,
        email,
        password,
      };
      addNewUser(newUser);
      setFormValues(initialJoinFormValues);
      setShowPassword(false);
      setShowConfirmPassword(false);
    }

    setErrors(errors);
  };

  return (
    <form className="join" onSubmit={handleSubmit}>
      <header>
        <h2 className="title">Join Our Community!</h2>
        <h3 className="subtitle">
          Create an account and join us to see all of your favorites and
          contribute to the community!
        </h3>
      </header>

      <div className="inputs-group">
        {joinInputs.map((input) => {
          const { id, label, type } = input;
          const value = formValues[id] as string;
          return (
            <FormInput
              key={id}
              label={label}
              type={type}
              id={id}
              value={value}
              textChange={updateForm}
              showPassword={showPassword}
              setShowPassword={handleShowPassword}
            />
          );
        })}
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="errors-container">
          <p className="errors-title">Please fix errors to continue:</p>
          <ul className="errors-list">
            {Object.values(errors).map((error) => (
              <li className="error" key={error}>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button type="submit" className="submit-button" disabled={disabled}>
        Join
      </button>
    </form>
  );
}

export default JoinForm;
