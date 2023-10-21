import { useState } from "react";
import { useUser } from "../context-hooks";
import { toast } from "react-hot-toast";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import { User } from "../types";

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialFormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function JoinForm() {
  const { users, addNewUser } = useUser();
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const { username, email, password, confirmPassword } = formValues;
  const [errors, setErrors] = useState<FormValues>({} as FormValues);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const disabled = !username || !email || !password || !confirmPassword;

  function validateFormValues() {
    const { username, email, password, confirmPassword } = formValues;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const errors = {} as FormValues;

    if (users.find((user) => user.username === username) !== undefined)
      errors.username = "Username already exists";
    else if (username.trim().length < 2)
      errors.username = "Username must contain at least 2 characters";

    if (users.find((user) => user.email === email) !== undefined)
      errors.email = "Email already exists";
    else if (!emailRegex.test(email)) errors.email = "Email is invalid";

    if (!passwordRegex.test(password))
      errors.password =
        "Password must be at least 8 characters long and contain at least one letter and one number";

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
      setFormValues(initialFormValues);
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

      <div className="input-container">
        <TextInput
          label="Username"
          type="text"
          id="username"
          value={username}
          onChange={updateForm}
        />
        {errors.username && <p className="error">{errors.username}</p>}
      </div>

      <div className="input-container">
        <TextInput
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={updateForm}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="input-container">
        <PasswordInput
          label="Password"
          id="password"
          value={password}
          onChange={updateForm}
          showPassword={showPassword}
          setShowPassword={handleShowPassword}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      <div className="input-container">
        <PasswordInput
          label="Confirm Password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={updateForm}
          showPassword={showConfirmPassword}
          setShowPassword={handleShowPassword}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
      </div>

      <button type="submit" className="submit-button" disabled={disabled}>
        Join
      </button>
    </form>
  );
}

export default JoinForm;
