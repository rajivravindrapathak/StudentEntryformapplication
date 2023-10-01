const Router = require('express')
const { StudentModel } = require('../model/StudentModel')

const userController = Router()


userController.post('/poststudentdata', async (req, res) => {
    const { RollNo, FirstName, LastName, Address, Subject, Gender, Photo } = req.body
    try {
        const studentData = new StudentModel({
            RollNo, FirstName, LastName, Address, Subject, Gender, Photo
        })
        const newStudentData = await studentData.save()
        res.status(200).send({ msg: "Record Save Successfully", newStudentData, status: "success" })
    } catch (error) {
        res.status(400).send({ msg: "Record not Save", error, status: "error" })
    }
})

userController.get('/getstudentdata', async (req, res) => {
    try {
      const studentdata = await StudentModel.find();
      res.status(201).send({ msg: "Record Get Successfully", status: "success", data: studentdata});
    } catch (error) {
      res.status(401).send({ msg: 'Record not Get', status: "error" });
    }
});   

userController.put('/updatestudentdata/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const updatedStudent = await StudentModel.findByIdAndUpdate(id, updatedData, { new: true });
  
      if(!updatedStudent) {
        return res.status(404).json({ status: 'error', msg: 'Student not found' });
      }
  
      return res.status(200).json({ status: 'success', msg: 'Student data updated successfully', data: updatedStudent });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', msg: 'Internal server error' });
    }
  });
  

  userController.delete('/deletestudentdata/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedStudent = await StudentModel.findByIdAndRemove(id);
  
      if (!deletedStudent) {
        return res.status(404).json({ status: 'error', msg: 'Student not found' });
      }
  
      return res.status(200).json({ status: 'success', msg: 'Student deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', msg: 'Internal server error' });
    }
  });

module.exports = { userController }