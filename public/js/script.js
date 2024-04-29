//handle login/signup functionality
document.addEventListener('DOMContentLoaded', function() {
  const loginText = document.querySelector(".title-text .login");
  const loginForm = document.querySelector("form.login");
  const loginBtn = document.querySelector("label.login");
  const signupBtn = document.querySelector("label.signup");
  const signupLink = document.querySelector("form .signup-link a");

  signupBtn.onclick = (()=>{
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
  });

  loginBtn.onclick = (()=>{
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
  });

  signupLink.onclick = (()=>{
    signupBtn.click();
    return false;
  });
});

//Admin Page Script
$(document).ready(function() {
  $('a[href="/addplayer"]').click(function(e) {
      e.preventDefault(); // Prevent the default behavior of the link
      $('.content').load('/addplayer'); // Load the content of addplayer.ejs into the .content div
  });

  $('a[href="/addcoach"]').click(function(e) {
      e.preventDefault();
      $('.content').load('/addcoach');
  });
});

function myFunction() {
  document.getElementById("myDropup").classList.toggle("show");
}
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropup-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
          }
      }
  }
}

