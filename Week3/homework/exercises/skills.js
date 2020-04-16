const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'company'
});
 
connection.connect();


//create two tables: "Skills( skill_no, skill_name )" and "Employees_skills( emp_no, skill_no )"
const tableSkills = `
  create table Skills(
    skill_no integer auto_increment,
    skill_name text(255) not null,
    primary key(skill_no)
  );
`;
 
connection.query(tableSkills, (error, results) => {
  if (error) throw error;
  console.log("Table created..");
});

const employeesSkills = `
  create table Employees_skills(
    emp_skill_id integer not null auto_increment,
    emp_no integer not null,
    skill_no integer not null,
    primary key(emp_skill_id),
    foreign key(emp_no) references Employees(emp_no),
    foreign key(skill_no) references Skills(skill_no)
  );
`;
 
connection.query(employeesSkills, (error, results) => {
  if (error) throw error;
  console.log("Table created..");
});
 

//add five rows to each table
const addSkills = [
  `insert into Skills(skill_name) values('organized');`,
  `insert into Skills(skill_name) values('confidence');`,
  `insert into Skills(skill_name) values('hard-working');`,
  `insert into Skills(skill_name) values('self-managment');`,
  `insert into Skills(skill_name) values('teamwork');`
];

for (let i = 0; i < addSkills.length; i++){
  connection.query(addSkills[i], (error, results) => {
    if (error) throw error;
    console.log("New Skill added..");
  });
};

const addEmpSkills = [
  `insert into Employees_skills(emp_no,skill_no) values(2,3);`,
  `insert into Employees_skills(emp_no,skill_no) values(2,4);`,
  `insert into Employees_skills(emp_no,skill_no) values(5,1);`,
  `insert into Employees_skills(emp_no,skill_no) values(7,2);`,
  `insert into Employees_skills(emp_no,skill_no) values(8,2);`,
  `insert into Employees_skills(emp_no,skill_no) values(10,5);`,
  `insert into Employees_skills(emp_no,skill_no) values(1,5);`,
  `insert into Employees_skills(emp_no,skill_no) values(1,3);`
];

for (let i = 0; i < addSkills.length; i++){
  connection.query(addEmpSkills[i], (error, results) => {
    if (error) throw error;
    console.log("New Employee-Skill added..");
  });
};

connection.end();
