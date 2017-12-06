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
    connection.query("SELECT Po_ID FROM purchase_order",function(err2,result2)
    {
        if(err2){
            res.send('Error' + err2);
            return;
        }
        else
                res.render('returnproduct.html',{item:result,purchase_order:result2});
                
            }
        );
        }
    }
    );  
}

exports.addItem = function (req,res){
    var insert = {PO_ID:req.body.PO_ID, Attempt_Date:req.body.Attempt_Date, Result_Date:req.body.Result_Date, Description:req.body.Description};
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