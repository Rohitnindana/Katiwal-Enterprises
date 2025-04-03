document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const message = document.getElementById("message").value;

    const response = await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, mobile, message })
    });

    const result = await response.json();
    document.getElementById('responseMessage').innerHTML = `<div class="alert alert-success">${result.message}</div>`;
    this.reset();
});