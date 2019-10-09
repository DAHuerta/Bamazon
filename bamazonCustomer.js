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

var viewProducts = function() {
    
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        
        var viewTable = new table ({
            head: ["Item ID", "Product Name", "Department", "Price", "Stock"],
            colWidths: [10,25,25,10,10],
        });

        for (var i = 0; i < res.length; i++) {
            viewTable.push(
                [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(viewTable.toString());
        sales()
    });

}; 

function sales() {

    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "Enter the ID number of the item you want to purchase",
            filter: Number
        },
        {
            name: "Amount",
            type: "input",
            message: " Enter amount of item that you would like to purchase",
            filter: Number
        }
    ]).then(function(answers) {
        var amountNeeded = answers.Amount;
        var idNeeded = answers.ID
        purchase(idNeeded, amountNeeded);
    });

};

function purchase(ID, numNeeded) {

    
}