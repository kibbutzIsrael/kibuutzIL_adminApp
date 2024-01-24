export const Input = ({ label, error, ...rest }) => {
   return (
      <div className="mb-3 row">
         <label htmlFor={rest.name} className="col-sm-3 col-form-label">
            {label}
            {rest.required && <span className="text-primary">*</span>}
         </label>
         <div className="col-sm-9">
            <input
               {...rest}
               id={rest.name}
               type={rest.type || "text"}
               className={["form-control", error && "is-invalid"].join(" ")}
            />

            <span className="invalid-feedback">{error}</span>
         </div>
      </div>
   );
};
