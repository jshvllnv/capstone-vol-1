const Pool = require("pg").Pool;

const pool = new Pool ({
    user: "postgres",
    password: "Reavan06#",
    host: "localhost",
    port: "5432",
    database: "capsvol1"
});

module.exports = pool;