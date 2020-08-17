import React, { useState, useEffect } from "react";

const ContactForm = (props) => {
  const INITIAL_VALUES = {
    fullName: "",
    mobileno: "",
    email: "",
    employee_type: "",
    employee_designation: "",
    employee_department: "",
  };
  const [formValues, setFormValues] = useState({ ...INITIAL_VALUES });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addOrEdit(formValues);
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    if (props.currentEmployeeId == "") setFormValues({});
    else setFormValues({ ...props.contactObjects[props.currentEmployeeId] });
  }, [props.currentEmployeeId, props.contactObjects]);

  return (
    <form autoComplete="off" onSubmit={handleFormSubmit}>
      <div className="form-row">
        <div className="form-group input-group col-md-12">
          <input
            name="fullName"
            className="form-control"
            placeholder="Full Name"
            value={formValues.fullName}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group input-group col-md-12">
          <input
            name="mobileno"
            className="form-control"
            placeholder="Mobile Number"
            value={formValues.mobileno}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group input-group col-md-12">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group input-group col-md-12">
          <input
            name="employee_type"
            className="form-control"
            placeholder="Employee type"
            value={formValues.employee_type}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group input-group col-md-12">
          <input
            name="employee_designation"
            className="form-control"
            placeholder="Employee Designation"
            value={formValues.employee_designation}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group input-group col-md-12">
          <input
            name="employee_department"
            className="form-control"
            placeholder="Employee Department"
            value={formValues.employee_department}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group">
        <input
          type="submit"
          value="Save"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default ContactForm;
