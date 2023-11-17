import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type PasswordInputProps = {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  setShowPassword: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const PasswordInput = (props: PasswordInputProps) => {
  const { label, id, value, onChange, showPassword, setShowPassword } = props;

  return (
    <div className={`form-input pw ${id}`}>
      <label htmlFor={id}>{label}</label>
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        value={value}
        onChange={onChange}
        maxLength={20}
        autoComplete="off"
      />
      <button className="show-password" name={id} onClick={setShowPassword} type="button">
        {showPassword ? (
          <AiFillEyeInvisible className="icon" />
        ) : (
          <AiFillEye className="icon" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
