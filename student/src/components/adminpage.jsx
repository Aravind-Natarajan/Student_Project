// adminpage.js
import React, { useEffect, useState } from 'react';
import './adminpage.css';

function AdminPage() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch students data from backend
  useEffect(() => {
    fetch('http://localhost:5000/students')
      .then(response => response.json())
      .then(data => setStudents(data));
  }, []);

  // Handle edit button click
  const handleEdit = (student) => {
    setEditStudent(student);
    setIsEditing(true);
  };

  // Handle delete button click
  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmationOpen(true);
  };

  // Confirm delete
  const confirmDelete = (confirm) => {
    if (confirm) {
      fetch(`http://localhost:5000/students/${deleteId}`, {
        method: 'DELETE',
      })
        .then(() => {
          setStudents(students.filter(student => student._id !== deleteId));
          setConfirmationOpen(false);
        })
        .catch(error => console.error(error));
    } else {
      setConfirmationOpen(false);
    }
  };

  // Handle update student
  const handleUpdate = () => {
    fetch(`http://localhost:5000/students/${editStudent._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editStudent),
    })
      .then(() => {
        setStudents(students.map(student =>
          student._id === editStudent._id ? editStudent : student
        ));
        setIsEditing(false);
        setEditStudent(null);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="admin-container">
      <h1>Student Management</h1>
      <table className="student-table">
        <thead>
          <tr>
            <th>Student Id</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              
              <td>
                {isEditing && editStudent._id === student._id ? (
                  <input
                    type="text"
                    value={editStudent.studentId}
                    onChange={(e) => setEditStudent({ ...editStudent, studentId: e.target.value })}
                  />
                ) : (
                  student.studentId
                )}
              </td>

              <td>
                {isEditing && editStudent._id === student._id ? (
                  <input
                    type="text"
                    value={editStudent.name}
                    onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
                  />
                ) : (
                  student.name
                )}
              </td>
              <td>
                {isEditing && editStudent._id === student._id ? (
                  <input
                    type="text"
                    value={editStudent.dob}
                    onChange={(e) => setEditStudent({ ...editStudent, dob: e.target.value })}
                  />
                ) : (
                  student.dob
                )}
              </td>

              <td>
                {isEditing && editStudent._id === student._id ? (
                  <input
                    type="email"
                    value={editStudent.email}
                    onChange={(e) => setEditStudent({ ...editStudent, email: e.target.value })}
                  />
                ) : (
                  student.email
                )}
              </td>
              <td>
                {isEditing && editStudent._id === student._id ? (
                  <input
                    type="text"
                    value={editStudent.phone}
                    onChange={(e) => setEditStudent({ ...editStudent, phone: e.target.value })}
                  />
                ) : (
                  student.phone
                )}
              </td>
              <td>
                {isEditing && editStudent._id === student._id ? (
                  <input
                    type="text"
                    value={editStudent.course}
                    onChange={(e) => setEditStudent({ ...editStudent, course: e.target.value })}
                  />
                ) : (
                  student.course
                )}
              </td>

              <td>
                {isEditing && editStudent._id === student._id ? (
                  <button className="update-btn" onClick={handleUpdate}>Update</button>
                ) : (
                  <>
                    <button className="edit-btn" onClick={() => handleEdit(student)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(student._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Popup */}
      {confirmationOpen && (
        <div className="confirmation-popup">
          <p>Are you sure you want to delete this student?</p>
          <button className="confirm-btn" onClick={() => confirmDelete(true)}>Yes</button>
          <button className="cancel-btn" onClick={() => confirmDelete(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
