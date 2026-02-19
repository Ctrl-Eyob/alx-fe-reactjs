import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Min 6 chars").required("Required"),
});

export default function FormikForm() {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={schema}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <Field name="username" placeholder="Username" />
        <ErrorMessage name="username" component="div" />

        <Field name="email" placeholder="Email" />
        <ErrorMessage name="email" component="div" />

        <Field name="password" type="password" placeholder="Password" />
        <ErrorMessage name="password" component="div" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
