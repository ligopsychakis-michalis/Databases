const mysql = require('mysql');

//make the connection to database
const con = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'new_world',
});


//1.What are the names of countries with population greater than 8 million?
const query1 = `
    SELECT name FROM country
    WHERE population > 8000000;
`;

con.query(query1, (error,results) => {
    if (error) throw error;
    console.log(results);
});


//2.What are the names of countries that have “land” in their names?
const query2 = `
    SELECT name FROM country
    WHERE name LIKE "%land%";
`;

con.query(query2, (error,results) => {
    if (error) throw error;
    console.log(results);
});


//3.What are the names of the cities with population in between 500,000 and 1 million?
const query3 = `
    SELECT name FROM city
    WHERE population >= 500000 AND population <= 1000000;
`;

con.query(query3, (error,results) => {
    if (error) throw error;
    console.log(results);
});


//4.What's the name of all the countries on the continent ‘Europe’?
const query4 = `
    SELECT name FROM country
    WHERE continent = "Europe";
`;

con.query(query4, (error,results) => {
    if (error) throw error;
    console.log(results);
});


//5.List all the countries in the descending order of their surface areas.
const query5 = `
    SELECT name,SurfaceArea FROM country
    ORDER BY SurfaceArea DESC;
`;

con.query(query5, (error,results) => {
    if (error) throw error;
    console.log(results);
});


//6.What are the names of all the cities in the Netherlands?
const query6 = `
    SELECT name FROM city
    WHERE CountryCode = "NLD";
`;

con.query(query6, (error,results) => {
    if (error) throw error;
    console.log(results);
});


//7.What is the population of Rotterdam?
const query7 = `
    SELECT population FROM city
    WHERE name = "Rotterdam";
`;

con.query(query7, (error,results) => {
    if (error) throw error;
    console.log(results);
});


//8.What's the top 10 countries by Surface Area?
const query8 = `
    SELECT name,SurfaceArea FROM country
    ORDER BY SurfaceArea DESC
    Limit 10;
`;

con.query(query8, (error,results) => {
if (error) throw error;
console.log(results);
});


//9.What's the top 10 most populated cities?
const query9 = `
    SELECT name,population FROM city
    ORDER BY population DESC
    Limit 10;
`;

con.query(query9, (error,results) => {
if (error) throw error;
console.log(results);
});


//10.What is the population number of the world?
const query9 = `
    SELECT SUM(population) FROM country;
`;

con.query(query9, (error,results) => {
if (error) throw error;
console.log(results);
});


con.end();