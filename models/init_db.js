// import the dependencies
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

try {
    // read the sql file
    const schema = fs.readFileSync('schema.sql', 'utf-8');

    // set up the database connection
    const db = new sqlite3.Database('/Users/leonbosco/Desktop/Sqlite-Mizzou-SoccerDB/mizzousoccerdatabase.db');

    // execute the schema sql commands
    db.serialize(() => {
        db.exec(schema, (err) => {
            if (err) {
                console.error('Error executing schema:', err.message);
            } else {
                console.log('Database schema created successfully');
            }
        });
    });

    // close the database connection
    db.close((err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Database connection is closed');
        }
    });
} catch (error) {
    console.error('An error occurred:', error.message);
}
