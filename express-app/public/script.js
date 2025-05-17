// script.js
const apiUrl = "/app/";

function showMessage(msg, type = "success") {
  const messageDiv = document.getElementById("message");
  messageDiv.textContent = msg;
  messageDiv.className =
    type === "error" ? "text-red-600 font-bold" : "text-green-600 font-bold";
  setTimeout(() => {
    messageDiv.textContent = "";
  }, 2500);
}

function fetchEntries() {
  fetch(apiUrl)
    .then((res) => res.text())
    .then((text) => {
      const entriesDiv = document.getElementById("entries");
      const lines = text.trim().split("\n").filter(Boolean);
      if (lines.length === 0) {
        entriesDiv.innerHTML =
          '<em class="text-gray-500">No entries found.</em>';
        return;
      }
      entriesDiv.innerHTML = lines
        .map((line) => {
          try {
            const obj = JSON.parse(line);
            return `
            <div class="entry-card">
              <span>
                <span class="entry-name">${obj.name}</span>
                <span class="entry-age">(Age: ${obj.age})</span>
              </span>
            </div>
          `;
          } catch {
            return "";
          }
        })
        .join("");
    })
    .catch(() => showMessage("Error fetching entries", "error"));
}

document.getElementById("refreshBtn").onclick = fetchEntries;

document.getElementById("addForm").onsubmit = function (e) {
  e.preventDefault();
  const name = document.getElementById("addName").value.trim();
  const age = parseInt(document.getElementById("addAge").value, 10);
  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age }),
  })
    .then((res) => res.text())
    .then((msg) => {
      showMessage(msg);
      fetchEntries();
      this.reset();
    })
    .catch(() => showMessage("Error adding entry", "error"));
};

document.getElementById("deleteForm").onsubmit = function (e) {
  e.preventDefault();
  const name = document.getElementById("deleteName").value.trim();
  fetch(apiUrl, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  })
    .then((res) => res.text())
    .then((msg) => {
      showMessage(msg);
      fetchEntries();
      this.reset();
    })
    .catch(() => showMessage("Error deleting entry", "error"));
};

document.getElementById("updateForm").onsubmit = function (e) {
  e.preventDefault();
  const oldName = document.getElementById("oldName").value.trim();
  const name = document.getElementById("newName").value.trim();
  const age = parseInt(document.getElementById("newAge").value, 10);
  fetch(apiUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ oldName, name, age }),
  })
    .then((res) => res.text())
    .then((msg) => {
      showMessage(msg);
      fetchEntries();
      this.reset();
    })
    .catch(() => showMessage("Error updating entry", "error"));
};

// Initial load
fetchEntries();
