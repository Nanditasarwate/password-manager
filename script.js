const form = document.getElementById("passwordForm");
const entriesContainer = document.getElementById("entriesContainer");

let entries = JSON.parse(localStorage.getItem("passwords")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const website = document.getElementById("website").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (website && username && password) {
    const newEntry = { website, username, password };
    entries.push(newEntry);
    localStorage.setItem("passwords", JSON.stringify(entries));
    renderEntries();
    form.reset();
  }
});

function renderEntries() {
  entriesContainer.innerHTML = "";

  entries.forEach((entry, index) => {
    const entryDiv = document.createElement("div");
    entryDiv.classList.add("entry");

    entryDiv.innerHTML = `
      <h3>${entry.website}</h3>
      <p><strong>Username:</strong> ${entry.username}</p>
      <p><strong>Password:</strong> <span class="password" id="pw-${index}">••••••••</span></p>
      <div class="actions">
        <button class="show-btn" onclick="togglePassword(${index})">Show</button>
        <button class="copy-btn" onclick="copyPassword(${index})">Copy</button>
        <button class="delete-btn" onclick="deleteEntry(${index})">Delete</button>
      </div>
    `;

    entriesContainer.appendChild(entryDiv);
  });
}

function togglePassword(index) {
  const span = document.getElementById(`pw-${index}`);
  const password = entries[index].password;
  if (span.textContent === "••••••••") {
    span.textContent = password;
  } else {
    span.textContent = "••••••••";
  }
}

function copyPassword(index) {
  const password = entries[index].password;
  navigator.clipboard.writeText(password)
    .then(() => {
      alert("Password copied to clipboard!");
    })
    .catch(err => {
      console.error("Failed to copy: ", err);
    });
}

function deleteEntry(index) {
  if (confirm("Are you sure you want to delete this entry?")) {
    entries.splice(index, 1);
    localStorage.setItem("passwords", JSON.stringify(entries));
    renderEntries();
  }
}

// Load entries on page load
renderEntries();
