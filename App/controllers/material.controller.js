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
exports.Material = function (req, res){
   connection.query("SELECT * FROM Material",function(err,result){
    if(err){
        res.send('Error' + err);
        return;
    }
    res.render('material.html',{item:result});    
    });
}

exports.addMaterial = function (req,res){
    var insert = {Mat_Name:req.body.Material_Name, Mat_Balance:req.body.Material_Balance, Unit_Measure:req.body.Unit_Measure}
    connection.query('INSERT INTO Material SET ?',insert,function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Material');
    });
}

exports.updateMaterial = function (req,res){
    var update = {Mat_ID:req.body.update_col1, Mat_Name:req.body.update_col2, Mat_Balance:req.body.update_col3, Unit_Measure:req.body.update_col4};
    //console.log(update.Mat_ID, update);
    connection.query('UPDATE Material SET ?'+'WHERE Mat_ID ='+update.Mat_ID, update, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Material');
    });
}

exports.deleteMaterial = function (req,res){
    var del = {Mat_ID:req.body.del_Material_ID};
    console.log(del);
    connection.query('DELETE FROM Material WHERE ?', del, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Material');
    });
}