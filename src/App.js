// import './App.css';

// import React, {useState} from 'react';
// function App() {

//   const [returnedData, setReturnedData] = useState(['hiiiii thererererere'])
//   const [employee, setEmployee] = useState({EmployeeID: 0, FirstName: '', LastName: '', Age: 0, Gender: '' })

//   const setInput = (e) => {
//     const {name, value} = e.target;
//     console.log(value);
//     if (name === 'EmployeeID' || name === 'Age') {
//       setEmployee(prevState => ({
//         ...prevState,
//         [name]: parseInt(value)
//       }));
//       return;
//     }
//     setEmployee(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   }

//   const fetchData = async () => {
//     console.log(employee);
//     const newData = await fetch('/api',{
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: JSON.stringify({
//         name: employee.FirstName
//       })
//     })
//     .then(res => res.json());
//     console.log(newData);
//     setReturnedData(newData[0])
//   } 

//   // getData('/api');
//   return (
//     <div className="App">
//       <input 
//         type="number" 
//         name="EmployeeID" 
//         placeholder="EmployeeID" 
//         onChange={setInput}></input>
//       <input 
//         name="FirstName" 
//         placeholder="FirstName" 
//         onChange={setInput}></input>
//       <input 
//         name="LastName" 
//         placeholder="LastName" 
//         onChange={setInput}></input>
//       <input 
//         type="number" 
//         name="Age" 
//         placeholder="Age" 
//         onChange={setInput}></input>
//       <input 
//         name="Gender" 
//         placeholder="Gender" 
//         onChange={setInput}></input>
//       <button onClick={() => fetchData('/quit')}>Click</button>
//       <button onClick={() => fetchData('/quit')}>Create</button>

//       <p>EmployeeID: {returnedData.EmployeeID}</p>
//       <p>FirstName: {returnedData.FirstName}</p>
//       <p>LastName: {returnedData.LastName}</p>
//       <p>Age: {returnedData.Age}</p>
//       <p>Gender: {returnedData.Gender}</p>
//       {returnedData}
//     </div>
//   );
// }

// export default App;


import './App.css';
import React, { useState } from 'react';

function App() {
  const [returnedData, setReturnedData] = useState('hiiiii therereer');  // Set initial state to null
  const [employee, setEmployee] = useState({
    EmployeeID: 0,
    FirstName: '',
    LastName: '',
    Age: 0,
    Gender: ''
  });

  const setInput = (e) => {
    const { name, value } = e.target;
    if (name === 'EmployeeID' || name === 'Age') {
      setEmployee((prevState) => ({
        ...prevState,
        [name]: parseInt(value)

      }));
      return;
    }
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const fetchData = async () => {
    console.log(employee);
    const newData = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: employee.FirstName
      })
    }).then((res) => res.json());

    console.log(newData);
    setReturnedData(newData[0]);
  };


  const createEmployees = async () => {
    const newData = await fetch('/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...employee
      })
    }).then((res) => res.json());

    console.log(newData);
    setReturnedData(newData[0]);
  };

  const updateEmployee = async () => {
    const response = await fetch('/api/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(employee)
    }).then((res) => res.json());

    console.log(response);
    setReturnedData({ message: response.message });
  };

  const deleteEmployee = async () => {
    const response = await fetch('/api/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ EmployeeID: employee.EmployeeID })
    }).then((res) => res.json());

    console.log(response);
    setReturnedData({ message: response.message });
  };



  return (
    <div className="App">
      <input
        type="number"
        name="EmployeeID"
        placeholder="EmployeeID"
        onChange={setInput}
      />
      <input
        name="FirstName"
        placeholder="FirstName"
        onChange={setInput}
      />
      <input
        name="LastName"
        placeholder="LastName"
        onChange={setInput}
      />
      <input
        type="number"
        name="Age"
        placeholder="Age"
        onChange={setInput}
      />
      <input
        name="Gender"
        placeholder="Gender"
        onChange={setInput}
      />
      <button onClick={() => fetchData()}>Click</button>
      <button onClick={() => createEmployees()}>Create</button>
      <button onClick={() => updateEmployee()}>Update</button>
      <button onClick={() => deleteEmployee()}>Delete</button>


      {/* Use optional chaining to prevent undefined errors */}
      <p>EmployeeID: {returnedData?.EmployeeID}</p>
      <p>FirstName: {returnedData?.FirstName}</p>
      <p>LastName: {returnedData?.LastName}</p>
      <p>Age: {returnedData?.Age}</p>
      <p>Gender: {returnedData?.Gender}</p>
    </div>
  );
}

export default App;
