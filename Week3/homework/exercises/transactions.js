function flatify(dept_no, emp_no){
    //first connect to database
    const mysql = require('mysql');
    const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database : 'company'
    });
    
    connection.connect();

    //find the name of new manager
    let newMan = `
        select emp_name from Employees
        where emp_no = ${emp_no};
    `;

    connection.query(newMan, (error, results) => {
        if (error) throw error;
        newMan = results[0].emp_name;

        //update manager to table "Departments"
        const updateMan = `
            update Departments
            set manager = '${newMan}'
            where dept_no = ${dept_no};
        `;

        connection.query(updateMan, (error, results) => {
            if (error) throw error;
            console.log("Manager updated..");
        });

        connection.end();

    });

};

