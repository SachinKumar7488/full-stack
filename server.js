const express = require("express"),
  Employee = require('./dbFiles/employee'),
  dbOperation = require('./dbFiles/dbOperation'),
  cors = require('cors');

const API_PORT = process.env.PORT || 4000;
const app = express();

let client;
let session;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


app.post('/api', async (req, res) => {
  console.log('Called');
  const result = await dbOperation.getEmployees(req.body.name);
  res.send(result.recordset);
});

app.post('/hello', async (req, res) => {
  await dbOperation.createEmployees(req.body);
  const result = await dbOperation.getEmployees(req.body.FirstName);
  console.log('Called');
  res.send(result.recordset);
});

app.put('/api/update', async (req, res) => {
  try {
    await dbOperation.updateEmployee(req.body);
    res.send({ message: 'Employee updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Failed to update employee' });
  }
});

app.delete('/api/delete', async (req, res) => {
  try {
    await dbOperation.deleteEmployee(req.body.EmployeeID);
    res.send({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Failed to delete employee' });
  }
});


// app.get('/update-Employees',function(req, res){
//   con.connect(function(error){
//     if(error) console.log(error);

//     var sql = "SELECT * from EmployeeDemographics WHERE id=?";
//     var id = req.query.id;

//     con.query(sql, [id],function(error, result){
//       if(error) console.log(error); 
//     console.log('Data Updated');
//     });
//   });
// });


let pam = new Employee(31, 'Sachin', 'Ranchi', '21', 'Male');


// console.log(pam);
// dbOperation.getEmployees().then(res => {
//     console.log(res.recordset);
// })

dbOperation.createEmployees(pam);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));