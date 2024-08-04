import { createContext } from "react";
import { useState, useContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {children}
    </SearchContext.Provider>
  );
};

// hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
