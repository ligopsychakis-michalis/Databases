const mysql = require('mysql');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'nodemysql'
});
 
db.connect();

//create table "Department"
const query = `
    create table Departments (
        dept_no int(100) auto_increment primary key,
        title varchar(100) not null,
        description varchar(100) not null,
        address varchar(100) not null
    )
`;

db.query(query, (error, results) => {
  if (error) throw error;
  console.log("Table created...");
});
 
//change foreign key on table "Employees" reference
const dropFr = `
    ALTER TABLE Employees DROP FOREIGN KEY manager;
`;

const addFr = `
    ALTER TABLE Employees
    ADD FOREIGN KEY (manager varchar(100)) REFERENCES Departments(manager);
`;

db.query(dropFr, (error, results) => {
    if (error) throw error;
    console.log("Foreign Key droped...");
});

db.query(addFr, (error, results) => {
    if (error) throw error;
    console.log("Foreign Key added...");
});


//add manager column to table "Departments"
const addCol = `
    ALTER TABLE Departments
    ADD manager varchar(100);
`;

db.query(addCol, (error, results) => {
    if (error) throw error;
    console.log("Column added...");
});


//add rows to table Departments
const deps = [
    `
        insert into Departments (title,description,address,manager)
        values ('IT','IT...','Floor3','Mr.A');
    `,
    `
        insert into Departments (title,description,address,manager)
        values ('Design','Design...','Floor2','Mr.K');
    `,
    `
        insert into Departments (title,description,address,manager)
        values ('Management','Management...','Floor1','Ms.S');
    `,
    `
        insert into Departments (title,description,address,manager)
        values ('Economics','Economics...','Floor4,'Mr.L');
    `,
    `
        insert into Departments (title,description,address,manager)
        values ('Marketing','Marketing...','Floor5','Ms.T');
    `
];

for (let i = 0; i < deps.length; i++){
    db.query(deps[i], (error, results) => {
        if (error) throw error;
        console.log("Department added...");
    });  
}


//add some managers to table Employees
const addMan = [
    `
        update Employees
        set manager = 'Ms.T'
        where emp_no = 2;
    `,
    `
        update Employees
        set manager = 'Ms.T'
        where emp_no = 4;
    `,
    `
        update Employees
        set manager = 'Ms.T'
        where emp_no = 5;
    `,
    `
        update Employees
        set manager = 'Ms.S'
        where emp_no = 8;
    `,
    `
        update Employees
        set manager = 'Ms.S'
        where emp_no = 10;
    `,
    `
        update Employees
        set manager = 'Ms.S'
        where emp_no = 20;
    `,
    `
        update Employees
        set manager = 'Mr.K'
        where emp_no = 18;
    `,
    `
        update Employees
        set manager = 'Mr.K'
        where emp_no = 15;
    `,
    `
        update Employees
        set manager = 'Mr.A'
        where emp_no = 11;
    `
]

for (let i = 0; i < deps.length; i++){
    db.query(addMan[i], (error, results) => {
        if (error) throw error;
        console.log("Manager added to Employees...");
    });  
}


db.end();