import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import { Row, Col, Card, Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";

import { Input } from "../creatdComponents/Input";
import { createUser, deleteUser, updateUser } from "../../../lib/userCRUD";
import { YupUserSchema, yupOrganizationSchema } from "../../../lib/YupSchemas";
import SortingTH from "../creatdComponents/SortingTH";
import SearchByInput from "../creatdComponents/SeachByInput";
import { useSearchParams } from "react-router-dom";
import swal from "sweetalert";

const organizationsKeysObj = [
   "organizationName",
   "organizationPhoneNumber",
   "organizationContactName",
   "organizationEmail",
   "organizationMessageBody",
   "organizationType",
   "status",
];
const fields = {
   organizationName: "Organization name",
   organizationPhoneNumber: "Phone",
   organizationContactName: "Contact",
   organizationEmail: "Email",
   organizationMessageBody: "Message",
   organizationType: "Organization Type",
   status: "Status",
};

const OrganizationsCRM = () => {
   const [organizations, setOrganizations] = useState([]);
   const [basicModal, setBasicModal] = useState(false);
   // const [searchParams, setSearchParams] = useSearchParams();
   // const sortOrder = searchParams.get("sortOrder");

   useEffect(() => {
      fetchOrganizations();
   }, []);

   const API_URI = "https://kibbutzil.online/organizations";

   async function fetchOrganizations() {
      const res = await axios.get(API_URI);
      setOrganizations(res.data);
   }

   // async function searchUser(search) {
   //    const { searchBy, searchValue } = search;
   //    try {
   //       const user = await axios.post(API_URI, {
   //          [searchBy]: searchValue,
   //       });
   //       setOrganizations(user.data);
   //    } catch (error) {
   //       console.log(error);
   //    }
   // }

   async function handleDelete(id) {
      try {
         await axios.delete(`${API_URI}/${id}`);
         fetchOrganizations();
         swal("OK", "Successfully deleted", "success");
      } catch (error) {
         swal("Oops", "Something went wrong!", "error");
         console.log(error);
      }
   }

   //User table row Component
   const OrganizationTr = ({ organization = {}, index = 1 }) => {
      // if (!user.fullName) return;
      return (
         <tr>
            <td>{index + 1}</td>
            {organizationsKeysObj.map((key) => {
               if (key === "status") {
                  const value = organization[key];
                  return (
                     <td className="py-2 text-center" key={organization[key]}>
                        {value === "active" ? (
                           <i class="bi bi-circle-fill text-success fs-4"></i>
                        ) : (
                           <i class="bi bi-circle-fill text-danger fs-4"></i>
                        )}
                     </td>
                  );
               }
               return (
                  <td className="py-2" key={organization[key]}>
                     {organization[key]}
                  </td>
               );
            })}

            {/*CRM  */}
            <td className="py-2 ">
               <div className="d-flex">
                  <Button
                     className="me-2 btn-sm"
                     variant="warning btn-rounded"
                     onClick={() => {
                        form.setValues(organization);
                        setBasicModal(true);
                     }}
                  >
                     <i className="bi bi-pencil-square fs-5"></i>
                  </Button>
                  <Button
                     onClick={() => handleDelete(organization._id)}
                     className="me-2 btn-sm"
                     variant="primary btn-rounded"
                  >
                     <i className="bi bi-trash fs-5"></i>
                  </Button>
               </div>
            </td>
         </tr>
      );
   };

   //Formik

   const form = useFormik({
      validateOnMount: true,
      abortEarly: false,
      initialValues: {
         organizationName: "",
         organizationPhoneNumber: "",
         organizationContactName: "",
         organizationEmail: "",
         organizationMessageBody: "",
         organizationType: "",
         status: "active",
      },
      validationSchema: yupOrganizationSchema(),

      async onSubmit(values) {
         const processedValues = await yupOrganizationSchema().validate(values);
         try {
            if (form.values._id) {
               await axios.put(
                  `${API_URI}/${form.values._id}`,
                  processedValues
               );
               swal("OK", "Successfully edited", "success");
            } else {
               const res = await axios.post(API_URI, processedValues);
               swal("OK", "Successfully added", "success");
            }
            form.resetForm();
            setBasicModal(false);
            fetchOrganizations();
         } catch (error) {
            swal("Oops", "Something went wrong!", "error");
            console.log(error);
         }
      },
   });

   return (
      <Fragment>
         <PageTitle activeMenu="Organizations table CRM" motherMenu="Tables" />
         <Row>
            <Col lg={12}>
               <Card>
                  <Card.Header className="gap-3">
                     <Card.Title className="col-2">Organizations</Card.Title>

                     {/* <SearchByInput
                        onSearchClick={searchUser}
                        onResetClick={fetchUsers}
                     /> */}

                     <Button
                        className="me-2 col-2"
                        variant="outline-primary"
                        onClick={() => setBasicModal(true)}
                     >
                        + Add new Organization
                     </Button>
                  </Card.Header>
                  <Card.Body>
                     <Table responsive hover>
                        <thead>
                           <tr>
                              <th>#</th>
                              {organizationsKeysObj.map((key) => (
                                 <th key={fields[key]}>{fields[key]}</th>
                              ))}
                              <th>CRM</th>
                           </tr>
                        </thead>
                        <tbody>
                           {organizations.map((organization, index) => (
                              <OrganizationTr
                                 key={organization}
                                 organization={organization}
                                 index={index}
                              />
                           ))}
                        </tbody>
                     </Table>
                  </Card.Body>
               </Card>
               {/* <!-- /# card --> */}
            </Col>
         </Row>

         {/* <!-- Modal --> */}
         <Modal
            className="fade"
            show={basicModal}
            dialogClassName="modal-dialog-centered
                modal-dialog-scrollable"
         >
            <Modal.Header>
               <Modal.Title>New Organization</Modal.Title>

               <Button
                  variant=""
                  className="btn-close"
                  onClick={() => {
                     // setBasicModal(false);
                     // form.resetForm();
                  }}
               ></Button>
            </Modal.Header>
            <Modal.Body>
               <div className="basic-form">
                  <form onSubmit={form.handleSubmit}>
                     {organizationsKeysObj.map((key) => {
                        if (key === "status") {
                           return (
                              <div className="form-group mb-3 row">
                                 <label
                                    htmlFor="status"
                                    className="col-sm-3 col-form-label"
                                 >
                                    Status
                                 </label>
                                 <div className="col-sm-9">
                                    <select
                                       className="form-select"
                                       style={{ height: "3rem" }}
                                       id="status"
                                       name="status"
                                       value={form.values.status}
                                       onChange={form.handleChange}
                                    >
                                       <option value="active" defaultValue>
                                          Active
                                       </option>
                                       <option value="inactive">
                                          Inactive
                                       </option>
                                    </select>
                                 </div>
                              </div>
                           );
                        }
                        return (
                           <Input
                              label={fields[key]}
                              error={form.touched[key] && form.errors[key]}
                              {...form.getFieldProps(key)}
                              key={key}
                              required={
                                 key === "organizationType" ? false : true
                              }
                           />
                        );
                     })}
                     {/* role */}
                  </form>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button
                  onClick={() => {
                     setBasicModal(false);
                     form.resetForm();
                  }}
                  type="reset"
                  variant="danger light"
                  size="lg"
               >
                  Close
               </Button>
               <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  onClick={form.handleSubmit}
               >
                  {form.values._id ? "Edit" : "Add"}
               </Button>
            </Modal.Footer>
         </Modal>
      </Fragment>
   );
};

export default OrganizationsCRM;
