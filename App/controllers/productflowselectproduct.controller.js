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
    connection.query("SELECT Product_ID,Product_Name FROM Product ",function(err,result){
    if(err){
        res.send('Error' + err);
        return;
    }
    else
    {
        if(req.body.Select)
        {
             connection.query('SELECT p.Product_Name, pf.Product_Amount, pf.Po_ID, pf.Rp_ID, pf.Date FROM product_flow pf, product p WHERE pf.Product_ID=p.Product_ID AND pf.Product_ID = ' +req.body.Select, function(err2,result2){
                    if(err2){
                        console.log(err2);
                        return;
                    } 
                                       
                    res.render('productflowselectproduct.html',{item:result,pf:result2});
                });
        }
        else
        {
             connection.query('SELECT p.Product_Name, pf.Product_Amount, pf.Po_ID, pf.Rp_ID, pf.Date FROM product_flow pf,product p WHERE pf.Product_ID=p.Product_ID AND pf.Product_ID = 1', function(err3,result3){
                    if(err3){
                        console.log(err3);
                        return;
                    }
                    res.render('productflowselectproduct.html',{item:result,pf:result3});
                });
        }
    }
    });

}

