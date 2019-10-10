var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("cli-table");

var connection = mysql.createConnection({

    host: "localHost",
    port: 3306,
    user: "root",
    password: "Quattro_Quattro08",
    database: "bamazon_db"

});


connection.connect(function(err) {

    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);

});

function inventory(){
    
connection.query(`SELECT * FROM products`, function(err, res){
    if (err) throw err

    var showInventory = new table ({
        head: ["Item ID", "Product Name", "Department", "Price", "Stock"],
        colWidths: [10,25,25,10,10],
    });

    for (var i = 0; i < res.length; i++) {
        showInventory.push(
            [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
        );
    };
    console.log(showInventory.toString());
    updateOptions()
});

};

function updateOptions() {

    inquirer.prompt([
        {
            name: "options",
            type: "list",
            message: "Please, choose an inventory option",
            choices: ["Replinish Inventory", "Add Product", "Remove Product"]
        }
    ]).then(function(answers) {
        
            switch(answers.options) {
                case "Replinish Inventory":
                    replinish();
                    break;
                case "Add Product":
                    add();
                    break;
                case "Remove Product":
                    remove();
                    break;
            }
        });

};

function replinish() {

    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "Enter the ID number of the item you want to purchase",
            filter: Number,
        },
        {
            name: "Amount",
            type: "input",
            message: " Enter amount of item that you would like to purchase",
            filter: Number,
        }
    ]).then(function(answers) {
        var amountAdded = answers.Amount;
        var idNeeded = answers.ID
        replinishInventory(idNeeded, amountAdded);
    });

};

function replinishInventory(ID, amountAdded) {

    connection.query(`WHERE * FROM products WHERE id = ${ID}`, function (err,res) {
        if (err) throw err;
        connection.query(`UPDATE products SET stock_quantity = stock_quantity ${amountAdded} WHERE id = ${ID}`);

        inventory()
    });

};

function add() {

    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "Add product ID number"
        },
        {
            name: "name",
            type: "input",
            message: "What is the name of the product?"
        },
        {
            name: "department",
            type: "input",
            message: "What department is your product in?"
        },
        {
            name: "price",
            type: "input",
            message: "How much does this product cost?"
        },
        {
            name: "Stock",
            type: "input",
            message: "How much of this product do we have in stock?"
        },
    ]).then(function(answers) {
        var newId = answers.ID;
        var prodName = answers.name;
        var depart = answers.department;
        var prodPrice = answers.price;
        var quantity = answers.stock;
        newProduct(newId, prodName, depart, prodPrice, quantity);
    });

};

function newProduct(prodName, depart, prodPrice, stock) {

    connection.query(`INSERT INTO products (id, product_name, department_name, price, stock_quantity) VALUES(${ID},${prodName}, ${depart}, ${prodPrice}, ${stock})`);

    inventory();

};

function remove() {

    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "What is the amount you would like to remove?"
        }
    ]).then(function(answers) {
        var newId = answers.ID;
        removeProduct(ID);
    });

};

function removeProduct(ID) {

    connection.query(`DELETE FROM products WHERE id = ${ID}`, function(err, res) {
        if (err) throw err;
        inventory()
    });

};

inventory();