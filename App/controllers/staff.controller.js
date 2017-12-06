//sql connection
var mysql = require('mysql');
var crypto  = require('crypto');
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
function encrypt(s) {
    return crypto.createHmac('sha512', s).digest('hex')
}


//function exports
exports.showItem = function (req, res){
    connection.query("SELECT * FROM Staff",function(err,result){
    if(err){
        res.send('Error' + err);
        return;
    }
    else
    {
        connection.query("SELECt Department_ID,Department_Name FROM department",function(err2,result2){
            if(err2)
            {
                res.send('Error'+err2)
                return;
            }
            else
            {
                res.render('staff.html',{item:result,department:result2});
            }       
    });
}
});
}

exports.StaffRegister = function (req,res){
    var inputEmail = req.body.Staff_Email;
    sess = req.session;
    connection.query("SELECT Staff_Email FROM staff WHERE Staff_Email="+"'"+inputEmail+"'",function(err,resultEmail){
        if(err){
            console.log(err);
            return;
        }
        else
        {
            if(resultEmail.length>0)
            {
                console.log('Duplicate email'); 
                 res.redirect('/StaffLogin');
            }
            else
            {
                console.log('Accept');
               // var insert = {Staff_First_Name:req.body.Staff_First_Name, Staff_Last_Name:req.body.Staff_Last_Name, Department_ID:req.body.Department_ID, Phone_Number:req.body.Phone_Number, Staff_Email:inputEmail,Staff_Password:encrypt(req.body.password),Address:req.body.Address,Manger:0}
                console.log('Accept',inputEmail,req.body.Staff_Password);
                var insert = {Staff_First_Name:req.body.Staff_First_Name,Staff_Last_Name:req.body.Staff_Last_Name,Department_ID:req.body.Department_ID,Phone_Number:req.body.Phone_Number,Staff_Email:req.body.Staff_Email,Staff_Password:encrypt(req.body.Staff_Password),Manager:0,Address:req.body.Address}
                connection.query("INSERT INTO staff SET ?",insert,function(err3,result3){
                    if(err3)
                    {
                        console.log(err3);
                        return;
                    }
                    else
                    {
                         res.redirect('/StaffLogin');
                    }
                });
            }
        }
    
    });
}

/*exports.updateItem = function (req,res){
    var id = {Staff_ID:req.body.update_col1};
    var update = {Staff_ID:req.body.update_col1, Staff_First_Name:req.body.update_col2, Staff_Last_Name:req.body.update_col3, Department_ID:req.body.update_col4, Phone_Number:req.body.update_col5, Staff_Email:req.body.update_col6, Address:req.body.update_col7};
    connection.query('UPDATE Staff SET ?' + 'WHERE Staff_ID =' + update.Staff_ID, update, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Staff');
    });
}

exports.deleteItem = function (req,res){
    var del = {Staff_ID:req.body.del_Staff_ID};
    console.log(del);
    connection.query('DELETE FROM Staff WHERE ?', del, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/Staff');
    });
}*/