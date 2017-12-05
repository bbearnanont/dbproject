module.exports = function(app){
//routing
<<<<<<< Updated upstream

//product
var ProductController = require('../controllers/product.controller.js');
app.get('/Product', ProductController.showItem);
app.post('/addProduct', ProductController.addItem);
app.post('/deleteProduct', ProductController.deleteItem);
app.post('/updateProduct', ProductController.updateItem);

//material
/*
var MaterialController = require('../controllers/material.controller.js');
app.get('/Material', MaterialController.Material);
app.post('/addMaterial', MaterialController.addMaterial);
app.post('/deleteMaterial', MaterialController.addMaterial);
app.post('/updateMaterial', MaterialController.updateMaterial);
*/

//staff
/*
var StaffController = require('../controllers/staff.controller.js');
app.get('/Staff', StaffController.showItem);
app.post('/addStaff', StaffController.addItem);
app.post('/deleteStaff', StaffController.deleteItem);
app.post('/updateStaff', StaffController.updateItem)
*/

//Supplier
var SupplierController = require('../controllers/supplier.controller.js');
app.get('/Supplier', SupplierController.showItem);
app.post('/addSupplier', SupplierController.addItem);
app.post('/deleteSupplier', SupplierController.deleteItem);
app.post('/updateSupplier', SupplierController.updateItem);
=======
var controller = require('../controllers/product.controller.js');
app.get('/Product', controller.Product);
app.post('/addProduct', controller.addProduct);
app.post('/deleteProduct', controller.deleteProduct);
app.post('/updateProduct', controller.updateProduct);

var controller = require('../controllers/material.controller.js');
app.get('/Material', controller.Material);
app.post('/addMaterial', controller.addMaterial);
app.post('/deleteMaterial', controller.deleteMaterial);
app.post('/updateMaterial', controller.updateMaterial);
>>>>>>> Stashed changes
};