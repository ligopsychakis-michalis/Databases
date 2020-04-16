const mysql = require('mysql');
const mysqldump = require('mysqldump');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'nodemysql'
});
 
db.connect();
 
//create table "Employees"
const query = `
    create table Employees (
        employee_no int(100) auto_increment primary key, 
        full_name varchar(100) not null, 
        salary int(100) not null, 
        address varchar(100) not null
    );
`;

db.query(query, (error, results) => {
  if (error) throw error;
  console.log("Table created...");
});
 
//create 20 employees in the table Employees
const emps = 
[`
    insert into Employees (full_name,salary,address)
    values ('John Doe', 800, 'Route1-25');
`,
`
    insert into Employees (full_name,salary,address)
    values ('John Smith', 900, 'Route2-35');
`,
`   
    insert into Employees (full_name,salary,address)
    values ('Mary Gie', 700, 'Route3-22');
`,
`   
    insert into Employees (full_name,salary,address)
    values ('Manu Niel', 850, 'Route4-18');
`,
`   
    insert into Employees (full_name,salary,address)
    values ('Lie Yang', 750, 'Route5-53');
`,
`   
    insert into Employees (full_name,salary,address)
    values ('Joe Fe', 650, 'Route6-55');
`,
`   
    insert into Employees (full_name,salary,address)
    values ('Que Ohh', 600, 'Route7-35');
`,
`   
    insert into Employees (full_name,salary,address)
    values ('Lie Pop', 900, 'Route8-65');
`,
`   
    insert into Employees (full_name,salary,address)
    values ('Kaki King', 800, 'Route9-73');
`,
`   
    insert into Employees (full_name,salary,address)
    values ('Nick Taras', 800, 'Route10-19');
`,
`   
    insert into Employees (full_name,salary,address)
    values ('Hohn Go', 400, 'Route11-22');
`,
`   
    insert into Employees (full_name,salary,address)
    values ('Asia Spring', 500, 'Route12-65');
`,
`   
    insert into Employees (full_name,salary,address)
    values ('Opi Lopi', 850, 'Route13-73');
`,
`   
    insert into Employees (full_name,salary,address)
    values ('Mano Negra', 700, 'Route14-28');
`,
`   
    insert into Employees (full_name,salary,address)
    values ('Kia Kouli', 600, 'Route15-34');
`,
`   
    insert into Employees (full_name,salary,address)
    values ('Seo Ria', 300, 'Route16-93');
`,
`   
    insert into Employees (full_name,salary,address)
    values ('Lila Pause', 800, 'Route17-94');
`,
`   
    insert into Employees (full_name,salary,address)
    values ('Hello World', 700, 'Route18-65');
`,
`   
    insert into Employees (full_name,salary,address)
    values ('Popi Pila', 600, 'Route19-82');
`,
`   
    insert into Employees (full_name,salary,address)
    values ('Koko Mat', 700, 'Route20-20');
`];
  

for (let i = 0; i < emps.length; i++){
    db.query(emps[i], (error, results) => {
        if (error) throw error;
        console.log("Employee added...");
    });
}

//add foreign key to table "Employees"
const foreign = `
    ALTER TABLE Employees
    ADD FOREIGN KEY (manager varchar(100)) REFERENCES Employees(manager);
`;



// dump the result straight to a file
mysqldump({
    connection: {
        host: 'localhost',
        user: 'hyfuser',
        password: 'hyfpassword',
        database: 'nodemysql',
    },
    dumpToFile: './dump.sql.gz',
    compressFile: true,
});


db.end();