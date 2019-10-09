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

