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
};

export default function FormInputBase(props: FormInputBaseProps) {
  const { input, value, change } = props;
  const { id, label, type, placeholder } = input;
  return (
    <div>
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input
        className="input-field"
        type={type}
        id={id}
        value={value}
        onChange={change}
        placeholder={placeholder}
      />
    </div>
  );
}
