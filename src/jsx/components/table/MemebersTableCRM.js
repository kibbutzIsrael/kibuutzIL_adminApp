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
} from "react-bootstrap";

/// imge
import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import avatar3 from "../../../images/avatar/3.jpg";
import { Link } from "react-router-dom";

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
         <td className="py-2">{user.phone}</td>
         {/*gender  */}
         <td className="py-2">{user.gender ? "Male" : "Female"}</td>
         {/*CRM  */}
         <td className="py-2">
            <Button className="me-2 btn-sm" variant="warning btn-rounded">
               <i className="bi bi-pencil-square fs-5"></i>
            </Button>
            <Button className="me-2 btn-sm" variant="primary btn-rounded">
               <i className="bi bi-trash fs-5"></i>
            </Button>
         </td>
      </tr>
   );
};

const MembersTableCRM = () => {
   const [users, setUsers] = useState([]);
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

   useEffect(() => {
      async function fetchUsers() {
         const fetchUsers = fetch(
            "https://65a8294194c2c5762da86419.mockapi.io/users"
         ).then((res) => res.json());
         const users = await fetchUsers;
         setUsers(users);
      }
      fetchUsers();
   }, [users]);

   return (
      <Fragment>
         <PageTitle activeMenu="Table" motherMenu="Bootstrap" />
         <Row>
            <Col lg={12}>
               <Card>
                  <Card.Header>
                     <Card.Title>Table Hover</Card.Title>
                  </Card.Header>
                  <Card.Body>
                     <Table responsive hover>
                        <thead>
                           <tr>
                              <th>#</th>
                              <th>fullName</th>
                              <th>email</th>
                              <th>role</th>
                              <th>location</th>
                              <th>phoneNumber</th>
                              <th>gender</th>
                              <th>CRM</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <th>1</th>
                              {/*fullName  */}
                              <td className="py-2">Yoel Bar-Lev</td>
                              {/*email  */}
                              <td className="py-2">Yoelbl2@gmail.com</td>
                              {/*role  */}
                              <td className="py-2">Front-end</td>
                              {/*location  */}
                              <td className="py-2">Ashkelon</td>
                              {/*phoneNumber  */}
                              <td className="py-2">0525913581</td>
                              {/*gender  */}
                              <td className="py-2">Male</td>
                              {/*CRM  */}
                              <td className="py-2">
                                 <Button
                                    className="me-2 btn-sm"
                                    variant="warning btn-rounded"
                                 >
                                    <i className="bi bi-pencil-square fs-5"></i>
                                 </Button>
                                 <Button
                                    className="me-2 btn-sm"
                                    variant="primary btn-rounded"
                                 >
                                    <i className="bi bi-trash fs-5"></i>
                                 </Button>
                              </td>
                           </tr>
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
      </Fragment>
   );
};

export default MembersTableCRM;
