// import necessary modules
const db = require("./db");

// Function to get all coaches
function getAllCoach(callback) {
  let sql = 'SELECT * FROM Coach';
  db.all(sql, [], (err, results) => {
      if (err) {
          console.error(err.message);
          callback(err, null); // Pass error to callback
      } else {
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