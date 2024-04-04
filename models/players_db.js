// Function to open a connection to the database file
function getDbConnection() {
  const sqlite3 = require("sqlite3").verbose();
  // Connecting to the database
  let db = new sqlite3.Database("mizzousoccerdatabase.db",sqlite3.OPEN_READWRITE,(err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the database.");
    }
  );
  return db; // Return the database connection
}

//View (Read)
// Function to get all players
function getAllPlayers(callback) {
  // Get a db connection
  let db = getDbConnection();
  let sql = "SELECT * FROM Players";
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
          console.log("Database connection is closed");
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

//Update

// let sql = 'UPDATE Players SET jerseynumber = ? WHERE id = ?';
// db.run(sql, [10, 2], (err) => {
//     if(err) {
//         console.error(err.message);
//     }
//     console.log('Player successfully updated')
// })

//Delete
// Usage example:
getAllPlayers((err, players) => {
    if (err) {
        console.error('Error retrieving players:', err);
    } else {
        // Do something with the players array
        console.log(players);
    }
});

//close the database connection
// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   } else {
//     console.log("Database connection is closed");
//   }
// });
