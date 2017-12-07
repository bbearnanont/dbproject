//sql connection
var mysql = require('mysql');
var crypto  = require('crypto');
var sess;
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
exports.registerCustomer = function (req, res){
    res.render('register.html');    
}
exports.registerCustomerSave = function(req,res){
	var inputEmail = req.body.email;
	sess = req.session;
	connection.query("SELECT Customer_Email FROM customer WHERE Customer_Email="+"'"+inputEmail+"'",function(err,resultEmail){
        if(err){
            console.log(err);
            return;
        }
        else
        {
        	console.log(resultEmail[0]);
			if(resultEmail.length>0)
			{
				console.log('Duplicate email');	
			     res.redirect('/register',{alert:1});
			}
			else
			{
				console.log('Accept');
				 var insert = {Customer_FirstName:req.body.first, Customer_LastName:req.body.last,Customer_Number:req.body.number,Customer_Email:inputEmail,Customer_Password:encrypt(req.body.password),Customer_Address:req.body.address,Company:req.body.company}
				connection.query("INSERT INTO customer SET ?",insert,function(err2,result){
			        if(err2){
			            console.log(err2);
			            return;
			        }
			        sess.CustomerEmail=inputEmail;
			        sess.Customer=1;
			        res.redirect('/Product');
				});
			}
        }
	
	});
			}