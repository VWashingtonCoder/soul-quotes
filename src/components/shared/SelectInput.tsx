type SelectInputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const categories = [
  { key: "all", label: "All Categories" },
  { key: "inspirational", label: "Inspirational" },
  { key: "love", label: "Love/Relationships" },
  { key: "philosophy", label: "Philosophy" },
  { key: "success", label: "Career/Success" },
  { key: "funny", label: "Funny" },
];

const SelectInput = (props: SelectInputProps) => {
  const { label, value, onChange } = props;

  return (
    <div className={`form-input select`}>
      <label htmlFor="category">{label}</label>
      <select id="category" onChange={onChange} value={value}>
        {categories.map((category) => (
          <option key={category.key} value={category.key}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
