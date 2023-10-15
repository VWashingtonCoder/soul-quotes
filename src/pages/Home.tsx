const categories = [
  { key: "all", label: "All Categories" },
  { key: "inspirational", label: "Inspirational" },
  { key: "love", label: "Love/Relationships" },
  { key: "philosophy", label: "Philosophy" },
  { key: "success", label: "Career/Success" },
  { key: "funny", label: "Funny" },
];

function Home() {
  return (
    <section className="page home">
      <header>
        Welcome to Soul Quotes! This is a place to find inspiration and share
        your own quotes.
      </header>

      <div className="category-select">
        <label htmlFor="CategorySelect">Select a category:</label>
        <select
          name="category"
          id="CategorySelect"
          onChange={() => console.log("change")}
        >
          {categories.map((category) => (
            <option key={category.key} value={category.key}>
              {category.label}
            </option>
          ))}
        </select>
        <button
          className="search-btn"
          onClick={(e) => (e.preventDefault(), console.log("click"))}
        >
          Search
        </button>
      </div>

      
    </section>
  );
}

export default Home;
