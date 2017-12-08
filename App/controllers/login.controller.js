//sql connection
var mysql = require('mysql');
var crypto  = require('crypto')
//var popupsItem = require('popups');
var granted = [ ];
var sess ;
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
exports.loginForm = function(req,res)
{
	res.render('login.html');
}
exports.loginUser = function(req,res){
		//console.log(req.body);
		sess = req.session;
		var p = encrypt(req.body.password);
		console.log("TEST LOGIN POST",req.body.user);
		var sql = "SELECT * FROM customer WHERE Customer_Email="+"'"+req.body.user+"'";
		connection.query(sql,function(err,resultEmail){
		if(resultEmail.length>0)
		{
	        if(err){
	            console.log(err);
	            return;
	        }
	        else
	        {
				//console.log(p,resultEmail[0].Customer_Password);
	        	//console.log(resultEmail.length);
	        	console.log(req.session);
	        	if (p==resultEmail[0].Customer_Password) 
	        	{

	        			sess.CustomerEmail = resultEmail[0].Customer_Email;
	        			sess.CustomerID = resultEmail[0].Customer_ID;
	        			sess.Customer=1;
	        			console.log("TEST session "+sess.email);

						res.send("success");
	        	}
	        	else
	        	{
	        		console.log("Wrong Passsword");
						res.send("wp");
	        	}
	        }
		}
		else
		{
				console.log("Wrong Email");
						res.send("we");
			/*	popupS.alert({
					    content: 'Email was duplicated'
					});
		*/}
			});
	
	}