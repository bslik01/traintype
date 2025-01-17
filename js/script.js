document.addEventListener('DOMContentLoaded', () => {
    // Check if the key exists
    if (localStorage.getItem('loggedInUser')) {
      // Remove the key
      localStorage.removeItem('loggedInUser');
    }
  });
  

// Switch between login and signup views
document.getElementById("showSignUp").addEventListener("click", function () {
    document.querySelector(".loginCard").style.display = "none";
    document.querySelector(".signUpCard").style.display = "block";
});

document.getElementById("showLogin").addEventListener("click", function () {
    document.querySelector(".loginCard").style.display = "block";
    document.querySelector(".signUpCard").style.display = "none";
});