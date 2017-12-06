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
    connection.query("SELECT * FROM Product",function(err,result){
    if(err){
        res.send('Error' + err);
        return;
    }
        connection.query("SELECT * FROM purchase_order",function(err,result2){
            if(err){
                res.send('Err'+err);
                return;
            }
            res.render('purchaseorder.html',{product:result, po:result2});
        });
    });
}

exports.addItem = function (req,res){
        var insertPo = {Customer_ID:1, Staff_ID:1, Description:req.body.item[0].Description, Delivered_Date:req.body.item[0].Delivered_Date,Total:req.body.allTotal};
    connection.query('INSERT INTO Purchase_Order SET ?' + ',`Order_Date` = CURDATE()', insertPo,function(err,result){
        if(err){
            console.log(err);
            return;
        }
    });
    for(var i = 0 ; i < req.body.item.length; i++){
    connection.query('UPDATE Product SET Product_Balance = Product_Balance - '+ req.body.item[i].Quantity + ' WHERE Product_ID = '+ req.body.item[i].Product_ID + '', function(err,result){
        if(err){
            console.log(err);
            return;
        }
    });
    }
    //console.log(req.body.item[i].Quantity);
    connection.query('SELECT * FROM Purchase_Order', function(err,result){
        if(err){
            console.log(err);
            return;
        }
        for(var i = 0 ; i < req.body.item.length ; i++){
            if(parseFloat(req.body.item[i].Quantity)> 0){
        var insertPoList = {Po_ID:result[result.length-1].Po_ID, Product_ID:req.body.item[i].Product_ID, Product_Amount:req.body.item[i].Quantity, Description:req.body.item[i].Description};
        connection.query('INSERT INTO Purchase_Order_List SET ?',insertPoList,function(err,result2){
            if(err){
                console.log(err);
                return;
            }
        });
        }
        console.log(i);
        }
        });
    res.redirect('/purchaseorder');
}

exports.updateItem = function (req,res){
    var update = {Sup_ID:req.body.update_col1, Sup_Name:req.body.update_col2, Sup_Number:req.body.update_col3, Sup_Email:req.body.update_col4, Sup_Address:req.body.update_col5};
    connection.query('UPDATE Supplier SET ?' + 'WHERE Sup_ID = ' + update.Sup_ID, update, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Supplier');
    });
}

exports.deleteItem = function (req,res){
    var del = {Sup_ID:req.body.del_Sup_ID};
    connection.query('DELETE FROM Supplier WHERE ?', del, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Supplier');
    });
}