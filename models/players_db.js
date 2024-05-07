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
//id, firstname, lastname, position, jerseynumber, class, major, bio
function createPlayer(firstname, lastname, position, jerseynumber, _class, major, bio, callback) {
  let sql = 'INSERT INTO Players (firstname, lastname, position, jerseynumber, class, major, bio) VALUES (?,?,?,?,?,?,?)';
  db.run(sql, [firstname, lastname, position, jerseynumber, _class, major, bio], function(err) {
    if (err) {
      console.error(err.message);
      callback(err);
    } else {
      console.log("Player successfully added");
      callback(null, this.lastID);
    }
  });
}

// Export the getAllPlayers function
module.exports = {
  getAllPlayers: getAllPlayers,
  createPlayer: createPlayer
};