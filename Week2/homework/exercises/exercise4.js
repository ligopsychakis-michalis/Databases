const mysql = require('mysql');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'nodemysql'
});
 
db.connect();

const queries = [
    `
        select dep_no,count(Employees.manager)
        from Departments
        join Employees
            on Departments.manager = Employees.manager
        group by dept_no;    
    `,
    `
        select sum(salary)
        from Employees;   
    `,
    `
        select avg(salary)
        from Employees;
    `,
    `
        select dep_no,sum(Employees.salary)
        from Departments
        join Employees
            on Departments.manager = Employees.manager
        group by dept_no; 
    `,
    `
        select dep_no,max(Employees.salary),min(Employees.salary)
        from Departments
        join Employees
            on Departments.manager = Employees.manager
        group by dept_no; 
    `,
    `
        select distinct salary,count(*) 
        from Employees
        group by salary;
    `
];


for (let i = 0; i < queries.length; i++)
db.query(queries[i], (err, result) => {
    if (err) throw err;
    console.log(result);
});


db.end();