module.exports = function(app){
//routing

//product
var ProductController = require('../controllers/product.controller.js');
app.get('/Product', ProductController.showItem);
app.post('/addProduct', ProductController.addItem);
app.post('/deleteProduct', ProductController.deleteItem);
app.post('/updateProduct', ProductController.updateItem);

//staff
var StaffController = require('../controllers/staff.controller.js');
app.get('/Staff', StaffController.showItem);
app.post('/addStaff', StaffController.addItem);
app.post('/deleteStaff', StaffController.deleteItem);
app.post('/updateStaff', StaffController.updateItem);

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

//Buy Order
var BuyOrderController = require('../controllers/buyorder.controller.js');
app.get('/BuyOrder', BuyOrderController.showItem);
app.post('/addBuyOrder', BuyOrderController.addItem);
app.post('/deleteBuyOrder', BuyOrderController.deleteItem);
app.post('/updateBuyOrder', BuyOrderController.updateItem);

//Buy Order List
var BuyOrderListController = require('../controllers/buyorderlist.controller.js');
app.get('/BuyOrderList', BuyOrderListController.showItem);
app.post('/addBuyOrderList', BuyOrderListController.addItem);
app.post('/deleteBuyOrderList', BuyOrderListController.deleteItem);
app.post('/updateBuyOrderList', BuyOrderListController.updateItem);
};