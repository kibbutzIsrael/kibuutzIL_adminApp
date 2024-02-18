const SortingTH = ({
   title = "No Title",
   setSortBy = () => {},
   sortBy = "",
   filter = { sortBy: "", asc: "", desc: "" },
}) => {
   return (
      <th className="p-0">
         <button
            className="btn ps-2"
            onClick={() =>
               setSortBy((sortBy) =>
                  sortBy === filter.asc ? filter.desc : filter.asc
               )
            }
         >
            <span className="h4">{title}</span>
            <span>
               {!sortBy.startsWith(filter.sortBy) && (
                  <i
                     className="fa fa-sort ms-2 fs-14"
                     style={{ opacity: "0.7" }}
                  />
               )}
               {sortBy === filter.asc && (
                  <i
                     className="fa fa-arrow-down ms-2 fs-14"
                     style={{ opacity: "0.7" }}
                  />
               )}
               {sortBy === filter.desc && (
                  <i
                     className="fa fa-arrow-up ms-2 fs-14"
                     style={{ opacity: "0.7" }}
                  />
               )}
            </span>
         </button>
      </th>
   );
};

export default SortingTH;
