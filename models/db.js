const sqlite3 = require("sqlite3").verbose();
const path = require("path");

try {
  const dbPath = path.resolve(__dirname, "../var/db/mizzousoccerdatabase.db");
  console.log(dbPath);

  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      throw new Error("Error connecting to the database: " + err.message);
    } else {
      console.log("Connected to the database.");
    }
  });

  module.exports = db;
} catch (error) {
  console.error("An error occurred while opening the database:", error.message);
  throw error;
}
// mv /Users/leonbosco/Desktop/Sqlite-Mizzou-SoccerDB/mizzousoccerdatabase.db /

// sudo scp /Users/leonbosco/Desktop/Sqlite-Mizzou-SoccerDB/mizzousoccerdatabase.db ubuntu@3.16.254.68:/home/ubuntu/Soccer-Club-Website/var/db

// scp -i "nodejs-ssl-key.pem" /Users/leonbosco/Desktop/Sqlite-Mizzou-SoccerDB/mizzousoccerdatabase.db ubuntu@3.16.254.68:/home/ubuntu/Soccer-Club-Website/var/db



