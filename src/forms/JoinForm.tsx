import { useState } from "react";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";

const initialFormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function JoinForm() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const { username, email, password, confirmPassword } = formValues;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const disabled =
    !formValues.username ||
    !formValues.email ||
    !formValues.password ||
    !formValues.confirmPassword;

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    if (id === "password") setShowPassword(!showPassword);
    else if (id === "confirmPassword")
      setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form className="join">
      <header>
        <h2 className="title">Join Our Community!</h2>
        <h3 className="subtitle">
          Create an account and join us to see all of your favorites and
          contribute to the community!
        </h3>
      </header>

      <TextInput
        label="Username"
        type="text"
        id="username"
        value={username}
        onChange={updateForm}
      />

      <TextInput
        label="Email"
        type="email"
        id="email"
        value={email}
        onChange={updateForm}
      />

      <PasswordInput
        label="Password"
        id="password"
        value={password}
        onChange={updateForm}
        showPassword={showPassword}
        setShowPassword={handleShowPassword}
      />

      <PasswordInput
        label="Confirm Password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={updateForm}
        showPassword={showConfirmPassword}
        setShowPassword={handleShowPassword}
      />

      <button type="submit" className="submit-button" disabled={disabled}>
        Join
      </button>
    </form>
  );
}

export default JoinForm;
