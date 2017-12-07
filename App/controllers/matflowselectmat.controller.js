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
    connection.query("SELECT Mat_ID,Mat_Name FROM material ",function(err,result){
    if(err){
        res.send('Error' + err);
        return;
    }
    else
    {
        if(req.body.Select)
        {
             connection.query('SELECT m.Mat_Name AS Mat_Name, mf.Mat_Amount, mf.Bo_ID, mf.Mo_ID, mf.Rm_ID, mf.Date FROM material_flow mf,material m WHERE mf.Mat_ID=m.Mat_ID AND mf.Mat_ID = ' +req.body.Select, function(err2,result2){
                    if(err2){
                        console.log(err2);
                        return;
                    } 
                                       
                    res.render('matflowselectmat.html',{item:result,mf:result2});
                });
        }
        else
        {
             connection.query('SELECT m.Mat_Name AS Mat_Name, mf.Mat_Amount, mf.Bo_ID, mf.Mo_ID, mf.Rm_ID, mf.Date FROM material_flow mf,material m WHERE mf.Mat_ID=m.Mat_ID AND mf.Mat_ID = 1', function(err3,result3){
                    if(err3){
                        console.log(err3);
                        return;
                    }
                    res.render('matflowselectmat.html',{item:result,mf:result3});
                });
        }
    }
    });

}

