import useSearchBy from "../../../customHooks/useSearchBy";

const SearchByInput = ({ onSearchClick, onResetClick }) => {
   const { search, setSearchBy, setSearchValue } = useSearchBy("email");

   function handleSearch() {
      onSearchClick(search);
   }

   function handleReset() {
      onResetClick();
   }

   return (
      <div className="input-group">
         <span className="input-group-text">Search By</span>
         <select
            defaultValue={"email"}
            className="btn btn-primary"
            onChange={(e) => setSearchBy(e.target.value)}
         >
            <option value={"email"}>Email</option>
            <option value={"phoneNumber"}>Phone</option>
         </select>

         <input
            onChange={(e) => setSearchValue(e.target.value)}
            value={search.searchValue}
            type="text"
            className="form-control left-radius"
         />
         <button className="btn btn-primary" onClick={handleSearch}>
            Search
         </button>
         <button className="btn btn-primary light" onClick={handleReset}>
            Reset
         </button>
      </div>
   );
};

export default SearchByInput;
