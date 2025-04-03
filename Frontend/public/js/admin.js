document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (username === "admin" && password === "2025") {
        sessionStorage.setItem("isLoggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("errorMessage").innerText = "Invalid Username or Password!";
    }
});