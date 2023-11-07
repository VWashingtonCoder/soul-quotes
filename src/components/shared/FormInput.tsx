import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type FormInputProps = {
  label: string;
  type: string;
  id: string;
  value: string;
  textChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  areaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  showPassword?: boolean;
  setShowPassword?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const FormInput = (props: FormInputProps) => {
  const {
    label,
    type,
    id,
    value,
    textChange,
    areaChange,
    showPassword,
    setShowPassword,
  } = props;

  return (
    <div className={`form-input ${id}`}>
      <label htmlFor={id}>{label}</label>
      {(type === "text" || type === "email") && (
        <input type={type} id={id} value={value} onChange={textChange} />
      )}

      {type === "password" && (
        <>
          <input
            type={showPassword ? "text" : "password"}
            id={id}
            value={value}
            onChange={textChange}
            maxLength={20}
          />
          <button className="show-password" name={id} onClick={setShowPassword}>
            {showPassword ? (
              <AiFillEyeInvisible className="icon" />
            ) : (
              <AiFillEye className="icon" />
            )}
          </button>
        </>
      )}

      {type === "textarea" && (
        <textarea
          id={id}
          value={value}
          onChange={areaChange}
          cols={30}
          rows={3}
        />
      )}
    </div>
  );
};

export default FormInput;
