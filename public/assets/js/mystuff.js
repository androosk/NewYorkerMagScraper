
$(document).on('click', "#searchbutton", function(){
  var thisTitle = $(this).attr("article-name")
  var thisId = $(this).attr("link-name")
  var userId = $("#loggedin").attr("data")
  if(!userId){
    window.location.replace('/error')
  } else {
    axios({
      method: "POST",
      url: "/save/" + thisId
    }).then(function(data){
      console.log(data)
    })
  }
})
