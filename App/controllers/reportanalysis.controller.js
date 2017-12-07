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
exports.showMostReturnProduct = function (req, res){
    sess = req.session;
    console.log(sess);
    if(sess.Staff)
    {
       connection.query("SELECT p.Product_ID, p.Product_Name, sum(rpl.Amount) AS Amount FROM return_product_list rpl, product p WHERE rpl.Product_ID = p.Product_ID GROUP BY rpl.Product_ID ORDER BY sum(rpl.Amount) DESC LIMIT 5",function(err,result){
        if(err){
            res.send('Error' + err);
            return;
        }
        res.render('mostreturnproduct.html',{item:result});    
        });
    }
    else
    {
        res.redirect('StaffLogin');
    }
}

exports.showMostBuyOrder = function (req, res){
    sess = req.session;
    console.log(sess);
    if(sess.Staff)
    {
       connection.query('SELECT s.Sup_ID, s.Sup_Name, Sum(bol.Mat_Amount) AS Amount,bol.UNIT FROM buy_order_list bol, buy_order bo, supplier s WHERE bol.UNIT ="Kilograms" AND bol.Bo_ID = bo.Bo_ID AND bo.Sup_ID = s.Sup_ID GROUP BY s.Sup_ID  ORDER BY Sum(bol.Mat_Amount) DESC LIMIT 3',function(err, result){
        connection.query('SELECT s.Sup_ID, s.Sup_Name, Sum(bol.Mat_Amount) AS Amount,bol.UNIT FROM buy_order_list bol, buy_order bo, supplier s WHERE bol.UNIT ="Grams" AND bol.Bo_ID = bo.Bo_ID AND bo.Sup_ID = s.Sup_ID GROUP BY s.Sup_ID  ORDER BY Sum(bol.Mat_Amount) DESC LIMIT 3',function(err, result2){
            connection.query('SELECT s.Sup_ID, s.Sup_Name, Sum(bol.Mat_Amount) AS Amount,bol.UNIT FROM buy_order_list bol, buy_order bo, supplier s WHERE bol.UNIT ="Tons" AND bol.Bo_ID = bo.Bo_ID AND bo.Sup_ID = s.Sup_ID GROUP BY s.Sup_ID  ORDER BY Sum(bol.Mat_Amount) DESC LIMIT 3',function(err, result3){
                res.render('mostbuyorder.html',{item:result, item2:result2, item3:result3});
            });
        });
       });
    }
    else
    {
        res.redirect('StaffLogin');
    }
}

exports.mostPurchaseCustomer = function (req, res){
    sess = req.session;
    console.log(sess);
    if(sess.Staff)
    {
        connection.query("SELECT c.Customer_ID, c.Customer_FirstName, c.Customer_Lastname, Count(p.Po_ID) AS Po_Count FROM customer c, purchase_order p WHERE c.customer_id = p.customer_id GROUP BY p.Customer_ID ORDER BY Po_Count DESC",function(err, result){
            res.render('mostpurchasecustomer.html',{item:result});
        });
    }
    else
    {
        res.redirect('StaffLogin');
    }    
}

exports.longestWorkOrder = function (req, res){
    sess = req.session;
    console.log(sess);
    if(sess.Staff)
    {
        connection.query("SELECT w.Wo_id, w.Recieved_Date, w.Delivery_Date, w.Complete_Date, (w.Complete_Date - w.Recieved_Date) AS Estimated_Date, w.Po_ID, w.Head_Staff, s.Staff_First_Name, s.Staff_Last_Name, w.Description FROM work_order w, staff s WHERE w.Head_Staff = s.Staff_ID ORDER BY Estimated_Date DESC LIMIT 10",function(err, result){
            res.render('longestworkorder.html',{item:result});
        });
    }
    else
    {
        res.redirect('StaffLogin');
    }     
}
