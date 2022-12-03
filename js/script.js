const notesCotainer = document.querySelector("#container-notes")

const noteInput = document.querySelector("#search-add-note")

const noteAddBtn = document.querySelector("#add-note")


/* Funcoes */
function addNote() {
   const notes = getNotes();
   const noteObject = {
      id: generateId(),
      content: noteInput.value,
      fixed: false
   }

   const elementNote = createNote(noteObject.id, noteObject.content, noteObject.fixed)
   notesCotainer.appendChild(elementNote);

   notes.push(noteObject);

   saveNotes(notes);
   noteInput.value = "";
}

function showNotes() {
   cleanNotes()
   getNotes().forEach(note => {
      const noteCreateElement = createNote(note.id, note.content, note.fixed)
      notesCotainer.appendChild(noteCreateElement)
   });
}

function cleanNotes() {
   notesCotainer.replaceChildren([]);
}


function createNote(id, content, fixed) {
   const element = document.createElement("div")
   element.classList.add("note");


   const textArea = document.createElement("textarea")
   textArea.value = content
   textArea.classList.add(`${id}`)
   element.appendChild(textArea)

   const copyIcon = document.createElement("i")
   copyIcon.classList.add(...["fa", "fa-copy"])
   element.appendChild(copyIcon)

   const removeIcon = document.createElement("i")
   removeIcon.classList.add(...["fa", "fa-xmark"])
   element.appendChild(removeIcon)

   const fixedIcon = document.createElement("i");
   fixedIcon.classList.add(...["fa", "fa-angle-up"])

   element.appendChild(fixedIcon);

   const saveNOtes = document.createElement("i");
   saveNOtes.classList.add(...["fa", "fa-floppy-disk"])

   element.appendChild(saveNOtes);

   /* eventos */

   element.querySelector(".fa-copy").addEventListener("click", () => {
      copyNotes(id)
   })

   element.querySelector(".fa-xmark").addEventListener("click", () => {
      deleteNote(id, element)
   })

   element.querySelector(".fa-angle-up").addEventListener("click", () => {
      fixedNote(id, element)
   })

   element.querySelector(".fa-floppy-disk").addEventListener("click", () => {
      updateNotes(id, element)
   })

   if (fixed) {
      element.classList.add("fixed")
   }


   return element;
}

function updateNotes(id, element) {
   const notes = getNotes()
   const note = notes.filter(note => note.id === id)[0]
   var newUpdateNote = document.getElementsByClassName(`${id}`)[0].value

   note.content = newUpdateNote
   const elementAnimetion = document.createElement("div")  

         element.appendChild(elementAnimetion).classList.add("c-loader")
      setTimeout(() => {
         element.removeChild(elementAnimetion).classList.remove("c-loader")
      }, 1000);

   saveNotes(notes);
}



function copyNotes(id) {
   const notes = getNotes()
   const noteForCopy = notes.filter(note => note.id === id)[0]

   const noteCopyObject = {
      id: generateId(),
      content: noteForCopy.content,
      fixed: false
   }

   const noteElement = createNote(noteCopyObject.id, noteCopyObject.content, noteCopyObject.fixed)
   notesCotainer.appendChild(noteElement)
   notes.push(noteCopyObject)
   saveNotes(notes)
}

function deleteNote(id, element) {
   const notes = getNotes();
   const noteDelete = notes.filter((note) => note.id !== id)

   saveNotes(noteDelete)

   notesCotainer.removeChild(element)
}

function fixedNote(id) {
   const notes = getNotes()
   const choseNote = notes.filter(note => note.id === id)[0]
   choseNote.fixed = !choseNote.fixed

   saveNotes(notes);
   showNotes();

}

/* local Storege */

function getNotes() {
   const notes = JSON.parse(localStorage.getItem("notes") || "[]");
   const SortNotes = notes.sort((a, b) => (a.fixed > b.fixed ? -1 : 1))
   return SortNotes;
}

function generateId() {
   return Math.floor(Math.random() * 5000)
}

function saveNotes(notes) {
   localStorage.setItem("notes", JSON.stringify(notes));
}
/* eventos */
const notes = getNotes()
const newUpdateNote = document.getElementsByClassName(``)

noteAddBtn.addEventListener("click", () => addNote());



showNotes()
