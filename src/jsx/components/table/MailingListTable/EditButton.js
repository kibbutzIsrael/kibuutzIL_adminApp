import { Dropdown } from "react-bootstrap";

export const EditButton = ({
  id,
  setEditId,
  setDeleteId,
  setEditModal,
  setDeleteModal,
}) => {
  const svg1 = (
    <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect x="0" y="0" width="24" height="24"></rect>
        <circle fill="#000000" cx="5" cy="12" r="2"></circle>
        <circle fill="#000000" cx="12" cy="12" r="2"></circle>
        <circle fill="#000000" cx="19" cy="12" r="2"></circle>
      </g>
    </svg>
  );

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" className="light sharp i-false">
        {svg1}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => {
            setEditId(id);
            setEditModal(true);
          }}
        >
          Edit
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setDeleteId(id);
            setDeleteModal(true);
          }}
        >
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
