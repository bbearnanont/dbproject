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
	res.render('StaffLogin.html');
}
exports.loginUser = function(req,res){
		//console.log(req.body);
		sess = req.session;
		var p = encrypt(req.body.password);
		console.log("USER",req.body.user,"Pass",req.body.password,"Encrypt",p);
		var sql = "SELECT * FROM staff WHERE Staff_Email="+"'"+req.body.user+"'";
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
	        	if (p==resultEmail[0].Staff_Password) 
	        	{

	        			sess.StaffEmail = resultEmail[0].Staff_Email;
	        			sess.StaffID=resultEmail[0].Staff_ID;
	        			sess.Staff=1;
	        			console.log("TEST session "+sess.email);

						res.redirect('/Material');
	        	}
	        	else
	        	{
	        			console.log("Wrong Password");
						res.redirect('/StaffLogin');
	        	}
	        }
		}
		else
		{
				console.log("Wrong email");
				res.redirect('/StaffLogin');
			/*	popupS.alert({
					    content: 'Email was duplicated'
					});
		*/}
			});
	
	}