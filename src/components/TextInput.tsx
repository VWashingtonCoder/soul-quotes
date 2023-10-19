type TextInputProps = {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = (props: TextInputProps) => {
  const { label, type, id, value, onChange } = props;

  return (
    <div className={`form-input ${id}`}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} value={value} onChange={onChange} />
    </div>
  )
}

export default TextInput;
