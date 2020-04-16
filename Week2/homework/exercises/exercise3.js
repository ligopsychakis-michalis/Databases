const mysql = require('mysql');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'nodemysql'
});
 
db.connect();

const query1 = `
    select full_name,manager
    from Employees;
`;

db.query(query1, (err, result) => {
    if (err) throw err;
    console.log(result);
});

const query2 = `
    select full_name,title
    from Employees
    right join Departments
        on Employees.manager = Departments.manager;
`;

db.query(query2, (err, result) => {
    if (err) throw err;
    console.log(result);
});


db.end();