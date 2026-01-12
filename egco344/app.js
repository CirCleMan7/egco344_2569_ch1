// node.js file for API to show gpa

const express = require('express');

const app = express();

// Mock data - Students with GPA from different departments
const students = [
    { id: 'E001', name: 'Alice Johnson', department: 'Computer Science', gpa: 3.85 },
    { id: 'E002', name: 'Bob Smith', department: 'Electrical Engineering', gpa: 3.72 },
    { id: 'E003', name: 'Carol White', department: 'Civil Engineering', gpa: 3.91 },
    { id: 'E004', name: 'David Brown', department: 'Mechanical Engineering', gpa: 3.65 },
    { id: 'E005', name: 'Emma Davis', department: 'Computer Science', gpa: 3.88 },
    { id: 'E006', name: 'Frank Miller', department: 'Chemical Engineering', gpa: 3.79 },
    { id: 'E007', name: 'Grace Lee', department: 'Electrical Engineering', gpa: 3.81 },
    { id: 'E008', name: 'Henry Wilson', department: 'Civil Engineering', gpa: 3.68 }
];

app.use(express.json());

// API 1: Get all students' GPA grouped by department
app.get('/api/students/gpa', (req, res) => {
    const groupedByDept = students.reduce((acc, student) => {
        const dept = student.department;
        if (!acc[dept]) {
            acc[dept] = [];
        }
        acc[dept].push({
            id: student.id,
            name: student.name,
            gpa: student.gpa
        });
        return acc;
    }, {});

    res.json({
        success: true,
        data: groupedByDept
    });
});

// API 2: Get individual student GPA by student ID
app.get('/api/students/:id/gpa', (req, res) => {
    const student = students.find(s => s.id === req.params.id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: `Student with ID ${req.params.id} not found`
        });
    }

    res.json({
        success: true,
        data: {
            id: student.id,
            name: student.name,
            department: student.department,
            gpa: student.gpa
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});