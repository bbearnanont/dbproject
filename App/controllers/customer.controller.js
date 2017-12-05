//sql connection
var mysql = require('mysql');
var connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'dbproject'
});
connection.connect(function(error){
if(!!error){
console.log('Error');
}
else{
    console.log('Connected');
}
});

//function exports
exports.showItem = function (req, res){
    connection.query("SELECT * FROM Customer",function(err,result){
    if(err){
        res.send('Error' + err);
        return;
    }
    res.render('customer.html',{item:result});    
    });
}

exports.addItem = function (req,res){
    var insert = {Customer_FirstName:req.body.Customer_FirstName, Customer_LastName:req.body.Customer_LastName, Customer_Number:req.body.Customer_Number, Customer_Email:req.body.Customer_Email, Customer_Address:req.body.Customer_Address, Company:req.body.Company};
    connection.query('INSERT INTO Customer SET ?',insert,function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Customer');
    });
}

exports.updateItem = function (req,res){
    var id = {Customer_ID:req.body.Customer_ID};
    var update = {Customer_ID:req.body.update_col1, Customer_FirstName:req.body.update_col2, Customer_LastName:req.body.update_col3, Customer_Number:req.body.update_col4, Customer_Email:req.body.update_col5, Customer_Address:req.body.update_col6, Company:req.body.update_col7};
    connection.query('UPDATE Customer SET ?', update, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Customer');
    });
}

exports.deleteItem = function (req,res){
    var del = {Customer_ID:req.body.del_Customer_ID};
    connection.query('DELETE FROM Customer WHERE ?', del, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Customer');
    });
}