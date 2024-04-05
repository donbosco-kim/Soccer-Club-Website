// import necessary modules
const sqlite3 = require("sqlite3").verbose();

// Function to open a connection to the database file
function getDbConnection() {
  // Connecting to the database
  let db = new sqlite3.Database("models/mizzousoccerdatabase.db",sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error("You got this", err.message);
      }else {
        console.log("Connected to the database.");
      }
    });
    return db; // Return the database connection
}

//View (Read)
// Function to get all coach
function getAllCoach(callback) {
  // Get a db connection
  let db = getDbConnection();
  let sql = 'SELECT * FROM Coach';
  db.all(sql, [], (err, results) => {
      if (err) {
          console.error(err.message);
          callback(err, null); // Pass error to callback
      } else {
          // Close the database connection after retrieving results
          db.close((closeErr) => {
              if (closeErr) {
                  console.error(closeErr.message);
              } else {
                  console.log('Database connection is closed');
              }
          });
          callback(null, results); // Pass results to callback
      }
  });
}

//Create test
// let db = getDbConnection();

// let sql = 'INSERT INTO Coach (firstname, lastname) VALUES (?,?)';
// db.run(sql, ["Jonah", "Test"], (err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log("Coach successfully added");
// });


// Export the getAllCoach function
module.exports = {
    getAllCoach: getAllCoach
  };