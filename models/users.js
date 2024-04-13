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

function createUser(username, email, password, role, callback) {
    let db = getDbConnection();
    let sql = 'INSERT INTO Users (username, email, password, role) VALUES (?, ?, ?, ?)';
    db.run(sql, [username, email, password, role], function(err) {
        if (err) {
            console.error(err.message);
            callback(err);
        } else {
            console.log("User successfully added");
            db.close();
            callback(null, this.lastID); // Pass the last inserted ID as a result
        }
    });
}

module.exports = {
    createUser: createUser
  };