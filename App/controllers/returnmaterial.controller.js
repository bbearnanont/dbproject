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
    connection.query("SELECT Mo_ID FROM material_order",function(err2,result2)
    {
        if(err2){
            res.send('Error' + err2);
            return;
        }
        else
                res.render('returnmaterial.html',{item:result,material_order:result2});
                
            }
        );
        }
    }
    );  
}

exports.addItem = function (req,res){
    var insert = {Mo_ID:req.body.Mo_ID, Attempt_Date:req.body.Attempt_Date, Result_Date:req.body.Result_Date, Description:req.body.Description};
    connection.query('INSERT INTO return_material SET ?',insert,function(err,result){
        if(err){
            console.log(err);
            return;
        }
    });
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