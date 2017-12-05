//use strict mode
'use strict';
//npm used
var express = require('express');
var app = express();
var ejs = require('ejs');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var port = 8000;


//sql connection
var connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'Warehouse'
});
connection.connect(function(error){
if(!!error){
console.log('Error');
}
else{
    console.log('Connected');
}
});

//setting up
app.use(bodyParser());
app.engine('html', ejs.renderFile);  
app.listen(port);
app.use(express.static('public'));

//routing
app.get('/Material', Material);
app.post('/addMaterial', addMaterial);
app.post('/deleteMaterial', deleteMaterial);
app.post('/updateMaterial', updateMaterial);

//function
function Material(req, res){
    connection.query("SELECT * FROM Material",function(err,result){
    if(err){
        res.send('Error' + err);
        return;
    }
    res.render('testsql.html',{item:result});    
    });
}

function addMaterial(req,res){
    var insert = {Mat_Name:req.body.Material_Name, Mat_Balance:req.body.Material_Balance, Unit_Measure:req.body.Unit_Measure}
    connection.query('INSERT INTO Material SET ?',insert,function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Material');
    });
}

function updateMaterial(req,res){
    console.log(req.body);
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

function deleteMaterial(req,res){
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