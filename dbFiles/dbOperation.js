//dbOperations
const config = require('./dbConfig'),
    sql = require('mssql');

const getEmployees = async (FirstName) => {
    try {
        let pool = await sql.connect(config);
        let getEmployees = await pool.request().query(`SELECT * from EmployeeDemographics WHERE FirstName = '${FirstName}'`)
        console.log(getEmployees);
        return getEmployees;
    }
    catch (error) {
        console.log(error);
    }
}

const createEmployees = async (Employee) => {
    try {
        let pool = await sql.connect(config);
        let getEmployees = await pool.request()
            .query(`INSERT INTO  EmployeeDemographics VALUES
            (${Employee.EmployeeID}, '${Employee.FirstName}', '${Employee.LastName}', ${Employee.Age}, '${Employee.Gender}')
            `)

        return getEmployees;
    }
    catch (error) {
        console.log(error);
    }
}

const updateEmployee = async (employee) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .query(`UPDATE EmployeeDemographics 
                SET FirstName = '${employee.FirstName}', 
                    LastName = '${employee.LastName}', 
                    Age = ${employee.Age}, 
                    Gender = '${employee.Gender}' 
                WHERE EmployeeID = ${employee.EmployeeID}`);
        return result;
    } catch (error) {
        console.log(error);
    }
};

const deleteEmployee = async (employeeID) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .query(`DELETE FROM EmployeeDemographics WHERE EmployeeID = ${employeeID}`);
        return result;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createEmployees,
    getEmployees,
    updateEmployee,
    deleteEmployee
}
