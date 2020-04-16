function getPopulation(cityOrCountry, name, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
      `SELECT Population FROM ${cityOrCountry} WHERE Name = ${name};`,
      function(err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
}

////example of sql injection 
//  getPopulation(`Countries`, `'Athens'; drop table Countries`, cb)


////rewrite function to fix this 
function getPopulation(cityOrCountry, name, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
      `SELECT Population FROM ${conn.escape(cityOrCountry)} WHERE Name = ${conn.escape(name)};`,
      function(err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
}