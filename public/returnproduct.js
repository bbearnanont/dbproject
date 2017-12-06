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
        $("#checkout").click(function(){
         
         var count = parseInt($("#count").text());
         var item = [];
         var obj;
         var index;
         for(var i = 0 ; i < count; i++){
             index = i+1;
             obj = {Product_ID:$("#col6_ID"+index).text(), Product_Amount:parseFloat($("#"+index).val())};
             item.push(obj);
         }   
     $.ajax({
             type: 'POST',
             url: '/addbuyorder', 
             data : {"item":item, "Sup_ID":$("#Sup_ID").val(), "Order_Date":$("#Order_Date").val(), "Delivered_Date":$("#Delivered_Date").val(), "Staff_ID":$("#Staff_ID").val(), "Description":$("#Description").val()},
             success: function(data, textStatus, jqXHR) {
                 location.reload();
             },
             error: function(jqXHR, textStatus, errorThrown) {
                     alert(errorThrown);
             }
     });
 });
 });