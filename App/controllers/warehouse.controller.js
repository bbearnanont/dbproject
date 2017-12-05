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
exports.showWarehouse = function (req, res){
    connection.query("SELECT * FROM warehouses",function(err,result){
    if(err){
        res.send('Error' + err);
        return;
    }
    res.render('warehouse.html',{item:result});    
    });
}

exports.addWarehouse = function (req,res){
    var insert = {Wh_Name:req.body.Warehouse_Name, Wh_Location:req.body.Warehouse_Location}
    connection.query('INSERT INTO warehouses SET ?',insert,function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/warehouse');
    });
}

exports.updateWarehouse = function (req,res){
    var id = {Wh_ID:req.body.update_col1};
    var update = {Wh_ID:req.body.update_col1, Wh_Name:req.body.update_col2, Wh_Location:req.body.update_col3};
    connection.query('UPDATE warehouses SET ? WHERE ?', update, id, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/warehouse');
    });
}

exports.deleteWarehouse = function (req,res){
    var del = {Wh_ID:req.body.del_Warehouse_ID};
    console.log(del);
    connection.query('DELETE FROM warehouses WHERE ?', del, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/warehouse');
    });
}