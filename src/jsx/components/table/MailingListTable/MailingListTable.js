import React, { useEffect, useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useTable,
} from "react-table";
import {
  addListingPOST,
  deleteListing,
  getEmailList,
} from "../../../../helpers/helperFuncs";
import PageTitle from "../../../layouts/PageTitle";
import AddListingForm from "./AddLisitingForm";
import { MAILING_COLUMNS } from "./Columns";
import { EditButton } from "./EditButton";
import EditListingForm from "./EditListingForm";
import "./filtering.css";

export const MailingListTable = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addListingModal, setAddModal] = useState(false);
  const [emailList, setEmailList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handleAddListing = async (values, setFieldError) => {
    try {
      const data = await addListingPOST(values.email);
      setAddModal(false);
      this.forceUpdate();
    } catch (err) {
      setFieldError("email", "asdasd");
    }
  };
  const handleEditListing = (e) => {
    e.preventDefault();
    console.log(`here`);
    setEditModal(false);
  };
  const handleDeleteListing = () => {
    deleteListing(deleteId);
    setDeleteModal(false);
    setDeleteId(null);
  };
  const columns = useMemo(() => MAILING_COLUMNS, []);
  const data = useMemo(() => emailList, [emailList]);
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    gotoPage,
    pageCount,
    pageOptions,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = tableInstance;

  const { pageIndex } = state;

  useEffect(() => {
    async function fetchEmailList() {
      const data = await getEmailList();
      setEmailList(data.data);
    }
    fetchEmailList();
  }, []);

  return (
    <>
      {/* Add Listing Modal Based on AddListingModal State*/}
      <Modal className="fade" show={addListingModal}>
        <Modal.Header>
          <Modal.Title>Add Listing</Modal.Title>
          <Button
            variant=""
            className="btn-close"
            onClick={() => setAddModal(false)}
          ></Button>
        </Modal.Header>
        <Modal.Body>
          <AddListingForm onSubmit={handleAddListing} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setAddModal(false)} variant="danger light">
            Cancel
          </Button>
          <Button form="addListing" type="submit" variant="danger">
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal Based on editModal State*/}
      <Modal className="fade" show={editModal}>
        <Modal.Header>
          <Modal.Title>Edit Listing</Modal.Title>
          <Button
            variant=""
            className="btn-close"
            onClick={() => setEditModal(false)}
          ></Button>
        </Modal.Header>
        <Modal.Body>
          <EditListingForm onSubmit={handleEditListing} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setEditModal(false)} variant="danger light">
            Cancel
          </Button>
          <Button type="submit" form="editListing" variant="danger">
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal Based On deleteModal State */}
      <Modal className="fade" show={deleteModal}>
        <Modal.Header>
          <Modal.Title>Delete Listing</Modal.Title>
          <Button
            variant=""
            className="btn-close"
            onClick={() => {
              setEditId(null);
              setDeleteModal(false);
            }}
          ></Button>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this person from the mailing list?
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setEditId(null);
              setDeleteModal(false);
            }}
            variant="danger light"
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteListing} variant="danger">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <PageTitle activeMenu="Mailing List" motherMenu="Mail" />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Mailing List</h4>
          <Button onClick={() => setAddModal(true)} variant="outline-primary">
            {" "}
            + Add Listing
          </Button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table {...getTableProps()} className="table dataTable display">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => {
                      return (
                        <th
                          style={{
                            verticalAlign: "middle",
                            textAlign:
                              column.Header === "edit" ? "end" : "start",
                            width: column.Header === "id" ? "15%" : "100%",
                          }}
                          {...column.getHeaderProps()}
                        >
                          {column.render("Header")}
                          {column.canFilter ? column.render("Filter") : null}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="">
                {page.map((row) => {
                  row.values.edit = (
                    <EditButton
                      setDeleteModal={setDeleteModal}
                      setEditModal={setEditModal}
                      id={row.original._id}
                      setEditId={setEditId}
                      setDeleteId={setDeleteId}
                    />
                  );
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps({
                              className:
                                cell.column.id === "edit" ? "text-end" : "",
                            })}
                          >
                            {" "}
                            {cell.render("Cell")}{" "}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="d-flex justify-content-between">
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
                {""}
              </span>
              <span className="table-index">
                Go to page :{" "}
                <input
                  type="number"
                  className="ml-2"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                />
              </span>
            </div>
            <div className="text-center mb-3">
              <div className="filter-pagination  mt-3">
                <button
                  className=" previous-button"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  {"<<"}
                </button>

                <button
                  className="previous-button"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Previous
                </button>
                <button
                  className="next-button"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  Next
                </button>
                <button
                  className=" next-button"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  {">>"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MailingListTable;
