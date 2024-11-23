import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './studentreg.css';

function StudentReg() {
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    dob: '',
    email: '',
    phone: '',
    course: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    studentId: '',
    name: '',
    dob: '',
    email: '',
    phone: '',
    course: '',
    password: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch last student ID on component load
  useEffect(() => {
    // Get the last student ID from the backend
    axios.get('http://localhost:5000/getLastStudentId')
      .then(response => {
        const lastStudentId = response.data.lastStudentId;
        const newStudentId = `ST${parseInt(lastStudentId.slice(2)) + 1}`; // Increment the last student ID by 1
        setFormData(prevData => ({
          ...prevData,
          studentId: newStudentId
        }));
      })
      .catch(error => {
        console.error('Error fetching last student ID:', error);
      });
  }, []); // Run only on the initial render

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.studentId) newErrors.studentId = 'Student ID is required';
    if (!formData.name) newErrors.name = 'Student Name is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!formData.phone) {
      newErrors.phone = 'phone Number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'phone Number must be 10 digits';
    }
    if (!formData.course) newErrors.course = 'Please select a course';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await axios.post('http://localhost:5000/studentreg', formData);
        console.log('Registration successful:', response.data);

        // Reset form data and increment student ID
        setFormData({
          studentId: '',  // Leave this empty for now; new ID will be set after successful submission
          name: '',
          dob: '',
          email: '',
          phone: '',
          course: '',
          password: ''
        });

        setIsSubmitted(true);

        // Fetch and increment student ID for the next submission
        axios.get('http://localhost:5000/getLastStudentId')
          .then(response => {
            const lastStudentId = response.data.lastStudentId;
            const newStudentId = `ST${parseInt(lastStudentId.slice(2)) + 1}`;
            setFormData(prevData => ({
              ...prevData,
              studentId: newStudentId
            }));
          })
          .catch(error => {
            console.error('Error fetching last student ID:', error);
          });

      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div className="registration-container">
      <h2>Student Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Student ID */}
        <div className="form-group">
          <label htmlFor="studentId">Student ID</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className={errors.studentId ? 'input-error' : formData.studentId ? 'input-success' : ''}
            disabled
          />
          {errors.studentId && <p className="error-text">{errors.studentId}</p>}
        </div>

        {/* Other form fields */}
        <div className="form-group">
          <label htmlFor="name">Student Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : formData.name ? 'input-success' : ''}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className={errors.dob ? 'input-error' : formData.dob ? 'input-success' : ''}
          />
          {errors.dob && <p className="error-text">{errors.dob}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : formData.email ? 'input-success' : ''}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'input-error' : formData.phone ? 'input-success' : ''}
            pattern="[0-9]{10}"
            placeholder="Enter 10-digit phone number"
          />
          {errors.phone && <p className="error-text">{errors.phone}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="course">Course</label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className={errors.course ? 'input-error' : formData.course ? 'input-success' : ''}
          >
            <option value="">Select a Course</option>
            <option value="MERN Stack">MERN Stack</option>
            <option value="MEAN Stack">MEAN Stack</option>
            <option value="Python Fullstack">Python Fullstack</option>
            <option value="Java Fullstack">Java Fullstack</option>
            <option value="ASP Dotnet">ASP Dotnet</option>
            <option value="UI/UX Designing">UI/UX Designing</option>
          </select>
          {errors.course && <p className="error-text">{errors.course}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'input-error' : formData.password ? 'input-success' : ''}
            minLength="6"
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <button type="submit" className="submit-btn">Register</button>
      </form>

      {isSubmitted && <p className="success-text">Registration successful!</p>}
    </div>
  );
}

export default StudentReg;
