const pool = require("./db/pool");

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
  } else {
    console.log("Database connected. Current time:", res.rows[0].now);
  }
  pool.end();
});
