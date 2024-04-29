DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    hashed_password BLOB,
    salt BLOB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS Coach;

CREATE TABLE Coach (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL
);

DROP TABLE IF EXISTS Players;

CREATE TABLE Players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    position TEXT NOT NULL,
    jerseynumber INTEGER NOT NULL,
    class TEXT NOT NULL,
    major TEXT NOT NULL,
    bio TEXT NOT NULL
);

DROP TABLE IF EXISTS Articles;

CREATE TABLE Articles ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS Schedules;

CREATE TABLE Schedules (
    match_id INTEGER PRIMARY KEY AUTOINCREMENT,
    date_unix INTEGER NOT NULL,
    time_unix INTEGER NOT NULL,
    opponent TEXT NOT NULL,
    location TEXT NOT NULL,
    result TEXT NOT NULL
);

DROP TABLE IF EXISTS ProspectivePlayer;

CREATE TABLE ProspectivePlayer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    birthdate DATE NOT NULL,
    email TEXT NOT NULL,
    position TEXT NOT NULL,
    attend_mizzou TEXT NOT NULL,
    height REAL NOT NULL,
    weight REAL NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--Purchase tables
DROP TABLE IF EXISTS Tickets;

CREATE TABLE Tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_name TEXT NOT NULL,
    ticket_price REAL NOT NULL,
    ticket_quantity INTEGER NOT NULL,
    ticket_description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS Products;

CREATE TABLE Products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    product_price REAL NOT NULL,
    product_quantity INTEGER NOT NULL,
    product_description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS Orders;

CREATE TABLE Orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    total_amount REAL NOT NULL,
    order_status TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

DROP TABLE IF EXISTS OrderItems;

CREATE TABLE OrderItems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id REAL NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (product_id) REFERENCES Tickets(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);
