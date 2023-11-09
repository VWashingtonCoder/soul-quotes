import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type FormInputProps = {
  label: string;
  type: string;
  id: string;
  value: string;
  textChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  areaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  selectChange?: (category: string) => void;
  showPassword?: boolean;
  setShowPassword?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const categories = [
  { key: "all", label: "All Categories" },
  { key: "inspirational", label: "Inspirational" },
  { key: "love", label: "Love/Relationships" },
  { key: "philosophy", label: "Philosophy" },
  { key: "success", label: "Career/Success" },
  { key: "funny", label: "Funny" },
];

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
    selectChange,
  } = props;

  const setSearchCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectChange && selectChange(e.target.value);
  };

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
        <textarea id={id} value={value} onChange={areaChange} maxLength={200} />
      )}

      {type === "select" && (
        <select
          id={id}
          onChange={setSearchCategory}
          value={value}
        >
          {categories.map((category) => (
            <option key={category.key} value={category.key}>
              {category.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default FormInput;
