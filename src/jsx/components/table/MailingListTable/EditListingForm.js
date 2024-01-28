const EditListingForm = ({ onSubmit }) => {
  return (
    <form id="editListing" onSubmit={(e) => onSubmit(e)}>
      <div className="form-group mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control input-default "
          placeholder="Email"
        />
      </div>
    </form>
  );
};

export default EditListingForm;
