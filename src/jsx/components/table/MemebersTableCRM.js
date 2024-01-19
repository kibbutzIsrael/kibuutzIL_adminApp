import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import {
   Row,
   Col,
   Card,
   Table,
   Badge,
   Dropdown,
   ProgressBar,
   Button,
   Modal,
} from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";

const MembersTableCRM = () => {
   const [users, setUsers] = useState([]);
   const [basicModal, setBasicModal] = useState(false);
   const [modalContent, setModalContent] = useState({
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
   });

   const API_URI = "https://65a8294194c2c5762da86419.mockapi.io/users";

   const chackbox = document.querySelectorAll(".bs_exam_topper input");
   const motherChackBox = document.querySelector(".bs_exam_topper_all input");
   const chackboxFun = (type) => {
      for (let i = 0; i < chackbox.length; i++) {
         const element = chackbox[i];
         if (type === "all") {
            if (motherChackBox.checked) {
               element.checked = true;
            } else {
               element.checked = false;
            }
         } else {
            if (!element.checked) {
               motherChackBox.checked = false;
               break;
            } else {
               motherChackBox.checked = true;
            }
         }
      }
   };

   const {
      firstName,
      lastName,
      fullName,
      email,
      role,
      location,
      phoneNumber,
      gender,
      positionAntilNow,
      fecerPosition,
      yearExperience,
      linkdinURL,
   } = {
      firstName: "First Name",
      lastName: "Last Name",
      fullName: "Full Name",
      email: "Email",
      role: "Role",
      location: "Location",
      phoneNumber: "Phone",
      gender: "Gender",

      positionAntilNow: "Position Antil Now",
      fecerPosition: "Fecer Position",
      yearExperience: "Year Experience",
      linkdinURL: "Linkdin URL",
   };

   async function fetchUsers() {
      const fetchUsers = fetch(API_URI)
         .then((res) => res.json())
         .catch((error) =>
            console.error("Error making the GET request:", error.message)
         );
      const allUsers = await fetchUsers;
      setUsers(allUsers);
   }
   useEffect(() => {
      fetchUsers();
   }, []);

   //User table row Component
   const MemberTr = ({ user = {}, index = 1 }) => {
      if (!user.firstName) return;
      return (
         <tr>
            <th>{index + 2}</th>
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
            <td className="py-2">
               <Button
                  className="me-2 btn-sm"
                  variant="warning btn-rounded"
                  onClick={() => {
                     setModalContent(user);
                     form.setValues(user);
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
            </td>
         </tr>
      );
   };

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
         gender: false,
         positionAntilNow: "",
         fecerPosition: "",
         yearExperience: "",
         linkdinURL: "",
      },

      async onSubmit(values) {
         await axios.put(`${API_URI}/${modalContent.id}`, values);
         fetchUsers();
      },
   });

   return (
      <Fragment>
         <PageTitle activeMenu="Member table CRM" motherMenu="Tables" />
         <Row>
            <Col lg={12}>
               <Card>
                  <Card.Header>
                     <Card.Title>Members</Card.Title>
                  </Card.Header>
                  <Card.Body>
                     <Table responsive hover>
                        <thead>
                           <tr>
                              <th>#</th>
                              <th>{fullName}</th>
                              <th>{email}</th>
                              <th>{role}</th>
                              <th>{location}</th>
                              <th>{phoneNumber}</th>
                              <th>{gender}</th>
                              <th>CRM</th>
                           </tr>
                        </thead>
                        <tbody>
                           {users.map((user, index) => (
                              <MemberTr key={index} user={user} index={index} />
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
                  onClick={() => setBasicModal(false)}
               ></Button>
            </Modal.Header>
            <Modal.Body>
               <div className="basic-form">
                  <form onSubmit={(e) => e.preventDefault()}>
                     {/* first name */}
                     <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">
                           {firstName}
                        </label>
                        <div className="col-sm-9">
                           <input
                              {...form.getFieldProps("firstName")}
                              type="text"
                              className="form-control"
                           />
                        </div>
                     </div>
                     {/* last name */}
                     <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">
                           {lastName}
                        </label>
                        <div className="col-sm-9">
                           <input
                              {...form.getFieldProps("lastName")}
                              type="text"
                              className="form-control"
                           />
                        </div>
                     </div>
                     {/* email */}
                     <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9">
                           <input
                              {...form.getFieldProps("email")}
                              type="email"
                              className="form-control"
                           />
                        </div>
                     </div>
                     {/* role */}
                     <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">
                           {role}
                        </label>
                        <div className="col-sm-9">
                           <input
                              {...form.getFieldProps("role")}
                              type="text"
                              className="form-control"
                           />
                        </div>
                     </div>

                     {/* location */}
                     <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">
                           {location}
                        </label>
                        <div className="col-sm-9">
                           <input
                              {...form.getFieldProps("location")}
                              type="text"
                              className="form-control"
                           />
                        </div>
                     </div>
                     {/* phoneNumber */}
                     <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">
                           {phoneNumber}
                        </label>
                        <div className="col-sm-9">
                           <input
                              {...form.getFieldProps("phoneNumber")}
                              type="text"
                              className="form-control"
                           />
                        </div>
                     </div>
                     {/* gender */}
                     <fieldset className="form-group">
                        <div className="row mb-3">
                           <label className="col-form-label col-sm-3 pt-0">
                              {gender}
                           </label>
                           <div className="col-sm-9">
                              <div className="form-check">
                                 <input
                                    {...form.getFieldProps("gender")}
                                    className="form-check-input"
                                    type="radio"
                                    name="gridRadios"
                                    value="option1"
                                    checked={modalContent.gender}
                                 />
                                 <label className="form-check-label">
                                    Male
                                 </label>
                              </div>
                              <div className="form-check">
                                 <input
                                    {...form.getFieldProps("gender")}
                                    className="form-check-input"
                                    type="radio"
                                    name="gridRadios"
                                    value="option2"
                                    checked={!modalContent.gender}
                                 />
                                 <label className="form-check-label">
                                    Female
                                 </label>
                              </div>
                           </div>
                        </div>
                     </fieldset>
                     {/* positionAntilNow */}
                     <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">
                           {positionAntilNow}
                        </label>
                        <div className="col-sm-9">
                           <input
                              {...form.getFieldProps("positionAntilNow")}
                              type="text"
                              className="form-control"
                           />
                        </div>
                     </div>

                     {/* fecerPosition */}
                     <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">
                           {fecerPosition}
                        </label>
                        <div className="col-sm-9">
                           <input
                              {...form.getFieldProps("fecerPosition")}
                              type="text"
                              className="form-control"
                           />
                        </div>
                     </div>

                     {/* yearExperience */}
                     <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">
                           {yearExperience}
                        </label>
                        <div className="col-sm-9">
                           <input
                              {...form.getFieldProps("yearExperience")}
                              type="number"
                              className="form-control"
                           />
                        </div>
                     </div>

                     {/* linkdinURL */}
                     <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">
                           {linkdinURL}
                        </label>
                        <div className="col-sm-9">
                           <input
                              {...form.getFieldProps("linkdinURL")}
                              type="text"
                              className="form-control"
                           />
                        </div>
                     </div>
                  </form>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button
                  onClick={() => setBasicModal(false)}
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
                  Save changes
               </Button>
            </Modal.Footer>
         </Modal>
      </Fragment>
   );
};

export default MembersTableCRM;