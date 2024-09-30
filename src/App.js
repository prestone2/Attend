import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [designation, setDesignation] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/attendance')
      .then(response => setAttendanceRecords(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/attendance', { name, status, gender, designation })
      .then(response => {
        setAttendanceRecords([...attendanceRecords, response.data]);
        setName('');
        setStatus('');
        setGender('');
        setDesignation('');
        setSuccessMessage('You have been added successfully! Enjoy your stay');
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch(error => console.error('Error adding record!! try again sometime', error));
  };

  return (
    <div className="App container mt-5">
    <h2 className="text-center mb-4">WELCOME TO NACOSTI</h2>
      <h1 className="text-center mb-4">Fill in the Attendance form</h1>
      {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <select
            className="form-control mb-2"
            value={status}
            onChange={e => setStatus(e.target.value)}
            required
          >
            <option value="" disabled>Select status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>
        <div className="form-group">
          <select
            className="form-control mb-2"
            value={gender}
            onChange={e => setGender(e.target.value)}
            required
          >
            <option value="" disabled>Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <select
            className="form-control mb-2"
            value={designation}
            onChange={e => setDesignation(e.target.value)}
            required
          >  
            <option value="" disabled>Select designation</option>
            <option value="Manager">Manager</option>
            <option value="Team Lead">ICT consultant</option>
            <option value="staff">staff</option>
            <option value="participant">participant</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add record</button>
      </form>
      {/* <ul className="list-group">
        {attendanceRecords.map(record => (
          <li key={record._id} className="list-group-item">
            <strong>{record.name}</strong> - {record.status} ({record.gender}, {record.designation}) on {new Date(record.date).toLocaleDateString()}
          </li>
        ))}
      </ul> */}
      <footer className="footer mt-4">
        <p className="text-center">© 2024 Attendance App. PreCrafts co.</p>
      </footer>
    </div>
  );
}

export default App;
