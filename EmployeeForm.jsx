import { useState } from "react";

const initialValues = {
  name: "",
  designation: "",
  location: "",
  salary: "",
};

function EmployeeForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.name.trim()) newErrors.name = "Name is required.";
    if (!values.designation.trim())
      newErrors.designation = "Designation is required.";
    if (!values.location.trim()) newErrors.location = "Location is required.";
    if (values.salary === "" || Number(values.salary) <= 0)
      newErrors.salary = "Enter a salary greater than 0.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // No data is posted to a server (as per the requirement).
      setSubmitted(values);
      setValues(initialValues);
    }
  };

  const field = (id, label, type = "text") => (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className={"form-control" + (errors[id] ? " is-invalid" : "")}
        value={values[id]}
        onChange={handleChange}
        min={type === "number" ? "0" : undefined}
      />
      {errors[id] && <div className="invalid-feedback">{errors[id]}</div>}
    </div>
  );

  return (
    <section className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <h2 className="mb-3">Employee Form</h2>

        {submitted && (
          <div className="alert alert-success" role="alert">
            Saved <strong>{submitted.name}</strong> ({submitted.designation},{" "}
            {submitted.location}, salary {submitted.salary}).
          </div>
        )}

        <form className="card card-body shadow-sm" onSubmit={handleSubmit} noValidate>
          {field("name", "Name")}
          {field("designation", "Designation")}
          {field("location", "Location")}
          {field("salary", "Salary", "number")}

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => {
                setValues(initialValues);
                setErrors({});
                setSubmitted(null);
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EmployeeForm;
