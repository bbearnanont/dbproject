module.exports = function(app){
//routing

//product
var ProductController = require('../controllers/product.controller.js');
app.get('/Product', ProductController.showItem);
app.post('/product',ProductController.showItem);
app.post('/addProduct', ProductController.addItem);
app.post('/deleteProduct', ProductController.deleteItem);
app.post('/updateProduct', ProductController.updateItem);

//staff register
var StaffController = require('../controllers/staff.controller.js');
app.get('/StaffRegister', StaffController.showItem);
app.post('/StaffRegister', StaffController.StaffRegister);
//staff login
var StaffControllerLogin = require('../controllers/StaffLogin.controller.js');
app.get('/StaffLogin',StaffControllerLogin.loginForm);
app.post('/StaffLogin',StaffControllerLogin.loginUser);
/*app.post('/deleteStaff', StaffController.deleteItem);
app.post('/updateStaff', StaffController.updateItem);*/

//Supplier
var SupplierController = require('../controllers/supplier.controller.js');
app.get('/Supplier', SupplierController.showItem);
app.post('/addSupplier', SupplierController.addItem);
app.post('/deleteSupplier', SupplierController.deleteItem);
app.post('/updateSupplier', SupplierController.updateItem);


//Customer
var CustomerController = require('../controllers/customer.controller.js');
app.get('/Customer', CustomerController.showItem);
app.post('/addCustomer', CustomerController.addItem);
app.post('/deleteCustomer', CustomerController.deleteItem);
app.post('/updateCustomer', CustomerController.updateItem);

//Material
var MaterialController = require('../controllers/material.controller.js');
app.get('/Material', MaterialController.Material);
app.post('/addMaterial', MaterialController.addMaterial);
app.post('/deleteMaterial', MaterialController.deleteMaterial);
app.post('/updateMaterial', MaterialController.updateMaterial);

//Warehouse
var WarehouseController = require('../controllers/warehouse.controller.js');
app.get('/Warehouse', WarehouseController.showWarehouse);
app.post('/addWarehouse', WarehouseController.addWarehouse);
app.post('/deleteWarehouse', WarehouseController.deleteWarehouse);
app.post('/updateWarehouse', WarehouseController.updateWarehouse);


//Purchase Order
var PurchaseorderController = require('../controllers/purchaseorder.controller.js');
app.get('/purchaseorder', PurchaseorderController.showItem);
app.post('/addpurchaseorder', PurchaseorderController.addItem);
app.post('/deletepurchaseorder', PurchaseorderController.deleteItem);
app.post('/updatepurchaseorder', PurchaseorderController.updateItem);


//Buy Order
var BuyOrderController = require('../controllers/buyorder.controller.js');
app.get('/BuyOrder', BuyOrderController.showItem);
app.post('/addBuyOrder', BuyOrderController.addItem);
app.post('/deleteBuyOrder', BuyOrderController.deleteItem);
app.post('/updateBuyOrder', BuyOrderController.updateItem);
	

//Register Customer
var register = require('../controllers/register.controller.js');
app.get('/register',register.registerCustomer);
app.post('/register',register.registerCustomerSave);

var login = require('../controllers/login.controller.js');
app.get('/CustomerLogin',login.loginForm);
app.post('/CustomerLogin',login.loginUser);


//Material Order
var MaterialOrderController = require('../controllers/materialorder.controller.js');
app.get('/MaterialOrder', MaterialOrderController.showItem);
app.post('/addMaterialOrder', MaterialOrderController.addItem);
app.post('/deleteMaterialOrder', MaterialOrderController.deleteItem);
app.post('/updateMaterialOrder', MaterialOrderController.updateItem);

//Return Product
var ReturnProductController = require('../controllers/returnproduct.controller.js');
app.get('/ReturnProduct', ReturnProductController.showItem);
app.post('/addReturnProduct', ReturnProductController.addItem);
app.post('/deleteReturnProduct', ReturnProductController.deleteItem);
app.post('/updateReturnProduct', ReturnProductController.updateItem);

//Return Material
var ReturnMaterialController = require('../controllers/returnmaterial.controller.js');
app.get('/ReturnMaterial', ReturnMaterialController.showItem);
app.post('/addReturnMaterial', ReturnMaterialController.addItem);
app.post('/deleteReturnMaterial', ReturnMaterialController.deleteItem);
app.post('/updateReturnMaterial', ReturnMaterialController.updateItem);

//Work Order
var WorkOrderController = require('../controllers/workorder.controller.js');
app.get('/WorkOrder', WorkOrderController.showItem);
app.post('/addWorkOrder', WorkOrderController.addItem);
app.post('/deleteWorkOrder', WorkOrderController.deleteItem);
app.post('/updateWorkOrder', WorkOrderController.updateItem);

//Demo Home Page
var HomeController = require('../controllers/home.controller.js');
app.get('/Home', HomeController.showItem);

//AnalysisReport
//MaterialFlowSelectMat
var MaterialFlowSelectMatController = require('../controllers/matflowselectmat.controller.js');
app.get('/MaterialFlowSelectMat',MaterialFlowSelectMatController.showItem);
app.post('/MaterialFlowSelectMatShow', MaterialFlowSelectMatController.showItem);

//MaterialFlowSelectDate
var MaterialFlowSelectDateController = require('../controllers/matflowselectdate.controller.js');
app.get('/MaterialFlowSelectDate',MaterialFlowSelectDateController.showItem);
<<<<<<< HEAD


//PopularProduct
var PopularProductController = require('../controllers/popularproduct.controller.js');
app.get('/PopularProduct',PopularProductController.showItem);

//BestSalesProduct
var BestSalesProductController = require('../controllers/bestsalesproduct.controller.js');
app.get('/BestSalesProduct',BestSalesProductController.showItem);

//ProductFlowSelectDate
var ProductFlowSelectDateController = require('../controllers/productflowselectdate.controller.js');
app.get('/ProductFlowSelectDate',ProductFlowSelectDateController.showItem);



=======
app.post('/MaterialFlowSelectDateShow', MaterialFlowSelectDateController.showItem);

//Show Stock Balance
var StockBalanceController = require('../controllers/stockbalance.controller.js');
app.get('/StockBalance', StockBalanceController.showItem);

//Show Most Return Product
var ReportAnalysisController = require('../controllers/reportanalysis.controller.js');
app.get('/mostreturnproduct',ReportAnalysisController.showMostReturnProduct);
app.get('/mostbuyorder',ReportAnalysisController.showMostBuyOrder);
app.get('/mostpurchasecustomer',ReportAnalysisController.mostPurchaseCustomer);
app.get('/longestWorkOrder',ReportAnalysisController.longestWorkOrder);
};
