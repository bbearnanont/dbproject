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
        
         connection.query('SELECT  p.Product_ID, p.Product_Name, p.Unit_Price, p.Unit_Measure, sum(l.product_amount) AS TotalAmountFromPO FROM product p, purchase_order_list l WHERE p.product_id = l.product_id GROUP BY l.product_id ORDER BY TotalAmountFromPO DESC', function(err,result){
                    if(err){
                        console.log(err);
                        return;
                    }                         
                    res.render('popularproduct.html',{item:result});
                     
                });
       }

