type CategorySelectProps = {
  searchCategory: string;
  setSearchCategory: (category: string) => void;
  searchFunction?: () => void;
  noSearch?: boolean;
};

const categories = [
  { key: "all", label: "All Categories" },
  { key: "inspirational", label: "Inspirational" },
  { key: "love", label: "Love/Relationships" },
  { key: "philosophy", label: "Philosophy" },
  { key: "success", label: "Career/Success" },
  { key: "funny", label: "Funny" },
];

const CategorySelect = (props: CategorySelectProps) => {
  const { searchCategory, setSearchCategory, searchFunction, noSearch } = props;
  const categorySearchFunction =
    searchFunction ||
    (() => {
      return;
    });
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
      {!noSearch && (
        <button
          className="search-btn"
          onClick={(e) => (e.preventDefault(), categorySearchFunction())}
        >
          Search
        </button>
      )}
    </div>
  );
};

export default CategorySelect;
