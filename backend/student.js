const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentdatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Define the Student Schema
const studentSchema = new mongoose.Schema({
  studentId: String,
  name: String,
  dob: String,
  email: String,
  phone: String,
  course: String,
  password: String,
});

// Create the Student model
const Student = mongoose.model('student register', studentSchema);

// POST route for handling student registration
app.post('/studentreg', async (req, res) => {
  const { studentId, name, dob, email, phone, course, password } = req.body;

  try {
    // Create a new student document
    const newStudent = new Student({
      studentId,
      name,
      dob,
      email,
      phone,
      course,
      password,  // Directly store password without hashing
    });

    // Save the student document to the database
    await newStudent.save();
    res.status(201).json({ message: 'Registration successful!', student: newStudent });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Error registering student', error });
  }
});

// Route to fetch the last student ID
app.get('/getLastStudentId', async (req, res) => {
    try {
      const lastStudent = await Student.findOne({}, {}, { sort: { 'studentId': -1 } }).limit(1);
      const lastStudentId = lastStudent ? lastStudent.studentId : 'ST2400'; // Default if no students exist
      res.status(200).json({ lastStudentId });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching last student ID', error });
    }
  });


// Get all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update student
app.put('/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete student
app.delete('/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

  

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
