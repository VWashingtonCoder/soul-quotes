import styled from "styled-components";

type SelectProps = {
  value: string;
  change?: (e: {
    target: {
      name: string,
      value: string
    };
  }) => void;
  update?: (e: {
    target: {
      value: string;
    };
  }) => void;
};

const categories = [
  { key: "all", label: "All Categories" },
  { key: "inspirational", label: "Inspirational" },
  { key: "love", label: "Love/Relationships" },
  { key: "philosophy", label: "Philosophy" },
  { key: "success", label: "Career/Success" },
  { key: "funny", label: "Funny" },
];

const CategorySelectStyles = styled.select`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333;
  font-size: 1.55rem;
  padding: 0.25rem 0.5rem;
`;

export function CategorySelect({ change, update, value }: SelectProps) {
  return (
    <CategorySelectStyles 
      onChange={update ? update : change} 
      name="category" 
      value={value}
    >
      {categories.map((category) => (
        <option key={category.key} value={category.key}>
          {category.label}
        </option>
      ))}
    </CategorySelectStyles>
  );
}
