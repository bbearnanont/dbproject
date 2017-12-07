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
    connection.query("SELECT * FROM return_material",function(err,result){
    if(err){
        res.send('Error' + err);
        return;
    }
    else
    {
    connection.query("SELECT ml.Mo_ID AS Mo_ID,ml.Mat_ID AS Mat_ID, ml.Mat_Amount AS Mat_Amount, mo.Description AS Description, m.Mat_Name AS Mat_Name, m.Unit_Measure AS Unit_Measure FROM material_order mo, material_order_list ml, material m WHERE mo.Mo_ID = ml.Mo_ID AND m.Mat_ID = ml.Mat_ID",function(err2,result2)
    {
        if(err2){
            res.send('Error' + err2);
            return;
        }
        else
                res.render('returnmaterial.html',{item:result,material_order_list:result2});
                
            }
        );
        }
    }
    );  
}

exports.addItem = function (req,res){
    var Description = req.body.Description;
    var Result_Date = req.body.Result_Date;
    var insertMR = {Description:Description, Result_Date:Result_Date};    
    var arr = [];
    for(var i = 0 ; i < req.body.item.length; i++){
        arr.push(i);
    }

    connection.query('INSERT INTO return_material SET ? ,'+ 'Attempt_Date = CURDATE()',insertPR,function(err,result){
        if(err){
            console.log(err);
            return;
        }});
        connection.query("SELECT * FROM return_material",function(err,result){
            for(var i = 0 ; i < req.body.item.length;i++){
                if(parseFloat(req.body.item[i].Quantity)>0){
                    var insertMf = {Mat_ID:req.body.item[i].Mat_ID, Mat_Amount:req.body.item[i].Quantity, Bo_ID:result[result.length-1].Bo_ID, Date:req.body.Order_Date, Staff_ID:req.body.Staff_ID};
                    connection.query("INSERT INTO Material_Flow SET ?",insertMf, function(err, result2){
                        if(err){
                            console.log(err);
                            return;
                        }
                    });
                }                 
            } 
            for(var i=0;i<req.body.item.length;i++){
                if(parseFloat(req.body.item,[i].Quantity)>0){
                    var insertrml = {Rm_ID:result[result.length-1].Rm_ID, Mat_ID:req.body.item[i].Mat_ID, Mat_Amount:req.body.item[i].Quantity, Description:req.body.Description};
                    connection.query("INSERT INTO return_material_list SET ?", insertrml);
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
        {
        };
    });
    connection.query('SELECT * FROM return_material', function(err, result){
    arr.forEach(function(i){
        var Rm_ID = result[result.length-1].Rm_ID;
        var Mo_ID = req.body.item[i].Mo_ID;
        var Mat_ID = req.body.item[i].Mat_ID;
        var Amount = req.body.item[i].Mat_Amount;
        if(parseFloat(req.body.item[i].Mat_Amount)>0){
            var insertMRList = {Rm_ID: Rm_ID,Mo_ID:Mo_ID, Mat_ID:Mat_ID, Mat_Amount:Amount};
            connection.query('INSERT INTO return_material_list SET ?', insertMRList, function(err, result2){
                if(err){
                    console.log(err);
                    return;
                }
            });
            var insertMFlow = {Mat_ID:Mat_ID, Matt_Amount:Amount, Rm_ID:Rm_ID, Staff_ID:1};
            connection.query('INSERT INTO Material_Flow SET ?'+', Date = CURDATE()',insertMFlow,function(err, result2){
                if(err){
                    console.log(err);
                    return;
                }
            });    
          
        }
    });

    arr.forEach(function(i){
        if(parseFloat(req.body.item[i].Mat_Amount)>0){
            connection.query('SELECT * FROM return_material_list',function(err, result2){
                if(err){
                    console.log(err);
                    return;
                }
                connection.query('UPDATE Purchase_order_list SET Mat_Amount = Mat_Amount - '+ req.body.item[i].Mat_Amount + ' WHERE Mat_ID = '+ req.body.item[i].Mat_ID + ' AND Mo_ID = ' + result2[result2.length-1].Mo_ID, function(err, result3){
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
        connection.query('UPDATE Material SET Mat_Balance = Mat_Balance + '+ req.body.item[i].Mat_Amount + ' WHERE Mat_ID = '+ req.body.item[i].Mat_ID, function(err,result){
            if(err){
                console.log(err);
                return;
            }
        });
    });
    });
    res.redirect('/returnmaterial');
}

exports.updateItem = function (req,res){
    var update = {Rm_ID:req.body.update_col1, Mo_ID:req.body.update_col2, Attempt_Date:req.body.update_col3, Result_Date:req.body.update_col4, Description:req.body.update_col5};
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