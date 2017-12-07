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
exports.showMostReturnProduct = function (req, res){
    sess = req.session;
    console.log(sess);
    if(sess.Staff)
    {
       connection.query("SELECT p.Product_ID, p.Product_Name, sum(rpl.Amount) AS Amount FROM return_product_list rpl, product p WHERE rpl.Product_ID = p.Product_ID GROUP BY rpl.Product_ID ORDER BY sum(rpl.Amount) DESC LIMIT 5",function(err,result){
        if(err){
            res.send('Error' + err);
            return;
        }
        res.render('mostreturnproduct.html',{item:result});    
        });
    }
    else
    {
        res.redirect('StaffLogin');
    }
}
