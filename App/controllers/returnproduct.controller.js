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
    connection.query("SELECT * FROM return_product",function(err,result){
    if(err){
        res.send('Error' + err);
        return;
    }
    else
    {
    connection.query("SELECT pl.Po_ID AS Po_ID,pl.Product_ID AS Product_ID, pl.Product_Amount AS Product_Amount, pl.Description AS Description,p.Product_Name ,p.Unit_Measure AS Unit_Measure FROM purchase_order_list pl, product p WHERE p.Product_ID = pl.Product_ID",function(err2,result2)
    {
        if(err2){
            res.send('Error' + err2);
            return;
        }
        else
                res.render('returnproduct.html',{item:result,purchase_order_list:result2});
                
            }
        );
        }
    }
    );  
}

exports.addItem = function (req,res){
    var Description = req.body.Description;
    var Attempt_Date = req.body.Attempt_Date;
    var Result_Date = req.body.Result_Date;
    connection.query('INSERT INTO return_product SET ?',insert,function(err,result){
        if(err){
            console.log(err);
            return;
        }
        {
            res.redirect('/ReturnProduct')
        };
    });
}

exports.updateItem = function (req,res){
    var update = {Rp_ID:req.body.update_col1, Po_ID:req.body.update_col2, Attempt_Date:req.body.update_col3, Result_Date:req.body.update_col4, Description:req.body.update_col5};
    connection.query('UPDATE return_product SET ?' + 'WHERE Rp_ID = ' + update.Rp_ID, update, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/ReturnProduct');
    });
}

exports.deleteItem = function (req,res){
    var del = {Rp_ID:req.body.del_Rp_ID};
    connection.query('DELETE FROM return_product WHERE ?', del, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/ReturnProduct');
    });
}