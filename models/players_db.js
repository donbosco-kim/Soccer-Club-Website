// import necessary modules
const sqlite3 = require("sqlite3").verbose();

// Function to open a connection to the database file
function getDbConnection() {
  // Connecting to the database
  let db = new sqlite3.Database("/Users/leonbosco/Desktop/Sqlite-Mizzou-SoccerDB/mizzousoccerdatabase.db",sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error("You got this", err.message);
      }else {
        console.log("Connected to the database.");
      }
    });
    return db; // Return the database connection
}

//View (Read)
// Function to get all players
function getAllPlayers(callback) {
  // Get a db connection
  let db = getDbConnection();
  let sql = 'SELECT * FROM Players';
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

//Create

// let sql = 'INSERT INTO Players (firstname, lastname, birthdate, position, jerseynumber, height, weight) VALUES (?,?,?,?,?,?,?)';
// db.run(sql, ["Joe", "Test", "3/3/1998", "Midfielder", 13, 190, 130], (err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log("Players successfully added");
// });

// Export the getAllPlayers function
module.exports = {
  getAllPlayers: getAllPlayers
};