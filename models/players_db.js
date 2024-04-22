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
          // Close the database connection
          db.close();
          callback(null, results); // Pass results to callback
      }
  });
}

// Export the getAllPlayers function
module.exports = {
  getAllPlayers: getAllPlayers
};