# Database

The website have two user roles: Admin and User.

## Admin Role:
- Admin users will have the ability to perform CRUD operations on products, articles, and players.
- They will have full access to manage the database.

## User Role:
- Regular users will have limited access and can perform actions such as purchasing tickets and product.
- They won't have permission to perform CRUD operations on products, articles, and players.

## Tables Relationship (Schema)
### 1.Users Table:
- Each user has a unique id as its primary key.
- This id field is referenced as a foreign key (user_id) in the Orders table to associate orders with the corresponding user who placed them.

### 2.Tickets and Products Tables:
- Each ticket and product item also has a unique id as its primary key.
- These id fields are referenced as foreign keys (product_id) in the OrderItems table to associate each order item with the corresponding ticket or product item.

### 3.Orders Table:
- Each order has a unique id as its primary key.
- The user_id field in the Orders table is a foreign key that references the id field in the Users table, establishing a relationship between orders and the users who placed them.
- The id field from the Orders table is referenced as a foreign key (order_id) in the OrderItems table to associate each order item with the corresponding order.

### 4.OrderItems Table:
- Each order item has a unique id as its primary key.
- The order_id field in the OrderItems table is a foreign key that references the id field in the Orders table, establishing a relationship between order items and the orders they belong to.
- The product_id field in the OrderItems table is a foreign key that references the id field in both the Tickets and Products tables, allowing each order item to be associated with a specific ticket or product item.
