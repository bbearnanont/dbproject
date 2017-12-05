module.exports = function(app){
//routing
var controller = require('../controllers/product.controller.js');
app.get('/Product', controller.Product);
app.post('/addProduct', controller.addProduct);
app.post('/deleteProduct', controller.deleteProduct);
app.post('/updateProduct', controller.updateProduct);
};