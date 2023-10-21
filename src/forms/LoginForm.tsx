import { useState } from "react";
import { useUser } from "../context-hooks";
import { toast } from "react-hot-toast";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";

function LoginForm() {
  const { users, loginActiveUser } = useUser();
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const disabled = !userId || !password;

  const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = users.find((user) => user.userId === userId);

    if (!user) {
      toast.error("User not found!");
      return;
    } else if (user.password !== password) {
      toast.error("Password is incorrect!");
      return;
    } else {
      loginActiveUser(user);
      setUserId("");
      setPassword("");
      toast.success(`Welcome back, ${user.userId}!`);
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <header>
        <h2 className="title">Welcome Back!</h2>
        <h3 className="subtitle">
          Sign in to your account to see all of your favorites and contribute to
          the community!
        </h3>
      </header>

      <div className="inputs-group">
        <TextInput
          label="Username"
          type="text"
          id="username"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <PasswordInput
          label="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPassword={showPassword}
          setShowPassword={handleShowPassword}
        />
      </div>

      <button type="submit" className="submit-button" disabled={disabled}>
        Login
      </button>
    </form>
  );
}

export default LoginForm;
