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
                        connection.query("SELECT mol.Mo_ID, mol.Mat_ID ,m.Mat_Name, mol.Mat_Amount, m.Unit_Measure FROM material_order_list mol, material m WHERE mol.Mat_ID = m.Mat_ID ORDER BY mol.Mo_ID",function(err2,result2){
                            if(err2){
                                console.log(err2);
                                return;
                            }
                        res.render('returnmaterial.html',{item:result,mol:result2});
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
    var arr = [];
    for(var i = 0 ; i < req.body.item.length; i++){
        arr.push(i);
    }
    var insertRm = {Result_Date:req.body.Result_Date, Description:req.body.Description};
    connection.query("INSERT INTO return_material SET ? , Attempt_Date = CURDATE() ", insertRm, function(err, result){
        if(err){
            console.log(err);
            return;
        }
    });
    connection.query("SELECT * FROM return_material", function(err, result){
    arr.forEach(function(i){
        if(parseFloat(req.body.item[i].Mat_Amount)>0){
            console.log(req.body.item);
            var insertMf = {Mat_ID:req.body.item[i].Mat_ID, Mat_Amount:req.body.item[i].Mat_Amount, Rm_ID:result[result.length-1].Rm_ID, Date:req.body.Result_Date};
            connection.query("INSERT INTO Material_Flow SET ?",insertMf, function(err, result2){
                if(err){
                    console.log(err);
                    return;
                }                
            });
        }
    });
            
    arr.forEach(function(i){
        if(parseFloat(req.body.item[i].Quantity)>0){
            var insertRmList = {Rm_ID:result[result.length-1].Rm_ID, Mat_ID:req.body.item[i].Mat_ID, Mat_Amount:req.body.item[i].Mat_Amount};
            connection.query("INSERT INTO return_material_list SET ?", insertRmList, function(req,res){
                
            });
        }
    });
    });
    for(var i = 0 ; i < req.body.item.length; i++){
        connection.query('UPDATE Material SET Mat_Balance = Mat_Balance + '+ req.body.item[i].Mat_Amount + ' WHERE Mat_ID = '+ req.body.item[i].Mat_ID + '', function(err,result){
        if(err){
            console.log(err);
            return;
        }        
    });
        connection.query('UPDATE material_order_list SET Mat_Amount = Mat_Amount - '+req.body.item[i].Mat_Amount+ ' WHERE Mat_ID = '+req.body.item[i].Mat_ID+' AND Mo_ID = '+req.body.item[i].Mo_ID, function(err,result){
            if(err){
                console.log(err);
                return;
            }
        });
    }
    res.redirect('/ReturnMaterial');
}

exports.updateItem = function (req,res){
    var update = {Rm_ID:req.body.update_col1, Result_Date:req.body.update_col4, Description:req.body.update_col6};
    connection.query('UPDATE return_material SET ?' + 'WHERE Rm_ID = ' + update.Rm_ID, update, function(err,result){
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