DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER(10) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jordan 3s", "Shoes", 130.27, 20); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("IT", "Movies", 15.00, 100); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone 11", "Phones", 500.50, 30); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung 70inch LED TV", "Electronics", 2500.99, 46); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Leather Jump Rope", "Athletic Equipment", 13.00, 150); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DC Villians", "Shoes", 47.88, 60); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Charzard 1st Edition", "Collectables", 325.00, 5); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Budweiser Clydesdale Vintage Sign", "Collectables", 20000.85, 2); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung Galaxy 10", "Phones", 300.00, 45); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple Macbook Pro", "Electronics", 2325.35, 17); 

SELECT * FROM products;