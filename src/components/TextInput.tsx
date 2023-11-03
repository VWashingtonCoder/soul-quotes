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
    <div className={`form-input ${id}`}>
      <label htmlFor={id}>{label}</label>
      {type === "text" && (
        <input type={type} id={id} value={value} onChange={onChange} />
      )}
      {type === "textarea" && (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          cols={30}
          rows={3}
        />
      )}
    </div>
  );
};

export default TextInput;
