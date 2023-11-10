type TextInputProps = {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
};

const TextInput = (props: TextInputProps) => {
  const { label, type, id, value, onChange } = props;

  return (
    <div className={`form-input text ${id}`}>
      <label htmlFor={id}>{label}</label>
      {type !== "textarea" ? (
        <input type={type} id={id} value={value} onChange={onChange} />
      ) : (
        <textarea id={id} value={value} onChange={onChange} />
      )}
    </div>
  );
};

export default TextInput;
