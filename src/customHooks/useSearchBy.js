import { useState } from "react";

function useSearchBy(defaultSearchBy = "", defaultSearchValue = "") {
   const [search, setSearch] = useState({
      searchBy: defaultSearchBy,
      searchValue: defaultSearchValue,
   });

   function setSearchBy(filter) {
      setSearch((search) => ({ ...search, searchBy: filter }));
   }

   function setSearchValue(value) {
      setSearch((search) => ({ ...search, searchValue: value }));
   }

   return {
      search,
      setSearchBy,
      setSearchValue,
   };
}

export default useSearchBy;
