// import the dependencies
// import { readFileSync } from 'fs';
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

//read the sql file
const schema =fs.readFileSync('../models/schema.sql', 'utf-8');

//connect to the sqlite database file
const db = new sqlite3.Database('../models/mizzousoccerdatabase.db');

//execute the schema sql commands
db.serialize(() => {
    db.exec(schema, (err) => {
        if(err) {
            console.error('Error executing schema:', err.message);
        }else {
            console.log('Database schema created successfully');
        }
    });
});

//close the database connection
db.close((err) => {
    if(err) {
        console.error('Unable to close the database connection:', err.message);
    }else {
        console.log('Database connection is closed');
    }
});

