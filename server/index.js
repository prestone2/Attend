
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://prestoneongoro:@attemd.1tjla.mongodb.net/';

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected globally via Atlas'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


const attendanceSchema = new mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now },
  status: String,
  gender: String,
  designation: String
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

// Create - POST /attendance
app.post('/attendance', async (req, res) => {
  try {
    const { name, status, gender, designation } = req.body;
    const newRecord = new Attendance({ name, status, gender, designation });
    await newRecord.save();
    res.send(newRecord);
  } catch (error) {
    res.status(500).send({ message: 'Error adding record', error });
  }
});

// Read - GET /attendance
app.get('/attendance', async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.send(attendanceRecords);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching records', error });
  }
});

// Update - PUT /attendance/:id
app.put('/attendance/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status, gender, designation } = req.body;
    const updatedRecord = await Attendance.findByIdAndUpdate(id, { name, status, gender, designation }, { new: true });
    res.send(updatedRecord);
  } catch (error) {
    res.status(500).send({ message: 'Error updating record', error });
  }
});

// Delete - DELETE /attendance/:id
app.delete('/attendance/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Attendance.findByIdAndDelete(id);
    res.send({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting record', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
