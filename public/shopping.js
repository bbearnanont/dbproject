$(document).ready(function(){
    $(".update").click(function(){
        var id = $(this).data("uid");
        $("#update_col1").val($(".updatetable #col1_ID"+id).html());
        $("#update_col2").val($(".updatetable #col2_ID"+id).html());
        $("#update_col3").val($(".updatetable #col3_ID"+id).html());
        $("#update_col4").val($(".updatetable #col4_ID"+id).html());
        $("#update_col5").val($(".updatetable #col5_ID"+id).html());
        $("#update_col6").val($(".updatetable #col6_ID"+id).html());
    });
    $(".delete").click(function(){
       var id = $(this).data("uid");
       $("#del_input_ID").val(id);
    });
    
    var allTotal = 0;
    $( ".onChange" ).change(function () {
    var id = $(this).attr('id');
    var total = parseFloat($("#col3_ID"+id).text().split("$")[1]) * parseFloat($(this).val());
    $("#col5_ID"+id).text(total);
    allTotal += total;
    $("#allTotal").text(allTotal);
    });
    $("#checkout").click(function(){
        
        var count = parseInt($("#count").text());
        var item = [];
        var obj;
        var index;
        for(var i = 0 ; i < count; i++){
            index = i+1;
            obj = {Product_ID:$("#col6_ID"+index).text(), Product_Name:$("#col2_ID"+index).text(), Quantity:parseFloat($("#"+index).val())};
            item.push(obj);
        }   
    $.ajax({
            type: 'POST',
            url: '/addpurchaseorder', 
            data : {"item":item, "allTotal":allTotal,"Description":$("#address").val(), "Delivery_Method":$("#method").val(), "Delivered_Date":$("#date").val()},
            success: function(data, textStatus, jqXHR) {
                location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                    alert(errorThrown);
            }
    });
});
});