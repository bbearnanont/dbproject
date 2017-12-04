//use strict mode
'use strict';
//npm used
var express = require('express');
var app = express();
var ejs = require('ejs');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var port = 8000;


//sql connection
var connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'nodejstest'
});
connection.connect(function(error){
if(!!error){
console.log('Error');
}
else{
    console.log('Connected');
}
});

//setting up
app.use(bodyParser());
app.engine('html', ejs.renderFile);  
app.listen(port);
app.use(express.static('public'));

//routing
app.get('/Product', Product);
app.post('/addProduct', addProduct);
app.post('/deleteProduct', deleteProduct);
app.post('/updateProduct', updateProduct);

//function
function Product(req, res){
    connection.query("SELECT * FROM Product",function(err,result){
    if(err){
        res.send('Error' + err);
        return;
    }
    res.render('testsql.html',{item:result});    
    });
}

function addProduct(req,res){
    var insert = {Product_Name:req.body.Product_Name, Product_Balance:req.body.Product_Balance, Unit_Price:req.body.Unit_Price, Unit_Measure:req.body.Unit_Measure}
    connection.query('INSERT INTO Product SET ?',insert,function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Product');
    });
}

function updateProduct(req,res){
    var update = {Product_ID:req.body.update_col1, Product_Name:req.body.update_col2, Product_Balance:req.body.update_col3, Unit_Price:req.body.update_col4, Unit_Measure:req.body.update_col5};
    connection.query('UPDATE Product SET ?', update, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Product');
    });
}

function deleteProduct(req,res){
    var del = {Product_ID:req.body.del_Product_ID};
    console.log(del);
    connection.query('DELETE FROM Product WHERE ?', del, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Product');
    });
}