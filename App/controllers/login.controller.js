//sql connection
var mysql = require('mysql');
var crypto  = require('crypto')
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
		console.log(req.body.user);
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

	        			sess.email = resultEmail[0].Customer_Email;
	        			sess.uID = resultEmail[0].Customer_ID;
	        			console.log("TEST session "+sess.email);

						res.redirect('/Product');
	        	}
	        	else
	        	{
						res.redirect('/login');
	        	}
	        }
		}
		else
		{
				res.redirect('/login');
		}
			});
	
	}