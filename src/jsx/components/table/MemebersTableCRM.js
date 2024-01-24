import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import { Row, Col, Card, Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";

import { fields } from "../../../lib/tableFields";
import { Input } from "../creatdComponents/Input";
import { fetchUsers } from "../../../lib/fetchUsers";
import { YupUserSchema } from "../../../lib/YupMemberSchema";

const MembersTableCRM = () => {
   const [users, setUsers] = useState([]);
   const [basicModal, setBasicModal] = useState(false);
   const [serverError, setServerError] = useState(null);

   const API_URI = "https://65a8294194c2c5762da86419.mockapi.io/users";

   useEffect(() => {
      fetchUsers(API_URI)
         .then((allMembers) => setUsers(allMembers))
         .catch(console.log);
   }, []);

   //User table row Component
   const MemberTr = ({ user = {}, index = 1 }) => {
      if (!user.firstName) return;
      return (
         <tr>
            <th className="align-middle">{index + 1}</th>
            {/*fullName  */}
            <td className="py-2">{user.firstName + " " + user.lastName}</td>
            {/*email  */}
            <td className="py-2">{user.email}</td>
            {/*role  */}
            <td className="py-2">{user.role}</td>
            {/*location  */}
            <td className="py-2">{user.location}</td>
            {/*phoneNumber  */}
            <td className="py-2">{user.phoneNumber}</td>
            {/*gender  */}
            <td className="py-2">{user.gender ? "Male" : "Female"}</td>
            {/*CRM  */}
            <td className="py-2 ">
               <div class="d-flex">
                  <Button
                     className="me-2 btn-sm"
                     variant="warning btn-rounded"
                     onClick={() => {
                        form.setValues({
                           user,
                           gender: user.gender ? "Male" : "Female",
                        });
                        setBasicModal(true);
                     }}
                  >
                     <i className="bi bi-pencil-square fs-5"></i>
                  </Button>
                  <Button
                     onClick={() => {
                        axios
                           .delete(
                              `https://65a8294194c2c5762da86419.mockapi.io/users/${user.id}`
                           )
                           .then((res) => fetchUsers());
                     }}
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

   const YupNewMemberSchema = YupUserSchema().pick([
      "firstName",
      "lastName",
      "email",
      "role",
      "location",
      "phoneNumber",
      "gender",
      "positionAntilNow",
      "fecerPosition",
      "yearExperience",
      "linkdinURL",
   ]);

   //Formik
   const form = useFormik({
      validateOnMount: true,

      initialValues: {
         firstName: "",
         lastName: "",
         email: "",
         role: "",
         location: "",
         phoneNumber: "",
         gender: "",
         positionAntilNow: "",
         fecerPosition: "",
         yearExperience: "",
         linkdinURL: "",
      },
      validationSchema: YupNewMemberSchema,

      async onSubmit(values) {
         const processedValues = YupNewMemberSchema().validateSync(values);
         try {
            if (form.values.id) {
               await axios.put(`${API_URI}/${form.values.id}`, processedValues);
            } else {
               await axios.post(`${API_URI}`, processedValues);
            }

            form.resetForm();
            fetchUsers();
         } catch (error) {
            console.log(error);
         }
      },
   });

   return (
      <Fragment>
         <PageTitle activeMenu="Members table CRM" motherMenu="Tables" />
         <Row>
            <Col lg={12}>
               <Card>
                  <Card.Header>
                     <Card.Title>Members</Card.Title>
                     <Button
                        className="me-2"
                        variant="outline-primary"
                        onClick={() => setBasicModal(true)}
                     >
                        + Add new member
                     </Button>
                  </Card.Header>
                  <Card.Body>
                     <Table responsive hover>
                        <thead>
                           <tr>
                              <th>#</th>
                              <th>{fields.fullName}</th>
                              <th>{fields.email}</th>
                              <th>{fields.role}</th>
                              <th>{fields.location}</th>
                              <th>{fields.phoneNumber}</th>
                              <th>{fields.gender}</th>
                              <th>CRM</th>
                           </tr>
                        </thead>
                        <tbody>
                           {users
                              .map((user, index) => (
                                 <MemberTr
                                    key={index}
                                    user={user}
                                    index={index}
                                 />
                              ))
                              .sort()}
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
                     setBasicModal(false);
                     form.resetForm();
                  }}
               ></Button>
            </Modal.Header>
            <Modal.Body>
               <div className="basic-form">
                  <form onSubmit={(e) => e.preventDefault()}>
                     {/* first name */}

                     <Input
                        label={fields.firstName}
                        domName="firstName"
                        error={form.touched.firstName && form.errors.firstName}
                        required
                        {...form.getFieldProps("firstName")}
                     />

                     {/* last name */}

                     <Input
                        label="Last Name"
                        domName="lastName"
                        error={form.touched.lastName && form.errors.lastName}
                        required
                        {...form.getFieldProps("lastName")}
                     />

                     {/* email */}
                     <Input
                        label="Email"
                        domName="email"
                        error={form.touched.email && form.errors.email}
                        type="email"
                        required
                        {...form.getFieldProps("email")}
                     />
                     {/* phoneNumber */}
                     <Input
                        label="Phone"
                        domName="phoneNumber"
                        error={
                           form.touched.phoneNumber && form.errors.phoneNumber
                        }
                        required
                        {...form.getFieldProps("phoneNumber")}
                     />

                     {/* role */}
                     <Input
                        label="Role"
                        domName="role"
                        error={form.touched.role && form.errors.role}
                        {...form.getFieldProps("role")}
                     />

                     {/* location */}
                     <Input
                        label="Location"
                        domName="location"
                        error={form.touched.location && form.errors.location}
                        {...form.getFieldProps("location")}
                     />

                     {/* gender */}
                     <div className="form-group mb-3 row">
                        <label className="col-sm-3 col-form-label">
                           Gender
                        </label>
                        <div className="col-sm-9">
                           <select
                              defaultValue="default"
                              className="form-select"
                              style={{ height: "3rem" }}
                              id="sel1"
                              {...form.getFieldProps("gender")}
                           >
                              <option value="">Choose...</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                           </select>
                        </div>
                     </div>

                     {/* positionAntilNow */}
                     <Input
                        label="positionAntilNow"
                        domName="positionAntilNow"
                        error={
                           form.touched.positionAntilNow &&
                           form.errors.positionAntilNow
                        }
                        {...form.getFieldProps("positionAntilNow")}
                     />

                     {/* fecerPosition */}
                     <Input
                        label="fecerPosition"
                        domName="fecerPosition"
                        error={
                           form.touched.fecerPosition &&
                           form.errors.fecerPosition
                        }
                        {...form.getFieldProps("fecerPosition")}
                     />

                     {/* yearExperience */}
                     <Input
                        label="yearExperience"
                        domName="yearExperience"
                        error={
                           form.touched.yearExperience &&
                           form.errors.yearExperience
                        }
                        {...form.getFieldProps("yearExperience")}
                     />

                     {/* linkdinURL */}
                     <Input
                        label="linkdinURL"
                        domName="linkdinURL"
                        error={
                           form.touched.linkdinURL && form.errors.linkdinURL
                        }
                        {...form.getFieldProps("linkdinURL")}
                     />
                  </form>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button
                  onClick={() => {
                     setBasicModal(false);
                     form.resetForm();
                  }}
                  variant="danger light"
               >
                  Close
               </Button>
               <Button
                  onClick={() => {
                     form.handleSubmit();

                     setBasicModal(false);
                  }}
                  variant="primary"
               >
                  {form.values.id ? "Edit member" : "Add member"}
               </Button>
            </Modal.Footer>
         </Modal>
      </Fragment>
   );
};

export default MembersTableCRM;
