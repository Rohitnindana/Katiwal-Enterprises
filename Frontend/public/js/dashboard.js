if (sessionStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}

function logout() {
if (confirm("Are you sure you want to logout?")) {  // ✅ Confirm Dialog
sessionStorage.removeItem("isLoggedIn");
window.location.href = "index.html";  // ✅ Redirect to Homepage
}
}
async function deleteContact(contactId) {
    if (confirm("Are you sure you want to delete this contact?")) {
        try {
            const response = await fetch(`http://localhost:5000/api/contacts/${contactId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                alert("Contact deleted successfully!");
                loadContacts();
            } else {
                alert("Failed to delete contact.");
            }
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    }
}

async function markComplete(contactId) {
    try {
        const response = await fetch(`http://localhost:5000/api/contacts/${contactId}/complete`, {
            method: "PUT"
        });
        const result = await response.json();
        if (response.ok) {
            alert("✅ Contact marked as complete!");
            loadContacts();
        } else {
            alert(result.error || "Failed to mark as complete");
        }
    } catch (error) {
        console.error("❌ Error marking contact as complete:", error);
        alert("Something went wrong. Try again.");
    }
}

async function loadContacts() {
    try {
        const response = await fetch("http://localhost:5000/api/contacts");
        const contacts = await response.json();

        const tableBody = document.getElementById("contactTableBody");
        tableBody.innerHTML = "";

        contacts.forEach(request => {
            const isCompleted = request.status === "Completed";
            const row = `<tr>
                <td>${request.name}</td>
                <td>${request.email}</td>
                <td>${request.mobile}</td>
                <td>${request.message}</td>
                <td>${new Date(request.date).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-success btn-sm" 
                        onclick="markComplete('${request._id}')" 
                        ${isCompleted ? "disabled" : ""}>
                        ✅ ${isCompleted ? "Completed" : "Mark Complete"}
                    </button>
                    <button class="btn btn-danger btn-sm" 
                        onclick="deleteContact('${request._id}')">
                        🗑 Delete
                    </button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("❌ Error loading contacts:", error);
    }
}

loadContacts();