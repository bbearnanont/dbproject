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
var sses;
exports.show= function(req,res)
{
	sess = req.session;
	if(sess.Staff==1)
	{
		console.log("TEST"+req.body.Start_Date)
		if(req.body.Start_Date)
		{
			connection.query("SELECT final.FinalPoID,product.Product_Name,MAX(final.FinalOrderDate) AS DATEE FROM (SELECT Slowww.SlowProductID AS FinalPoID,Slowww.SlowProductOrder,pooor.Order_Date AS FinalOrderDate FROM (SELECT Sloww.SlowProduct2 AS SlowProductID,Sloww.slowpo AS SlowProductOrder FROM (SELECT SlowProduct.SlowID as SlowProduct2,pur2.Po_ID as SlowPo FROM (SELECT p.Product_ID AS SlowID,p.Product_Name FROM product p GROUP BY p.Product_ID HAVING p.Product_ID NOT IN (SELECT li.Product_ID FROM purchase_order_list li,purchase_order pur WHERE li.Po_ID=pur.Po_ID AND pur.Order_Date >'"+req.body.Start_Date+"'))SlowProduct LEFT JOIN purchase_order_list pur2 ON SlowProduct.SlowID = pur2.Product_ID)Sloww LEFT JOIN purchase_order_list poll ON poll.Po_ID = Sloww.slowPo)Slowww LEFT JOIN purchase_order pooor ON pooor.Po_ID = Slowww.SlowProductOrder)final,product WHERE product.Product_ID = final.FinalPoID GROUP BY final.FinalPoID",function(err,result){
				if(err)
				{
					console.log("error",err);
					return;
				}
				else
				{
					console.log(result[1]);
					res.render("slowmove.html",{item:result});
				}
			});
		}
		else
		{
			connection.query("SELECT final.FinalPoID,product.Product_Name,MAX(final.FinalOrderDate) AS DATEE FROM (SELECT Slowww.SlowProductID AS FinalPoID,Slowww.SlowProductOrder,pooor.Order_Date AS FinalOrderDate FROM (SELECT Sloww.SlowProduct2 AS SlowProductID,Sloww.slowpo AS SlowProductOrder FROM (SELECT SlowProduct.SlowID as SlowProduct2,pur2.Po_ID as SlowPo FROM (SELECT p.Product_ID AS SlowID,p.Product_Name FROM product p GROUP BY p.Product_ID HAVING p.Product_ID NOT IN (SELECT li.Product_ID FROM purchase_order_list li,purchase_order pur WHERE li.Po_ID=pur.Po_ID AND pur.Order_Date >'2017-12-06'))SlowProduct LEFT JOIN purchase_order_list pur2 ON SlowProduct.SlowID = pur2.Product_ID)Sloww LEFT JOIN purchase_order_list poll ON poll.Po_ID = Sloww.slowPo)Slowww LEFT JOIN purchase_order pooor ON pooor.Po_ID = Slowww.SlowProductOrder)final,product WHERE product.Product_ID = final.FinalPoID GROUP BY final.FinalPoID",function(err,result){
				if(err)
				{
					console.log("error",err);
					return;
				}
				else
				{
					console.log(result[1]);
					res.render("slowmove.html",{item:result});
				}
			});	
		}
	}
	else
	{
		res.redirect("/StaffLogin");
	}
}