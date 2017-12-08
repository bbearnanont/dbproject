
$(document).ready(function(){
    $("#div11").click(function(){
         // alert("The paragraph was clicked.");
          $.ajax({
            type: 'POST',
            url: '/CustomerLogin', 
            data: {"user":$("#user").val(),"password":$("#password").val()},
            success: function(result) {
              if(result=="success")
              {
                  window.location.href='/PurchaseOrder'        
              }
              else if(result=="we")
              {
                  swal({
                    title: 'Are you sure?',
                    text: "Please check your email again!",
                    type: 'error',
                  })
              }
              else if(result=='wp')
              {
                  swal({
                    title: 'Are you sure?',
                    text: "Please check your password again!",
                    type: 'error',
                  })
              }
            },
            error: function() {
                    alert("FCK");
            }
          });

        });
    });