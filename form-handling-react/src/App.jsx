import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm"; // 

function App() {
  return (
    <div className="flex flex-col items-center gap-10 mt-10">
      <h1 className="text-2xl font-bold">Controlled Form</h1>
      <RegistrationForm />

      <h1 className="text-2xl font-bold">Formik Form</h1>
      <FormikForm />
    </div>
  );
}

export default App;
