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

    connection.query(`WHERE * FROM products WHERE id = ${ID}` function(err,res) {
        if (err) throw err;
        connection.query(`UPDATE products SET stock_quantity = stock_quantity ${amountAdded} WHERE id = ${ID}`);

        inventory()
    });

};

