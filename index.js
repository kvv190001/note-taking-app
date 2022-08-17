const inputEl = document.querySelector("#input-el")
const inputTitle = document.querySelector("#noteTitle")
const inputBtn = document.querySelector("#input-btn")
const noteEl = document.querySelector("#note-el")
const body = document.querySelector('body')
const detailNote = document.querySelector('.view-detail-note')
const editTitle = document.querySelector('#edit-title')
const editText = document.querySelector('#edit-input-text')
const dateTime = document.querySelector('#date-time')

const LOCAL_STORAGE_NOTE_KEY = 'note.lists'
const LOCAL_STORAGE_NOTE_SELECTED_KEY = 'note.selectedlist'
let myNote = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NOTE_KEY)) || []
let selectedNoteId = localStorage.getItem(LOCAL_STORAGE_NOTE_SELECTED_KEY)
const noteList = document.querySelector('[data-notes]')

const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];


console.log(detailNote)
console.log(noteEl)
noteEl.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'button' && e.target.classList.contains('delete')) {
    selectedNoteId = e.target.id
    console.log('delete', e.target.id)
    deleteNote()
  }
})

noteEl.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'button' && e.target.classList.contains('detail')) {
    selectedNoteId = e.target.id
    viewDetail(myNote)
    console.log("detail", e.target.id)
  }
})

detailNote.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'button' && e.target.id === "close") {
    editNote()
    detailNote.style.display = 'none'
  }
})


function showNote() {
  inputTitle.style.display = ''
  inputEl.style.height = ''
  inputBtn.style.display = ''

}

function hideNote() {
  inputTitle.style.display = 'none'
  inputEl.style.height = '20px'
  inputBtn.style.display = 'none'
}

body.addEventListener('click', e => {
  console.log(e.target.id)
  if (e.target.id === "input-form" || e.target.id === "input-el" || e.target.id === "noteTitle") {
    console.log("ShowNote")
    showNote()
  }
  else {
    hideNote()
  }
})


/*inputEl.addEventListener('click', e => {
    inputTitle.style.display = ''
    inputEl.style.height = ''
    inputBtn.style.display = ''
})*/

inputBtn.addEventListener("click", function () {
  if(inputTitle.value === '' && inputEl.value === ''){
    return
  }
  else if(inputTitle.value === ''){
    inputTitle.value = 'Note'
  }
  else if(inputEl.value === ''){
    inputEl.value = '...'
  }
  newNote = createNewNote(inputTitle.value, inputEl.value)
  myNote.push(newNote)
  console.log(myNote)
  inputEl.value = ""
  inputTitle.value = ""

  preRender()
  render(myNote)
})

function createNewNote(name, description) {
  let d = new Date()
  let month = months[d.getMonth()]
  let day = d.getDate()
  let year = d.getFullYear()
  return { id: Date.now().toString(), name: name, description: description, month: month, day: day, year: year }
}

function preRender() {
  inputTitle.style.display = 'none'
  inputEl.style.height = '20px'
  inputBtn.style.display = 'none'
}

function render(Notes) {
  clearNote(noteEl)
  localStorage.setItem(LOCAL_STORAGE_NOTE_KEY, JSON.stringify(myNote))
  localStorage.setItem(LOCAL_STORAGE_NOTE_SELECTED_KEY, selectedNoteId)
  let listItems = ""
  for (let i = Notes.length - 1; i >= 0; i--) {
    listItems += `
        <div class="ind-note" data-noteId = ${Notes[i].id}>
          <h2>${Notes[i].name}</h2>
          <p>${Notes[i].description}</p>
          <div class="group-btn">
            <button class="note-btn delete" id="${Notes[i].id}">Delete</button>
            <button class="note-btn detail" id="${Notes[i].id}">View Details</button>
          </div>
        </div>`
  }
  noteEl.innerHTML = listItems
  detailNote.style.display = 'none'
}

function viewDetail(Notes) {
  for (let i = 0; i < Notes.length; i++) {
    if (`${Notes[i].id}` === selectedNoteId) {
      editTitle.value = Notes[i].name
      editText.value = Notes[i].description
      let listItem = `<p>${Notes[i].month} ${Notes[i].day}, ${Notes[i].year}</p>`
      dateTime.innerHTML = listItem
    }
  }
  detailNote.style.display = ''
}

function editNote(){
  for (let i = 0; i < myNote.length; i++) {
    if (`${myNote[i].id}` === selectedNoteId) {
      if(`${myNote[i].name}` === editTitle.value && `${myNote[i].description}` === editText.value){
        detailNote.style.display = 'none'
        return
      }
      break
    }
  }
  newNote = createNewNote(editTitle.value, editText.value)
  myNote.push(newNote)
  console.log(myNote)
  deleteNote()
  preRender()
  render(myNote)
}

function clearNote(Element) {
  Element.innerHTML = null
}

function deleteNote() {
  myNote = myNote.filter(note => note.id != selectedNoteId)
  render(myNote)
}

preRender()
render(myNote)