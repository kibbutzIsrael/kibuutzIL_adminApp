import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import { Row, Col, Card, Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";

import { Input } from "../creatdComponents/Input";
import { createUser, deleteUser, updateUser } from "../../../lib/userCRUD";
import { YupUserSchema } from "../../../lib/YupMemberSchema";
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
];
const fields = {
   organizationName: "Organization name",
   organizationPhoneNumber: "Phone",
   organizationContactName: "Contact",
   organizationEmail: "Email",
   organizationMessageBody: "Message",
   organizationType: "Organization Type",
};

const OrganizationsCRM = () => {
   const [organizations, setOrganizations] = useState([]);
   const [basicModal, setBasicModal] = useState(false);
   // const [searchParams, setSearchParams] = useSearchParams();
   // const sortOrder = searchParams.get("sortOrder");

   useEffect(() => {
      getOrganizations();
   }, []);

   const API_URI = "https://kibbutzil.online/organizations";

   async function getOrganizations() {
      const res = await axios.get(API_URI);
      setOrganizations(res.data);
   }

   async function searchUser(search) {
      const { searchBy, searchValue } = search;
      try {
         const user = await axios.post(API_URI, {
            [searchBy]: searchValue,
         });
         setOrganizations(user.data);
      } catch (error) {
         console.log(error);
      }
   }

   // async function handleDelete(user) {
   //    try {
   //       await deleteUser(API_URI, user._id);
   //       fetchUsers();
   //       swal("OK", "Successfully deleted", "success");
   //    } catch (error) {
   //       swal("Oops", "Something went wrong!", "error");
   //       console.log(error);
   //    }
   // }

   //User table row Component
   const OrganizationTr = ({ organization = {}, index = 1 }) => {
      // if (!user.fullName) return;
      return (
         <tr>
            {organizationsKeysObj.map((key) => (
               <td className="py-2">{organization[key]}</td>
            ))}

            {/*CRM  */}
            <td className="py-2 ">
               <div className="d-flex">
                  <Button
                     className="me-2 btn-sm"
                     variant="warning btn-rounded"
                     onClick={() => {
                        // form.setValues(user);
                        // setBasicModal(true);
                     }}
                  >
                     <i className="bi bi-pencil-square fs-5"></i>
                  </Button>
                  <Button
                     onClick={() => {}}
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
   /*
   const YupNewVolunteerSchema = YupUserSchema().pick([
      "fullName",
      "email",
      "location",
      "phoneNumber",
      "gender",
      "positionAntilNow",
      "fecerPosition",
      "yearExperience",
      "linkdinURL",
   ]);

   const form = useFormik({
      validateOnMount: true,

      initialValues: {
         fullName: "",
         email: "",
         location: "",
         phoneNumber: "",
         gender: "",
         positionAntilNow: "",
         fecerPosition: "",
         yearExperience: "",
         linkdinURL: "",
      },
      validationSchema: YupNewVolunteerSchema,

      async onSubmit(values) {
         const processedValues = YupNewVolunteerSchema.validateSync(values);
         try {
            if (form.values._id) {
               await updateUser(API_URI, form.values._id, processedValues);
               swal("OK", "Successfully edited", "success");
            } else {
               await createUser(API_URI, processedValues);
               swal("OK", "Successfully added", "success");
            }
            form.resetForm();
            getOrganizations();
         } catch (error) {
            swal("Oops", "Something went wrong!", "error");
            console.log(error);
         }
      },
   });
   */

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
                              {organizationsKeysObj.map((key) => (
                                 <th>{fields[key]}</th>
                              ))}
                           </tr>
                        </thead>
                        <tbody>
                           {organizations.map((organization, index) => (
                              <OrganizationTr
                                 key={index}
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
               <Modal.Title>Modal title</Modal.Title>
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
                  <form></form>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button
                  onClick={() => {
                     // setBasicModal(false);
                     // form.resetForm();
                  }}
                  variant="danger light"
               >
                  Close
               </Button>
               <Button
                  onClick={() => {
                     // form.handleSubmit();
                     // setBasicModal(false);
                  }}
                  variant="primary"
               >
                  Send
                  {/* {form.values._id ? "Edit member" : "Add member"} */}
               </Button>
            </Modal.Footer>
         </Modal>
      </Fragment>
   );
};

export default OrganizationsCRM;
