type CategorySelectProps = {
  searchCategory: string;
  setSearchCategory: (category: string) => void;
  searchFunction: () => void;
};

const categories = [
  { key: "all", label: "All Categories" },
  { key: "inspirational", label: "Inspirational" },
  { key: "love", label: "Love/Relationships" },
  { key: "philosophy", label: "Philosophy" },
  { key: "success", label: "Career/Success" },
  { key: "funny", label: "Funny" },
];

function CategorySelect({
  searchCategory,
  setSearchCategory,
  searchFunction,
}: CategorySelectProps) {
  return (
    <div className="category-select">
      <label htmlFor="category">Select a category:</label>
      <select
        name="category"
        onChange={(e) => setSearchCategory(e.target.value)}
        value={searchCategory}
      >
        {categories.map((category) => (
          <option key={category.key} value={category.key}>
            {category.label}
          </option>
        ))}
      </select>
      <button
        className="search-btn"
        onClick={(e) => (e.preventDefault(), searchFunction())}
      >
        Search
      </button>
    </div>
  );
}

export default CategorySelect;
