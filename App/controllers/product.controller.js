//sql connection
var mysql = require('mysql');
var connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'dbproject'
});
var sess;
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
    sess = req.session;
    if(sess.email)
    {
        console.log("Email"+sess.email+"Cus")
        connection.query("SELECT * FROM Product",function(err,result){
        if(err){
            res.send('Error' + err);
            return;
        }
        res.render('product.html',{item:result});    
        });
    }
    else
    {
        console.log("Please login");
        res.redirect('login');
    }
}

exports.addItem = function (req,res){
    var insert = {Product_Name:req.body.Product_Name, Product_Balance:req.body.Product_Balance, Unit_Price:req.body.Unit_Price, Unit_Measure:req.body.Unit_Measure}
    connection.query('INSERT INTO Product SET ?',insert,function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Product');
    });
}

exports.updateItem = function (req,res){
    var update = {Product_ID:req.body.update_col1, Product_Name:req.body.update_col2, Product_Balance:req.body.update_col3, Unit_Price:req.body.update_col4, Unit_Measure:req.body.update_col5};
    connection.query('UPDATE Product SET ?' + 'WHERE Product_ID = ' + 'update.Product_ID', update, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Product');
    });
}

exports.deleteItem = function (req,res){
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