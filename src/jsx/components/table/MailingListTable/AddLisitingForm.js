import { ErrorMessage, Field, Form, Formik } from "formik";
import { Alert } from "react-bootstrap";

const AddListingForm = ({ onSubmit }) => {
  return (
    <Formik
      onSubmit={(values, { setFieldError }) => onSubmit(values, setFieldError)}
      initialValues={{ email: "" }}
    >
      <Form id="addListing">
        <Field
          id="email"
          name="email"
          type="email"
          required
          className="mb-2 form-control input-default "
          placeholder="Email"
        />
        <ErrorMessage name="email">
          {(msg) => <Alert variant="danger">{msg}</Alert>}
        </ErrorMessage>
      </Form>
    </Formik>
  );
};

export default AddListingForm;
