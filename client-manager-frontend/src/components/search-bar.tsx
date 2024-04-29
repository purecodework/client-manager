const SearchBar = ({ value, onChange }: any) => {
  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        placeholder="Search by name..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
