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
            obj = {Mat_ID:$("#col6_ID"+index).text(), Mat_Amount:parseFloat($("#"+index).val()), Mo_ID:$('#col1_ID'+index).text()};
            item.push(obj);
        }   
    $.ajax({
            type: 'POST',
            url: '/addReturnMaterial', 
            data : {"item":item, "Result_Date":$("#Result_Date").val(), "Description":$("#Description").val()},
            success: function(data, textStatus, jqXHR) {
                location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                    alert(errorThrown);
            }
    });
});
});