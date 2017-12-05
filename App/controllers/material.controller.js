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

exports.Material = function(req, res){
    connection.query("SELECT * FROM Material",function(err,result){
    if(err){
        res.send('Error' + err);
        return;
    }
    res.render('material.html',{item:result});    
    });
}