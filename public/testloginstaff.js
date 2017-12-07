
$(document).ready(function(){
    $("#div12").click(function(){
         // alert("The paragraph was clicked.");
          $.ajax({
            type: 'POST',
            url: '/StaffLogin', 
            data: {"user":$("#user").val(),"password":$("#password").val()},
            success: function(result) {
              if(result=="success")
              {
                  window.location.href='/Material'        
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