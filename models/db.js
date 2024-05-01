// import necessary modules
const sqlite3 = require("sqlite3").verbose();

try {
  // Connecting to the database
  const db = new sqlite3.Database("/Users/leonbosco/Desktop/Sqlite-Mizzou-SoccerDB/mizzousoccerdatabase.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      throw new Error("Error connecting to the database: " + err.message);
    } else {
      console.log("Connected to the database.");
    }
  });

  module.exports = db; // Export the database connection
} catch (error) {
  console.error("An error occurred while opening the database:", error.message);
  throw error; // Throw the error for further handling by the caller
}

