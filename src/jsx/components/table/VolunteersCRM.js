import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import { Row, Col, Card, Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";

import { fields } from "../../../lib/tableFields";
import { Input } from "../creatdComponents/Input";
import {
  createUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../../lib/userCRUD";
import { YupUserSchema } from "../../../lib/YupMemberSchema";

const VolunteersCRM = () => {
  const [users, setUsers] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const [serverError, setServerError] = useState(null);

  const API_URI = "https://kibbutzil.online/volunteers-forms";

  useEffect(() => {
    fetchUsers(API_URI)
      .then((allVolunteers) => setUsers(allVolunteers))
      .catch(console.log);
  }, []);


  function handleDelete(user) {
    deleteUser(API_URI, user._id)
      .then(() => fetchUsers(API_URI))
      .then(setUsers)
      .catch(console.log);
  }


  //User table row Component
  const MemberTr = ({ user = {}, index = 1 }) => {
    if (!user.fullName) return;
    return (
      <tr>
        <th className="align-middle">{index + 1}</th>
        {/*fullName  */}
        <td className="py-2">{user.fullName}</td>
        {/*email  */}
        <td className="py-2">{user.email}</td>
        {/*role  */}
        <td className="py-2">{user.role}</td>
        {/*location  */}
        <td className="py-2">{user.location}</td>
        {/*phoneNumber  */}
        <td className="py-2">{user.phoneNumber}</td>
        {/*gender  */}
        <td className="py-2">{user.gender}</td>
        {/*CRM  */}
        <td className="py-2 ">
          <div className="d-flex">
            <Button
              className="me-2 btn-sm"
              variant="warning btn-rounded"
              onClick={() => {
                form.setValues(user);
                setBasicModal(true);
              }}
            >
              <i className="bi bi-pencil-square fs-5"></i>
            </Button>
            <Button
              onClick={() => {
                handleDelete(user);
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

  //Formik
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
            } else {
               await createUser(API_URI, processedValues);
            }
            form.resetForm();
            fetchUsers(API_URI).then(setUsers);
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
            onClick={() => {
              setBasicModal(false);
              form.resetForm();
            }}
          ></Button>
        </Modal.Header>
        <Modal.Body>
          <div className="basic-form">
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Full name */}

              <Input
                label={fields.fullName}
                error={form.touched.fullName && form.errors.fullName}
                required
                {...form.getFieldProps("fullName")}
              />

              {/* email */}
              <Input
                label="Email"
                error={form.touched.email && form.errors.email}
                type="email"
                required
                {...form.getFieldProps("email")}
              />
              {/* phoneNumber */}
              <Input
                label="Phone"
                error={form.touched.phoneNumber && form.errors.phoneNumber}
                required
                {...form.getFieldProps("phoneNumber")}
              />

              {/* location */}
              <Input
                label="Location"
                error={form.touched.location && form.errors.location}
                {...form.getFieldProps("location")}
              />

              {/* gender */}
              <div className="form-group mb-3 row">
                <label htmlFor="gender" className="col-sm-3 col-form-label">
                  Gender
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    style={{ height: "3rem" }}
                    id="gender"
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
                error={
                  form.touched.positionAntilNow && form.errors.positionAntilNow
                }
                {...form.getFieldProps("positionAntilNow")}
              />

              {/* fecerPosition */}
              <Input
                label="fecerPosition"
                error={form.touched.fecerPosition && form.errors.fecerPosition}
                {...form.getFieldProps("fecerPosition")}
              />

              {/* yearExperience */}
              <Input
                label="yearExperience"
                error={
                  form.touched.yearExperience && form.errors.yearExperience
                }
                {...form.getFieldProps("yearExperience")}
              />

              {/* linkdinURL */}
              <Input
                label="linkdinURL"
                error={form.touched.linkdinURL && form.errors.linkdinURL}
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

<<<<<<< HEAD
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
=======
                     setBasicModal(false);
                  }}
                  variant="primary"
               >
                  {form.values._id ? "Edit member" : "Add member"}
               </Button>
            </Modal.Footer>
         </Modal>
      </Fragment>
   );
>>>>>>> 06591c02f33c139cc77202641cbbc0571dd664ef
};

export default VolunteersCRM;
