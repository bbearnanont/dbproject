//sql connection
var mysql = require('mysql');
var connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'dbproject'
});
var condition;
var userlevel;
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
    console.log(sess);
    if(sess.Customer||sess.Staff)
    {
        if(sess.Customer)
        {
            condition = "WHERE Customer_ID = +'"+sess.CustomerID+"'";
            userlevel = 'customer';
        }
        else
        {
            condition = "";
            userlevel = 'staff';
        }
        connection.query("SELECT * FROM Product",function(err,result){
        if(err){
            res.send('Error' + err);
            return;
        }
            connection.query("SELECT * FROM purchase_order "+condition,function(err,result2){
                if(err){
                    res.send('Err'+err);
                    return;
                }
                console.log(result2);
                res.render('purchaseorder.html',{product:result, po:result2, userlevel:userlevel});
            });
        });
    }
    else
    {
        res.redirect('CustomerLogin');
    }
}

exports.addItem = function (req,res){

        var insertPo = {Customer_ID:sess.CustomerID, Description:req.body.Description, Delivered_Date:req.body.Delivered_Date,Total:req.body.allTotal};
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
        var insertPoList = {Po_ID:result[result.length-1].Po_ID, Product_ID:req.body.item[i].Product_ID, Product_Amount:req.body.item[i].Quantity};
        connection.query('INSERT INTO Purchase_Order_List SET ?',insertPoList,function(err,result2){
            if(err){
                console.log(err);
                return;
            }
        });
        var insertPf = {Po_ID:result[result.length-1].Po_ID, Product_ID:req.body.item[i].Product_ID, Product_Amount:-req.body.item[i].Quantity};
        connection.query('INSERT INTO Product_Flow SET ?'+', Date = CURDATE()', insertPf, function(err, result2){
            if(err){
                console.log(err);
                return;
            }
        });    
    }
        }
        });
    
    res.redirect('/purchaseorder');
}

exports.updateItem = function (req,res){
    var update = {Po_ID:req.body.update_col1, Description:req.body.update_col5, Delivered_Date:req.body.update_col6};
    connection.query('UPDATE Purchase_order SET ?' + 'WHERE Po_ID = ' + update.Po_ID, update, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/purchaseorder');
    });
}

exports.deleteItem = function (req,res){
    var del = {Po_ID:req.body.del_Po_ID};
    connection.query('DELETE FROM Purchase_Order WHERE ?', del, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/purchaseorder');
    });
}