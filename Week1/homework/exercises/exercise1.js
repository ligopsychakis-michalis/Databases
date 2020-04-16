const mysql = require('mysql');

//make the connection to database
const con = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'company',
  multipleStatements: true
});
 

//create some tables
const tableEmployees = `
CREATE TABLE Employees(
    emp_no INT NOT NULL,
    emp_name TEXT NOT NULL,
    salary INT NOT NULL,
    reports_to TEXT NOT NULL,
    UNIQUE (emp_no)
)`;


const tableDepartments = `
CREATE TABLE Departments(
    dept_no INT NOT NULL,
    dept_name TEXT NOT NULL,
    manager TEXT NOT NULL,
    UNIQUE (dept_no)
)`;

const tableProjects = `
CREATE TABLE Projects(
    proj_no INT NOT NULL,
    proj_name TEXT NOT NULL,
    starting_date DATE NOT NULL,
    ending_date DATE NOT NULL,
    UNIQUE (proj_no)
)`;

con.query(tableEmployees, function (error, results) {
    if (error) throw error;
    console.log("table created...");
});

con.query(tableDepartments, function (error, results) {
    if (error) throw error;
    console.log("table created...");
});

con.query(tableProjects, function (error, results) {
    if (error) throw error;
    console.log("table created...");
});
 

//insert 10 rows into table Employees
const newRowsToEmployees = `
    INSERT INTO Employees (emp_no,emp_name,salary,reports_to)
    VALUES (2,"Mary",800,"IT");

    INSERT INTO Employees (emp_no,emp_name,salary,reports_to)
    VALUES (3,"Deck",800,"HR");

    INSERT INTO Employees (emp_no,emp_name,salary,reports_to)
    VALUES (4,"Mike",800,"Management");

    INSERT INTO Employees (emp_no,emp_name,salary,reports_to)
    VALUES (5,"Nick",800,"Economics");

    INSERT INTO Employees (emp_no,emp_name,salary,reports_to)
    VALUES (6,"Vaso",800,"Safety");

    INSERT INTO Employees (emp_no,emp_name,salary,reports_to)
    VALUES (7,"Jess",800,"Lawyers");

    INSERT INTO Employees (emp_no,emp_name,salary,reports_to)
    VALUES (8,"Nina",800,"Management");

    INSERT INTO Employees (emp_no,emp_name,salary,reports_to)
    VALUES (9,"Raeu",800,"IT");

    INSERT INTO Employees (emp_no,emp_name,salary,reports_to)
    VALUES (10,"Paul",800,"Economics");
`;

con.query(newRowsToEmployees, function(error,results) {
    if (error) throw error;
    console.log(`rows inserted to table Employees`);
});


// //insert 10 rows into into table Projects
let newRowsToDepartments = `
    INSERT INTO Departments (dept_no,dept_name,manager)
    VALUES (1,"Management","mr.Dick");

    INSERT INTO Departments (dept_no,dept_name,manager)
    VALUES (2,"IT","ms.Hack");

    INSERT INTO Departments (dept_no,dept_name,manager)
    VALUES (3,"Economics","ms.Euro");

    INSERT INTO Departments (dept_no,dept_name,manager)
    VALUES (4,"Safety","mr.Safe");

    INSERT INTO Departments (dept_no,dept_name,manager)
    VALUES (5,"Lawyers","mr.Law");

    INSERT INTO Departments (dept_no,dept_name,manager)
    VALUES (6,"Health","mr.Doct");

    INSERT INTO Departments (dept_no,dept_name,manager)
    VALUES (7,"Space","mr.Mask");

    INSERT INTO Departments (dept_no,dept_name,manager)
    VALUES (8,"Marketing","ms.Fiou");

    INSERT INTO Departments (dept_no,dept_name,manager)
    VALUES (9,"Design","mr.Art");

    INSERT INTO Departments (dept_no,dept_name,manager)
    VALUES (10,"Mystery","mr.Smith");
`;

con.query(newRowsToDepartments, function(error,results) {
    if (error) throw error;
    console.log(`rows inserted to table Departments`);
});


// //insert 10 rows into into table Projects
let newRowsToProjects = `
    INSERT INTO Projects (proj_no,proj_name,starting_date,ending_date)
    VALUES (1,"project1","2000-09-10","2000-10-10");

    INSERT INTO Projects (proj_no,proj_name,starting_date,ending_date)
    VALUES (2,"project2","2001-09-10","2001-10-10");

    INSERT INTO Projects (proj_no,proj_name,starting_date,ending_date)
    VALUES (3,"project3","2005-12-13","2006-03-13");

    INSERT INTO Projects (proj_no,proj_name,starting_date,ending_date)
    VALUES (4,"project4","2004-09-09","2004-10-09");

    INSERT INTO Projects (proj_no,proj_name,starting_date,ending_date)
    VALUES (5,"project5","2012-06-21","2012-11-21");

    INSERT INTO Projects (proj_no,proj_name,starting_date,ending_date)
    VALUES (6,"project6","2018-03-25","2018-10-25");

    INSERT INTO Projects (proj_no,proj_name,starting_date,ending_date)
    VALUES (7,"project7","2007-01-09","2009-10-09");

    INSERT INTO Projects (proj_no,proj_name,starting_date,ending_date)
    VALUES (8,"project8","2015-09-15","2015-12-15");

    INSERT INTO Projects (proj_no,proj_name,starting_date,ending_date)
    VALUES (9,"project9","2006-10-03","2010-10-10");

    INSERT INTO Projects (proj_no,proj_name,starting_date,ending_date)
    VALUES (10,"project10","2019-04-23","2019-08-23");
`;

con.query(newRowsToProjects, function(error,results) {
    if (error) throw error;
    console.log(`rows inserted to table Projects`);
});


con.end();