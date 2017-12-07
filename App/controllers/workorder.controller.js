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
sess = req.session;
    if(sess.Staff)
    {
        connection.query("SELECT * FROM work_order ",function(err,result){
        if(err){
            res.send('Error' + err);
            return;
        }
        else
        {
           connection.query("SELECT Po_ID FROM purchase_order",function(err2,result2)
           {
            if(err2){
                res.send('Error' + err2);
                return;
            }
            else
            {
                connection.query("SELECT Product_ID,Product_Name FROM product",function(err3,result3)
                {
                    if(err3){
                        res.send('Error' + err3);
                        return;
                    }
                    else
                    {
                        connection.query("SELECT Staff_ID,Staff_First_Name,Staff_Last_Name FROM staff",function(err4,result4)
                         {
                          if(err4){
                              res.send('Error' + err4);
                              return;
                          }
                         else
                          {
                            res.render('workorder.html',{item:result,po:result2,product:result3,staff:result4});
                          }
                         });

                    }
                    });  
            }    
            });
        }    
        });
       
    }
    else
    {
        console.log("Please login");
        res.redirect('StaffLogin');
    }
}

exports.addItem = function (req,res){
    var insert = {Recieved_Date:req.body.Recieved_Date, Delivery_Date:req.body.Delivery_Date, Complete_Date:req.body.Complete_Date, Po_ID:req.body.Po_ID, Product_ID:req.body.Product_ID, Head_Staff:req.body.Staff_ID, Description:req.body.Description};
    console.log(req.body);
    connection.query('INSERT INTO work_order SET ?',insert,function(err,result){
        if(err){
            console.log(err);
            return;
        }
        {
            res.redirect('/WorkOrder')
        };
    });
}

exports.updateItem = function (req,res){
    var update = {Wo_id:req.body.update_col1, Recieved_Date:req.body.update_col2, Delivery_Date:req.body.update_col3, Complete_Date:req.body.update_col4, Po_ID:req.body.update_col5, Product_ID:req.body.update_col6, Head_Staff:req.body.update_col7, Description:req.body.update_col8};
    connection.query('UPDATE work_order SET ?' + 'WHERE Wo_id = ' + update.Wo_id, update, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/WorkOrder');
    });
}

exports.deleteItem = function (req,res){
    var del = {Wo_id:req.body.del_WO_ID};
    connection.query('DELETE FROM work_order WHERE ?', del, function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/WorkOrder');
    });
}