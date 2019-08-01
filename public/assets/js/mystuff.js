$(".save-button").click(function(){
  let thisId = $(this).attr("link-name")
  let userId = $("#loggedin").attr("data")
  if(!userId){
    window.location.replace('/error')
  } else {
    $.ajax({
      method: "PUT",
      url: "/save/" + thisId,
      data: {
        favorited: userId
      }
    })
  window.location.replace("/")
  }
})
$(".delete-this").click(function(){
  let thisId = $(this).attr("link-name")
  let userId = $("#loggedin").attr("data")
  if(!userId){
    window.location.replace('/error')
  } else {
    $.ajax({
      method: "DELETE",
      url: "/delete/" + thisId,
      data: {
        favorited: userId
      }
    })
  window.location.replace('/mystuff')
  }
})
