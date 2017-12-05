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
    connection.query("SELECT * FROM Staff",function(err,result){
    if(err){
        res.send('Error' + err);
        return;
    }
    res.render('staff.html',{item:result});    
    });
}

exports.addItem = function (req,res){
    var insert = {Staff_Name:req.body.Staff_Name, Department_ID:req.body.Department_ID}
    connection.query('INSERT INTO Staff SET ?',insert,function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Staff');
    });
}

exports.updateItem = function (req,res){
    var id = {Staff_ID:req.body.update_col1};
    var update = {Staff_ID:req.body.update_col1, Staff_Name:req.body.update_col2, Department_ID:req.body.update_col3};
    connection.query('UPDATE Staff SET ? WHERE ?', update, id, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Staff');
    });
}

exports.deleteItem = function (req,res){
    var del = {Product_ID:req.body.del_Staff_ID};
    console.log(del);
    connection.query('DELETE FROM Staff WHERE ?', del, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Staff');
    });
}