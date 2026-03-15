const form = document.getElementById("note-form");
const titleInput = document.getElementById("title-input")
const authorInput = document.getElementById("author-input")
const noteInput = document.getElementById("note-input")

const notesList = document.getElementById("notes-list")
const errorMessage = document.getElementById("error-message")

async function fetchNotes() {
    const response = await fetch("/api/notes");
    const notes = await response.json();
    return notes;
}

function renderNotes(notes) {
    notesList.innerHTML = ""

    for (const note of notes) {
        const li = document.createElement("li")
        li.textContent = `${note.title} — ${note.author} - ${note.note}`
        notesList.appendChild(li)
    }
}

async function handleSubmit(event) {
  event.preventDefault()

  const title = titleInput.value
  const author = authorInput.value
  const note = noteInput.value

  const response = await fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      author,
      note
    })
  })

  if (!response.ok) {
    const err = await response.json()
    errorMessage.textContent = err.error
    return
  }

  errorMessage.textContent = ""

  await loadNotes()
}

async function loadNotes() {
  const notes = await fetchNotes()
  renderNotes(notes)
}

form.addEventListener("submit", handleSubmit)
loadNotes()