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
    connection.query("SELECT * FROM Material_Order ",function(err,result){
    if(err){
        res.send('Error' + err);
        return;
    }
    else
    {
    connection.query("SELECT Staff_ID,Staff_First_Name,Staff_Last_Name FROM staff",function(err2,result2)
    {
        if(err2){
            res.send('Error' + err2);
            return;
        }
        else
        {
            connection.query("SELECT Wo_id, Head_Staff FROM Work_Order",function(err3,result3){
                if(err3){
                    res.send('Error' + err3);
                    return;
                }
                else
                {
                    connection.query("SELECT * FROM Material",function(err4,result4){
                    res.render('materialorder.html',{item:result,staff:result2,work_order:result3,material:result4});
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
    var insert = {Date:req.body.Date, Staff_ID:req.body.Staff_ID, Wo_id:req.body.Wo_id, Description:req.body.Description};
    connection.query('INSERT INTO Material_Order SET ?',insert,function(err,result){
        if(err){
            console.log(err);
            return;
        }
    });
        connection.query("SELECT * FROM Material_Order", function(err, result){
    for(var i = 0 ; i < req.body.item.length; i++){
        if(parseFloat(req.body.item[i].Quantity)>0){
            var insertMoList = {Mo_ID:result[result.length-1].Mo_ID, Mat_ID:req.body.item[i].Mat_ID, Mat_Amount:req.body.item[i].Quantity, UNIT:req.body.item[i].UNIT, Description:req.body.Description};
            connection.query("INSERT INTO Material_Order_List SET ?", insertBoList);
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
            res.redirect('/MaterialOrder');
}

exports.updateItem = function (req,res){
    console.log(req.body.update_col1); 
    var update = {Mo_ID:req.body.update_col1 , Date:req.body.update_col2, Staff_ID:req.body.update_col3, Wo_id:req.body.update_col4, Description:req.body.update_col5};
    connection.query('UPDATE Material_Order SET ?'+ 'WHERE Mo_ID = ' + update.Mo_ID, update, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/MaterialOrder');
    });
}

exports.deleteItem = function (req,res){
    var del = {Mo_ID:req.body.del_Mo_ID};
    connection.query('DELETE FROM Material_Order WHERE ?', del, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/MaterialOrder');
    });
}