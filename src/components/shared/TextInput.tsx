type TextInputProps = {
  label: string;
  type: string;
  id: string;
  value: string;
  textChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  areaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextInput = (props: TextInputProps) => {
  const { label, type, id, value, textChange, areaChange } = props;

  return (
    <div className={`form-input text ${id}`}>
      <label htmlFor={id}>{label}</label>
      {type !== "textarea" ? (
        <input
          type={type}
          id={id}
          value={value}
          onChange={textChange}
          autoComplete="off"
        />
      ) : (
        <textarea
          id={id}
          value={value}
          onChange={areaChange}
          autoComplete="off"
        />
      )}
    </div>
  );
};

export default TextInput;
