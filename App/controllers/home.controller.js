//sql connection
/*var mysql = require('mysql');
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
});*/

//function exports
exports.showItem = function(req,res)
{
    res.render('home.html');
}

/*
exports.addItem = function (req,res){
    var insert = {Sup_Name:req.body.Sup_Name, Sup_Number:req.body.Sup_Number, Sup_Email:req.body.Sup_Email, Sup_Address:req.body.Sup_Address}
    connection.query('INSERT INTO Supplier SET ?',insert,function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Supplier');
    });
}

exports.updateItem = function (req,res){
    var update = {Sup_ID:req.body.update_col1, Sup_Name:req.body.update_col2, Sup_Number:req.body.update_col3, Sup_Email:req.body.update_col4, Sup_Address:req.body.update_col5};
    connection.query('UPDATE Supplier SET ?' + 'WHERE Sup_ID = ' + update.Sup_ID, update, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Supplier');
    });
}

exports.deleteItem = function (req,res){
    var del = {Sup_ID:req.body.del_Sup_ID};
    connection.query('DELETE FROM Supplier WHERE ?', del, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Supplier');
    });
}*/