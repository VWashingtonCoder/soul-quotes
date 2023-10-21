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
    <div className={`form-input ${id}`}>
      <label htmlFor={id}>{label}</label>
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        value={value}
        onChange={onChange}
      />
      <button
        className="show-password"
        name={id}
        onClick={setShowPassword}
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
  );
};

export default PasswordInput;