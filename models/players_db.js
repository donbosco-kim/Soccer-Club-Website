// import necessary modules
const db = require("./db");
//View (Read)
// Function to get all players
function getAllPlayers(callback) {
  let sql = 'SELECT * FROM Players';
  db.all(sql, [], (err, results) => {
      if (err) {
          console.error(err.message);
          callback(err, null); // Pass error to callback
      } else {
          // Close the database connection
          //db.close();
          callback(null, results); // Pass results to callback
      }
  });
}

// Export the getAllPlayers function
module.exports = {
  getAllPlayers: getAllPlayers
};