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
    sess = req.session;
    if(sess.Customer)
    {
        connection.query("SELECT * FROM return_product",function(err,result){
        if(err){
            res.send('Error' + err);
            return;
        }
        else
        {
        connection.query("SELECT pl.Po_ID AS Po_ID,pl.Product_ID AS Product_ID, pl.Product_Amount AS Product_Amount, po.Description AS Description,p.Product_Name AS Product_Name,p.Unit_Measure AS Unit_Measure FROM purchase_order po, purchase_order_list pl, product p WHERE po.Po_ID = pl.Po_ID AND p.Product_ID = pl.Product_ID",function(err2,result2)
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
    else
    {
        console.log("Please login");
        res.redirect('StaffLogin');
    }
}

exports.addItem = function (req,res){
    var Description = req.body.Description;
    var Attempt_Date = req.body.Attempt_Date;
    var Result_Date = req.body.Result_Date;
    var insertPR = {Description:Description, Result_Date:Result_Date};    
    var arr = [];
    for(var i = 0 ; i < req.body.item.length; i++){
        arr.push(i);
    }

    connection.query('INSERT INTO return_product SET ? ,'+ 'Attempt_Date = CURDATE()',insertPR,function(err,result){
        if(err){
            console.log(err);
            return;
        }
        {
        };
    });
    connection.query('SELECT * FROM return_product', function(err, result){
    arr.forEach(function(i){
        var Rp_ID = result[result.length-1].Rp_ID;
        var Po_ID = req.body.item[i].Po_ID;
        var Product_ID = req.body.item[i].Product_ID;
        var Amount = req.body.item[i].Product_Amount;
        if(parseFloat(req.body.item[i].Product_Amount)>0){
            var insertPRList = {Rp_ID: Rp_ID,Po_ID:Po_ID, Product_ID:Product_ID, Amount:Amount};
            connection.query('INSERT INTO return_product_list SET ?', insertPRList, function(err, result2){
                if(err){
                    console.log(err);
                    return;
                }
            });
            var insertPFlow = {Product_ID:Product_ID, Product_Amount:Amount, Rp_ID:Rp_ID, Staff_ID:1};
            connection.query('INSERT INTO Product_Flow SET ?'+', Date = CURDATE()',insertPFlow,function(err, result2){
                if(err){
                    console.log(err);
                    return;
                }
            });    
          
        }
    });

    arr.forEach(function(i){
        if(parseFloat(req.body.item[i].Product_Amount)>0){
            connection.query('SELECT * FROM return_product_list',function(err, result2){
                if(err){
                    console.log(err);
                    return;
                }
                connection.query('UPDATE Purchase_order_list SET Product_Amount = Product_Amount - '+ req.body.item[i].Product_Amount + ' WHERE Product_ID = '+ req.body.item[i].Product_ID + ' AND Po_ID = ' + result2[result2.length-1].Po_ID, function(err, result3){
                    if(err){
                        console.log(err);
                        return;
                    }
                }); 
            });
        }
        console.log("END LOOP");
    });
    arr.forEach(function(i){
        connection.query('UPDATE Product SET Product_Balance = Product_Balance + '+ req.body.item[i].Product_Amount + ' WHERE Product_ID = '+ req.body.item[i].Product_ID, function(err,result){
            if(err){
                console.log(err);
                return;
            }
        });
    });
    });
    res.redirect('/returnproduct');
}

exports.updateItem = function (req,res){
    var update = {Rp_ID:req.body.update_col1,    Attempt_Date:req.body.update_col3, Result_Date:req.body.update_col4, Description:req.body.update_col5};
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