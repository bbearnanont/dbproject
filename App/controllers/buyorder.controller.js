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
    connection.query("SELECT * FROM Buy_Order ",function(err,result){
    if(err){
        res.send('Error' + err);
        return;
    }
    else
    {
    connection.query("SELECT Sup_Name, Sup_ID FROM supplier",function(err2,result2)
    {
        if(err2){
            res.send('Error' + err2);
            return;
        }
        else
        {
            connection.query("SELECT Staff_ID,Staff_First_Name,Staff_Last_Name FROM staff",function(err3,result3){
                if(err3){
                    res.send('Error' + err3);
                    return;
                }
                else
                {
                connection.query("SELECT * FROM Material",function(err4,result4){
                    res.render('buyorder.html',{item:result,supplier:result2,staff:result3,material:result4});
                });
                }
            });

        }

    }
    );  
    };    
    });
}

exports.addItem = function (req,res){
    var insertBo = {Sup_ID:req.body.Sup_ID, Order_Date:req.body.Order_Date, Delivered_Date:req.body.Delivered_Date, Staff_ID:req.body.Staff_ID, Description:req.body.Description};
    connection.query("INSERT INTO Buy_Order SET ?", insertBo, function(err, result){
        if(err){
            console.log(err);
            return;
        }
    });
        connection.query("SELECT * FROM Buy_Order", function(err, result){
    for(var i = 0 ; i < req.body.item.length; i++){
        if(parseFloat(req.body.item[i].Quantity)>0){
            var insertBoList = {Bo_ID:result[i].Bo_ID, Mat_ID:req.body.item[i].Mat_ID, Mat_Amount:req.body.item[i].Quantity, UNIT:req.body.item[i].UNIT};
            connection.query("INSERT INTO Buy_Order_List SET ?", insertBoList);
        }
    }
    });
    for(var i = 0 ; i < req.body.item.length; i++){
        connection.query('UPDATE Material SET Mat_Balance = Mat_Balance + '+ req.body.item[i].Quantity + ' WHERE Mat_ID = '+ req.body.item[i].Mat_ID + '', function(err,result){
        if(err){
            console.log(err);
            return;
        }        
    });
    }

}

exports.updateItem = function (req,res){
    var update = {Bo_ID:req.body.update_col1, Sup_ID:req.body.update_col2, Order_Date:req.body.update_col3, Delivered_Date:req.body.update_col4, Staff_ID:req.body.update_col5, Description:req.body.update_col6};
    connection.query('UPDATE Buy_Order SET ?' + 'WHERE Bo_ID = ' + update.Bo_ID, update, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/BuyOrder');
    });
}

exports.deleteItem = function (req,res){
    var del = {Bo_ID:req.body.del_Bo_ID};
    connection.query('DELETE FROM Buy_Order WHERE ?', del, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/BuyOrder');
    });
}