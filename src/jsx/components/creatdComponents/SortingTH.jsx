import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SortingTH = ({
   title = "No Title",

   filter = { sortBy: "Name", asc: "Name-A-B", desc: "Name-B-A" },
}) => {
   const [searchParams, setSearchParams] = useSearchParams();

   const sortOrder = searchParams.get("sortOrder");

   function handleSort() {
      const sortBy = sortOrder === filter.asc ? filter.desc : filter.asc;
      setSearchParams({ sortOrder: sortBy });
   }

   return (
      <th className="p-0">
         <button className="btn ps-2" onClick={handleSort}>
            <span className="h4">{title}</span>
            <span>
               {!sortOrder.startsWith(filter.sortBy) && (
                  <i
                     className="fa fa-sort ms-2 fs-14"
                     style={{ opacity: "0.7" }}
                  />
               )}
               {sortOrder === filter.asc && (
                  <i
                     className="fa fa-arrow-down ms-2 fs-14"
                     style={{ opacity: "0.7" }}
                  />
               )}
               {sortOrder === filter.desc && (
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
