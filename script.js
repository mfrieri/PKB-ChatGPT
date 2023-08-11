
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const noteTitleInput = document.querySelector('#note-title');
const noteContentInput = document.querySelector('#note-content')
const noteSubmitButton = document.querySelector('#submit-button');
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


//edit existing note
notesList.addEventListener('click', editNote => {
  if (editNote.target.classList.contains('edit-button')) {
    const note = editNote.target.closest('.note');
    const noteTitle = note.querySelector('.note-title');
    const noteContent = note.querySelector('.note-content');

    // Make the title and content editable
    noteTitle.contentEditable = true;
    noteContent.contentEditable = true;

    noteTitle.focus();
    noteContent.focus();

    // Show the save button and hide the edit button
    const editButton = note.querySelector('.edit-button');
    editButton.style.display = 'none';
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.classList.add('save-button');
    note.appendChild(saveButton);
  }
});

//save edited note
notesList.addEventListener('click', saveNote => {
  if (saveNote.target.classList.contains('save-button')){
    const note = saveNote.target.closest('.note');
    const noteTitle = note.querySelector('.note-title');
    const noteContent = note.querySelector('.note-content');

    //disable editing on title + content
    noteTitle.contentEditable = false;
    noteContent.contentEditable = false;

    //show edit button and hide save
    const editButton = note.querySelector('.edit-button')
    editButton.style.display = 'inline-block';
    saveNote.target.remove();
  }
})


//delete existing note
notesList.addEventListener('click', deleteNote => {
  if (deleteNote.target.classList.contains('delete-button')){
    const clickedDeleteButton = deleteNote.target;
    
    
  }
});