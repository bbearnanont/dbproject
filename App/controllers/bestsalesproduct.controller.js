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
        
         connection.query('SELECT  p.Product_ID, p.Product_Name, p.Unit_Price, p.Unit_Measure, SUM(po.Product_Amount) AS SalesAmount, (p.Unit_Price*SUM(po.Product_Amount)) AS TotalSales FROM product p,  purchase_order_list po WHERE p.Product_ID = po.Product_ID GROUP BY po.Product_ID ORDER BY TotalSales DESC', function(err,result){
                    if(err){
                        console.log(err);
                        return;
                    }                         
                    res.render('bestsalesproduct.html',{item:result});
                     
                });
       }

