$(document).ready(function(){
    var allTotal = 0;
    $( ".onChange" ).change(function () {
    var id = $(this).attr('id');
    var total = parseFloat($("#col3_ID"+id).text().split("$")[1]) * parseFloat($(this).val());
    $("#col5_ID"+id).text(total);
    allTotal += total;
    $("#allTotal").text(allTotal);
    });
    $("#checkout").click(function(){
        
        var count = parseInt($("#count").text().split(" ")[0]);
        var item = [];
        var obj;
        var index;
        for(var i = 0 ; i < count; i++){
            index = i+1;
            obj = {Description:$("#address").val(), Delivery_Method:$("#method").val(), Delivered_Date:$("#date").val(), Product_ID:$("#col6_ID"+index).text(), Product_Name:$("#col2_ID"+index).text(), Quantity:parseFloat($("#"+index).val()), Total:parseFloat($("#col5_ID"+index).text())};
            item.push(obj);
        }   
    $.ajax({
            type: 'POST',
            url: '/addpurchaseorder', 
            data : {"item":item,"allTotal":allTotal},
            success: function(data, textStatus, jqXHR) {
                location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                    alert(errorThrown);
            }
    });
});
});