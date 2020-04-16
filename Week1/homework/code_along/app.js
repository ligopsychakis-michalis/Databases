const express = require("express");
const mysql = require("mysql");

const app = express();


//create connection to database
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'nodemysql'
});
 
//connect to database
con.connect((err) => {
    if (err) throw err;
    console.log("Mysql is connected...");
});


//create new table
app.get("/createpoststable", (req,res) => {
    let sql = "CREATE TABLE  posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id));";
    con.query(sql, (error, result) => {
        if (error) throw error;
        console.log(result);
        res.send("table created");
    });
});

//insert post 1
app.get("/addpost1", (req,res) => {
    let post = {title:"Post One", body: "This is post number one."};
    let sql = "INSERT INTO posts SET ?"
    con.query(sql,post, (error, result) => {
        if (error) throw error;
        console.log(result);
        res.send("Post 1 added...");
    });
});

//insert post 2
app.get("/addpost2", (req,res) => {
    let post = {title:"Post One", body: "This is post number one."};
    let sql = "INSERT INTO posts SET ?"
    con.query(sql,post, (error, result) => {
        if (error) throw error;
        console.log(result);
        res.send("Post 2 added...");
    });
});

//select posts
app.get("/getposts", (req,res) => {
    let sql = "SELECT * FROM posts"
    con.query(sql, (error, result) => {
        if (error) throw error;
        console.log(result);
        res.send("Posts fetched...");
    });
});

//select single post
app.get("/getpost/:id", (req,res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    con.query(sql, (error, result) => {
        if (error) throw error;
        console.log(result);
        res.send("Post fetched...");
    });
});

//update post
app.get("/updatepost/:id", (req,res) => {
    let newTitle = "Updated Title";
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = '${req.params.id}'`;
    con.query(sql, (error, result) => {
        if (error) throw error;
        console.log(result);
        res.send("Post Updated...");
    });
});

//delet post
app.get("/deletepost/:id", (req,res) => {
    let sql = `DELETE FROM posts WHERE id = '${req.params.id}'`;
    con.query(sql, (error, result) => {
        if (error) throw error;
        console.log(result);
        res.send("Post Deleted...");
    });
});

//listen to port
app.listen(3000, () => {
    console.log("Server running on port 3000...");
});


