
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const noteTitleInput = document.querySelector('#note-title');
const noteContentInput = document.querySelector('#note-content')
const noteSubmitButton = document.querySelector('#submit-button');
const noteSaveButton = document.querySelector('#save-button')
const notesList = document.querySelector('#notes-list');


//Search function
searchButton.addEventListener('click', performSearch);

function performSearch(){
  console.log("Search Function Executed")
  const searchTerm = searchInput.value.toLowercase(); // Get search term + convert to lowercase for case-insensitive search
  const allNotes = Array.from(notesList.children); //Convert NodeList of notes to an array

  allNotes.forEach(note => {
    const noteTitle = note.querySelector('.note-title').textContent.toLowerCase();
    const noteContent = note.querySelector('.note-content').textContent.toLowercase();

    if (noteTitle.includes(searchTerm) || noteContent.includes(searchTerm)){
      note.style.display = 'block'; //Show the note if it matches search
    } else{
      note.style.display = 'none'; //Hide note if no match
    }
  })
};


//submit a new note
noteSubmitButton.addEventListener('click', noteSubmit);

function noteSubmit(){
  console.log("Note Submit Executed");
  const title = noteTitleInput.value;
  const content = noteContentInput.value;

  if (title.trim() === '' || content.trim()=== ''){
    alert('Title and content are required');
    return;
  }

  const newNote = document.createElement('li');
  newNote.className = 'note';
  newNote.innerHTML = `
    <h3 class="note-title">${title}</h3>
    <p class="note-content">${content}</p>
    <button class="edit-button">Edit</button>
    <button class="delete-button">Delete</button>
  `;

  notesList.appendChild(newNote);

  // Clear input fields
  noteTitleInput.value = '';
  noteContentInput.value = '';
}



notesList.addEventListener('click', editNote => {
  if (editNote.target.classList.contains('edit-button')){
    const clickedEditButton = editNote.target;
    const note = clickedEditButton.closest('.note');
    const noteTitle = note.querySelector('.note-title').textContent;
    const noteContent = note.querySelector('.note-content').textContent;

    noteTitleInput.value = noteTitle;
    noteContentInput.value = noteContent;

    //Show save button + hide submit
    noteSaveButton.style.display = 'block';
    noteSubmitButton.style.display = 'none';

    //Store reference to edited note
    noteSaveButton.dataset.noteId = note.dataset.noteId;
  }
});

//save edited note
noteSaveButton.addEventListener('click', saveEdit);

function saveEdit(){
  const editedNoteId = noteSaveButton.dataset.noteId;
  const editedNote = document.querySelector(`[data-note-id="${editedNoteId}"]`)
  const editedNoteTitle = noteTitleInput.value;
  const editedNoteContent = noteContentInput.value;

  //Update Title and Content
  editedNote.querySelector('.note-title').textContent = editedNoteTitle;
  editedNote.querySelector('.note-content').textContent = editedNoteContent;

  noteSaveButton.style.display = 'none';
}

notesList.addEventListener('click', deleteNote => {
  if (deleteNote.target.classList.contains('delete-button')){
    const clickedDeleteButton = deleteNote.target;
    //Perform actions for editing note associated w click
  }
});