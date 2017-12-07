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
        console.log(req.query.End_Date);
        if(req.query.Start_Date && req.query.End_Date)
        {
             connection.query('SELECT p.Product_Name, pf.Product_Amount, pf.Po_ID, pf.Rp_ID, pf.Date FROM product_flow pf, product p WHERE pf.Product_ID=p.Product_ID AND pf.Date >= "'+req.query.Start_Date+'"'+ ' AND pf.Date <= "'+req.query.End_Date+'"', function(err2,result2){
                    if(err2){
                        console.log(err2);
                        return;
                    }                         
                    res.render('productflowselectdate.html',{pf:result2});
                     console.log(result2);
                });
        }
        else
        {
             connection.query('SELECT p.Product_Name, pf.Product_Amount, pf.Po_ID, pf.Rp_ID, pf.Date FROM product_flow pf, product p WHERE pf.Product_ID=p.Product_ID', function(err3,result3){
                    if(err3){
                        console.log(err3);
                        return;
                    } 
                    res.render('productflowselectdate.html',{pf:result3});

                });
        }

}

