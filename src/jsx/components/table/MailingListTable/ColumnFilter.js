import React from "react";

export const mailingColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <div>
      <input
        className={`${
          column.Header === "id" ? "w-50" : "w-25"
        } form-control input-search`}
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};
