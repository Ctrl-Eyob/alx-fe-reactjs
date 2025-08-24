import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function FormikForm() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await new Promise((res) => setTimeout(res, 1000));
      alert("User registered successfully (Formik Form)!");
      resetForm();
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form className="space-y-4 p-4 border rounded-md w-96">
        <div>
          <label className="block">Username</label>
          <Field name="username" type="text" className="border rounded px-2 py-1 w-full" />
          <ErrorMessage name="username" component="p" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block">Email</label>
          <Field name="email" type="email" className="border rounded px-2 py-1 w-full" />
          <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block">Password</label>
          <Field name="password" type="password" className="border rounded px-2 py-1 w-full" />
          <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
        </div>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Register
        </button>
      </Form>
    </Formik>
  );
}
