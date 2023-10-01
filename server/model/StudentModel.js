const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    RollNo: { type: String, required: true, unique: true }, 
    FirstName: { type: String, required: true }, 
    LastName: { type: String, required: true }, 
    Address: { type: String, required: true }, 
    Subject: { type: String, required: true }, 
    Gender: { type: String, required: true }, 
    Photo: { type: String, required: true }
})

const StudentModel = mongoose.model('student', studentSchema)

module.exports = { StudentModel }