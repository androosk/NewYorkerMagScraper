$(document).ready(function() {
  // Getting references to our form and input
  // var signUpForm = $("form.signup");
  // var usernameInput = $("input#username");
  // var passwordInput = $("input#password");
  // var emailInput = $("input#email")


  // When the signup button is clicked, we validate the email and password are not blank
  // signUpForm.on("submit", function(event) {
  //   event.preventDefault();
  //   var userData = {
  //     name: nameInput.val().trim(),
  //     email: emailInput.val().trim(),
  //     username: usernameInput.val().trim(),
  //     password: passwordInput.val().trim(),
  //     password2: passwordInput.val().trim()
  //   };

    // if (!userData.username || !userData.password || !userData.password2 || !userData.email) {
    //   return;
    // }
    // If we have an email and password, run the signUpUser function
  //   signUpUser(userData.name, userData.email, userData.username, userData.password);
  //   nameInput.val("")
  //   emailInput.val("")
  //   usernameInput.val("");
  //   passwordInput.val("");
  //   password2Input.val("")
  // });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  // function signUpUser(username, password) {
  //   $.post("/api/signup", {
  //     username: username,
  //     password: password
  //   })
  //     .then(location => {
  //       console.log(location);
  //       console.log("trying to reload the page to /login");
  //       window.location.replace(location);
        // location.replace(location);
  //     })
  //     .catch(handleLoginErr);
  // }

  // function handleLoginErr(err) {
  //   console.log(err);
  //   $("#alert .msg").text(err.responseJSON);
  //   $("#alert").fadeIn(500);
  // }

  var myInput = document.getElementById("password");
  var letter = document.getElementById("letter");
  var capital = document.getElementById("capital");
  var number = document.getElementById("number");
  var length = document.getElementById("length");

  // When the user clicks on the password field, show the message box
  myInput.onfocus = () => {
    document.getElementById("message").style.display = "block";
  };

  // When the user clicks outside of the password field, hide the message box
  myInput.onblur = () => {
    document.getElementById("message").style.display = "none";
  };

  // When the user starts to type something inside the password field
  myInput.onkeyup = () => {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (myInput.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (myInput.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (myInput.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }

    // Validate length
    if (myInput.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  };
});
