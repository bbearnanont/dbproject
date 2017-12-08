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
var sses;
//function exports
exports.showItem = function (req, res){
    sess = req.session;
    console.log(sess);
    if(sess.Staff)
    {
        connection.query("SELECT * FROM return_material ",function(err,result){
        if(err){
            res.send('Error' + err);
            return;
        }
        else
        {
                        connection.query("SELECT * FROM Material",function(err4,result4){
                        res.render('returnmaterial.html',{item:result,material:result4});
                        });
        }
        });
     
    }
    else
    {
        res.redirect('StaffLogin');
    }
}

exports.addItem = function (req,res){
    var insertRm = {Attempt_Date:req.body.Attempt_Date, Result_Date:req.body.Result_Date, Description:req.body.Description};
    connection.query("INSERT INTO return_material SET ?", insertRm, function(err, result){
        if(err){
            console.log(err);
            return;
        }
    });
    connection.query("SELECT * FROM return_material", function(err, result){
    for(var i = 0 ; i < req.body.item.length;i++){
        if(parseFloat(req.body.item[i].Quantity)>0){
            var insertMf = {Mat_ID:req.body.item[i].Mat_ID, Mat_Amount:req.body.item[i].Quantity, Rm_ID:result[result.length-1].Rm_ID, Date:req.body.Order_Date};
            connection.query("INSERT INTO Material_Flow SET ?",insertMf, function(err, result2){
                if(err){
                    console.log(err);
                    return;
                }                
            });
        }
    }
            
    for(var i = 0 ; i < req.body.item.length; i++){
        if(parseFloat(req.body.item[i].Quantity)>0){
            var insertRmList = {Rm_ID:result[result.length-1].Rm_ID, Mat_ID:req.body.item[i].Mat_ID, Mat_Amount:req.body.item[i].Quantity, UNIT:req.body.item[i].UNIT};
            connection.query("INSERT INTO return_material_list SET ?", insertRmList);
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
    res.redirect('/ReturnMaterial');
}

exports.updateItem = function (req,res){
    var update = {Rm_ID:req.body.update_col1, Attempt_Date:req.body.update_col2, Result_Date:req.body.update_col3, Description:req.body.update_col4};
    connection.query('UPDATE return_material SET ?' + 'WHERE Bo_ID = ' + update.Rm_ID, update, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/ReturnMaterial');
    });
}

exports.deleteItem = function (req,res){
    var del = {Rm_ID:req.body.del_Rm_ID};
    connection.query('DELETE FROM return_material WHERE ?', del, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/ReturnMaterial');
    });
}