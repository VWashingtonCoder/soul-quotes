import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import styled from "styled-components";

type FormInputBaseProps = {
  input: {
    key: string;
    id: string;
    label: string;
    type: string;
    placeholder: string;
  };
  value: string;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  showPasswordClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const InputBaseStyles = styled.div`
  // border: 1px solid red;
`;

export default function FormInputBase(props: FormInputBaseProps) {
  const { input, value, change, showPassword, showPasswordClick } = props;
  const { id, label, type, placeholder } = input;
  const passwordType = showPassword ? "text" : type;

  return (
    <div className="input-base">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input
        className="input-field"
        type={
          id === "password" || id === "confirmPassword" ? passwordType : type
        }
        id={id}
        value={value}
        onChange={change}
        placeholder={placeholder}
      />
      {(id === "password" || id === "confirmPassword") && (
        <button className="show-btn" onClick={showPasswordClick}>
          {showPassword ? (
            <AiFillEyeInvisible className="icon hide" />
          ) : (
            <AiFillEye className="icon show" />
          )}
        </button>
      )}
    </div>
  );
}
