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
        console.log(req.query.End_Date);
        if(req.query.Start_Date && req.query.End_Date)
        {
             connection.query('SELECT m.Mat_Name AS Mat_Name, mf.Mat_Amount, mf.Bo_ID, mf.Mo_ID, mf.Rm_ID, mf.Date FROM material_flow mf, material m WHERE mf.Mat_ID=m.Mat_ID AND mf.Date >= "'+req.query.Start_Date+'"'+ ' AND mf.Date <= "'+req.query.End_Date+'"', function(err2,result2){
                    if(err2){
                        console.log(err2);
                        return;
                    }                         
                    res.render('matflowselectdate.html',{mf:result2});
                     console.log(result2);
                });
        }
        else
        {
             connection.query('SELECT m.Mat_Name AS Mat_Name, mf.Mat_Amount, mf.Bo_ID, mf.Mo_ID, mf.Rm_ID, mf.Date FROM material_flow mf, material m WHERE mf.Mat_ID=m.Mat_ID', function(err3,result3){
                    if(err3){
                        console.log(err3);
                        return;
                    } 
                    res.render('matflowselectdate.html',{mf:result3});

                });
        }

}

