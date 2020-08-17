import React, { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import firebaseDb from "../Firebase";

function Contacts() {
  // fetching data
  useEffect(() => {
    firebaseDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setContactObjects({
          ...snapshot.val(),
        });
      } else {
        setContactObjects({});
      }
    });
  }, []);
  // fetching data

  const [contactObjects, setContactObjects] = useState({});
  const [currentEmployeeId, setCurrentEmployeeId] = useState("");

  // Adding & Editing Data Entries
  const addOrEdit = (item) => {
    if (currentEmployeeId == "") {
      firebaseDb.child("contacts").push(item, (err) => {
        if (err) console.log(err);
      });
    } else {
      firebaseDb.child(`contacts/${currentEmployeeId}`).set(item, (err) => {
        if (err) console.log(err);
        else setCurrentEmployeeId("");
      });
    }
  };
  // Adding & Editing Data Entries

  // Removing Data Entries
  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      firebaseDb.child(`contacts/${id}`).remove((err) => {
        if (err) console.log(err);
        else setCurrentEmployeeId("");
      });
    }
  };
  // Removing Data Entries

  return (
    <React.Fragment>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Contact Register</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <ContactForm
            addOrEdit={addOrEdit}
            currentEmployeeId={currentEmployeeId}
            contactObjects={contactObjects}
          />
        </div>
        <div className="col-md-7">
          <table className="table table-borderless-table-stripped">
            <thead className="thead-light">
              <tr>
                <th>Full Name</th>
                <th>Mobile Number</th>
                <th>Email</th>
                <th>Type</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(contactObjects).map((key) => {
                return (
                  <tr key={key}>
                    <td>{contactObjects[key].fullName}</td>
                    <td>{contactObjects[key].mobileno}</td>
                    <td>{contactObjects[key].email}</td>
                    <td>{contactObjects[key].employee_type}</td>
                    <td>{contactObjects[key].employee_designation}</td>
                    <td>{contactObjects[key].employee_department}</td>
                    <td className="d-flex">
                      <button
                        className="btn text-primary"
                        onClick={() => {
                          setCurrentEmployeeId(key);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn text-danger"
                        onClick={() => onDelete(key)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Contacts;
