//sql connection
var mysql = require('mysql');
var connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'dbproject'
});
var sess;
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
    if(sess.Staff)
    {
        connection.query('SELECT * FROM Material m, WareHouses w WHERE w.Wh_ID = m.Wh_ID', function(err, result){
            if(err){
                console.log(err);
                return;
            }
            connection.query('SELECT * FROM Product p, WareHouses w WHERE w.Wh_ID = p.Wh_ID', function(err, result2){
                if(err){
                    console.log(err);
                    return;
                }
                console.log(result2);
                res.render('stockbalance.html',{material:result, product:result2});
            });
        });
    }
    else
    {
        console.log("Please login");
        res.redirect('/StaffLogin');
    }
}
