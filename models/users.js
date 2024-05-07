// import necessary modules
const db = require("./db");
const crypto = require("crypto");
const passport = require("passport");
const LocalStrategy = require('passport-local');

function hashPassword(password, salt, callback){
  crypto.pbkdf2(password, salt, 310000, 32, 'sha256', (err, hashedPassword) => {
    if(err){
      return callback(err);
    }
    callback(null, hashedPassword);
  });
}

function createUser(username, email, password, callback) {
  //let db = getDbConnection();
  let salt = crypto.randomBytes(16);

  hashPassword(password, salt, (err, hashedPassword) => {
      if (err) {
          console.error(err.message);
          return callback(err);
      }

      let sql = 'INSERT INTO Users (username, email, hashed_password, salt) VALUES (?, ?, ?, ?)';
      db.run(sql, [username, email, hashedPassword, salt], function(err) {
          if (err) {
              console.error(err.message);
              callback(err);
          } else {
              console.log("User successfully added");
              //db.close();
              callback(null, this.lastID);
          }
      });
  });
}
passport.use(new LocalStrategy(function verify(username, password, cb) {
  getUser(username, password, function(err, user) {
      if (err) {
          return cb(err);
      }
      return cb(null, user);
  });
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

function getUser(username, password, cb) {
  //let db = getDbConnection();
  let sql = 'SELECT * FROM Users WHERE username = ?';
  db.get(sql, [username], function(err, row) {
      if (err) {
          return cb(err);
      }
      if (!row) {
          return cb(null, false, { message: 'Incorrect username or password' });
      }

      crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) {
            return cb(err);
        }
        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
            return cb(null, false, { message: 'Incorrect username or password' });
        }
        return cb(null, row);
    });
  });
}

module.exports = {
    createUser: createUser,
    getUser: getUser
  };