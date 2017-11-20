$(document).ready(function(){
   $(".update").click(function(){
       var id = $(this).data("uid");
       $("#update_col1").val($("#col1_ID"+id).html());
       $("#update_col2").val($("#col2_ID"+id).html());
       $("#update_col3").val($("#col3_ID"+id).html());
       $("#update_col4").val($("#col4_ID"+id).html());
       $("#update_col5").val($("#col5_ID"+id).html());
   });
   $(".delete").click(function(){
      var id = $(this).data("uid");
      $("#del_input_ID").val(id);
   });
});