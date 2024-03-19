const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');
const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(cors())
app.use(express.json());
//data base connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bonafide'
});
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    return;
  }
  console.log('Connected to the database');
})
//staff Details
app.get('/fetchStaffDetails/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'SELECT * from  login_staff WHERE id=?'; // Alias the count(*) result as 'count'
  const values = [id];
  
  db.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log(results)
    return res.json(results);

  });
});
//count
app.get('/Count/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'SELECT count(*) AS count FROM bonafide2 WHERE id=?'; // Alias the count(*) result as 'count'
  const values = [id];
  
  db.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Access the count value from the first result object
    const count = results[0].count;

    console.log(count);
    return res.json({ count });
  });
});
// accept count in staff
app.get('/acceptCount/:dept', (req, res) => {
  const dept = req.params.dept;
  const sqlQuery = 'SELECT count(*) AS count FROM bonafide2 WHERE status="accepted" and dept=?'; // Alias the count(*) result as 'count'
  const values=[dept]
  
  db.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Access the count value from the first result object
    const count = results[0].count;

    console.log(count);
    return res.json({ count });
  });
});
// pending count in staff
app.get('/pendingCount/:dept', (req, res) => {
  const dept = req.params.dept;
  const sqlQuery = 'SELECT count(*) AS count FROM bonafide2 WHERE status="pending" and dept=?'; // Alias the count(*) result as 'count'
  const values=[dept]
  
  db.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Access the count value from the first result object
    const count = results[0].count;

    console.log(count);
    return res.json({ count });
  });
});

//fetch data
app.get('/fetchDataLogin/:id', (req, res) => {
  const id=req.params.id;
  const sqlQuery = 'SELECT * FROM login_student where id=?';
  values=[id]
  db.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log(results)
    return res.json(results);
  });
});
//login staff
app.put('/loginStaff', (req, res) => {
  console.log(req.body);
  const sqlQuerry = 'SELECT * FROM login_staff WHERE id=? AND pass=?;';
  const values = [req.body.uname, req.body.pass];
  db.query(sqlQuerry, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 1) {
      // If row size is one, send success message
      return res.status(200).json({ success: true });
    } else {
      return res.json({ success: false, message: "Invalid username or password" });
    }
  });
});
//login
app.put('/login', (req, res) => {
  console.log(req.body);
  const sqlQuerry = 'SELECT * FROM login_student WHERE id=? AND pass=?;';
  const values = [req.body.uname, req.body.pass];
  db.query(sqlQuerry, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 1) {
      // If row size is one, send success message
      return res.status(200).json({ success: true });
    } else {
      return res.json({ success: false, message: "Invalid username or password" });
    }
  });
});
//reject data
app.put('/rejectBonafide/:uid', (req, res) => {
  const uid=req.params.uid;
  const reason=req.body.reason;
  const sqlQuery = 'UPDATE bonafide2 SET status="rejected", rejection_reason=? WHERE uid=?';
  values=[reason,uid]
   db.query(sqlQuery, values, (err, results) => {
     if (err) {
       console.log(err);
       return res.status(500).json({ error: 'Internal server error' });
    }
     console.log(results)
     return res.json(results);
   });
});
//accept data
app.get('/acceptData/:uid', (req, res) => {
  const uid=req.params.uid;
  const sqlQuery = 'UPDATE bonafide2 SET status="accepted" WHERE uid=?';
  values=[uid]
  db.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log(results)
    return res.json(results);
  });
});
//row delete
app.get('/rowDelete/:uid', (req, res) => {
  const uid=req.params.uid;
  const sqlQuery = 'DELETE  FROM bonafide2 where uid=?';
  values=[uid]
  db.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log(results)
    return res.json(results);
  });
});
//particular row fetching
app.get('/particularRow/:uid', (req, res) => {
  const uid=req.params.uid;
  const sqlQuery = 'SELECT * FROM bonafide2 where uid=?';
  values=[uid]
  db.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log(results)
    return res.json(results);
  });
});
//bonafide apply code
app.put('/applyBonafide', (req, res) => {
  console.log(req.body.dob);
  const currentDate = new Date();
  // Format the date as needed
  const formattedDate = currentDate.toISOString().slice(0, 10); // Format as YYYY-MM-DD
  const id = req.body.id;
  const fname = req.body.fname;
  const regno = req.body.regno;
  const aadhar = req.body.aadhar;
  const fathername = req.body.fathername;
  const gender = req.body.gender;
  const syear = req.body.syear;
  const degree = req.body.degree;
  const dept = req.body.dept;
  const ayear = req.body.ayear;
  const dob = req.body.dob;
  const boarding = req.body.boarding;
  const purpose = req.body.purpose;
  const lname = req.body.lname;
  const type = req.body.type;
  const status = "pending";
  const image=req.body.image;
  const sqlQuerry = 'INSERT INTO bonafide2 (id, fname, lname, regno, aadhar, gender, fathername, type, syear, degree, dept, ayear, dob, boarding, purpose, status, applydate, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [id, fname, lname, regno, aadhar, gender, fathername, type, syear, degree, dept, ayear, dob, boarding, purpose, status, formattedDate, image];
  db.query(sqlQuerry, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(results);
  });
});
//staff 
app.get('/bonafideTable/:dept', (req, res) => {
  const dept=req.params.dept
  console.log("hi")
  const sqlQuery = 'SELECT * FROM bonafide2 WHERE dept=?';
  const values=[dept];  
  db.query(sqlQuery, values,(err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log(results)
    return res.json(results);
  });
});
//student bonafide table
app.get('/StudentBonafideTable/:id', (req, res) => {  
  const dept=req.params.id
  const sqlQuery = 'SELECT * FROM bonafide2 WHERE id=?';
  const values=[dept];  
  db.query(sqlQuery, values,(err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});
//fetch studen in apply page
app.get('/fetchData/:id', (req, res) => {
  const id=req.params.id;
  console.log("id in fetch data"+id);
  const sqlQuery = 'SELECT * FROM mic where id=?';
  const value=[id];
  db.query(sqlQuery, value, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});
app.listen(5001, () => {
  console.log("Server is running on http://localhost:5001");
});
