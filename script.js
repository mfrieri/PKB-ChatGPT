
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const noteTitleInput = document.querySelector('#note-title');
const noteContentInput = document.querySelector('#note-content')
const noteSubmitButton = document.querySelector('#submit-button');
const saveButton = document.querySelector('#save-button')
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


    //Create input fields to edit Title + content
    const titleInput = document.createElement('input');
    titleInput.value = noteTitle.textContent;
    const contentInput = document.createElement('textarea');
    contentInput.value = noteContent.textContent;

    //Replace existing content with input fields
    noteTitle.replaceWith(titleInput);
    noteContent.replaceWith(contentInput);

    //Show save button + hide edit
    const editButton = note.querySelector('.edit-button');
    editButton.style.display = 'none';
    saveButton.style.display = 'inline-block';
  }
});

//save edited note
notesList.addEventListener('click', saveNote => {
  if (saveNote.target.classList.contains('save-button')){
    const note = saveNote.target.closest('.note');
    const titleInput = note.querySelector('input');
    const contentInput = note.querySelector('textarea');
    const noteTitle = document.createElement('h3');
    noteTitle.classList.add('note-title');
    noteTitle.textContent = titleInput.value;
    const noteContent = document.createElement('p');
    noteContent.classList.add('note-content');
    noteContent.textContent = contentInput.value;

    //replace input fields with edited content
    titleInput.replaceWith(noteTitle);
    contentInput.replaceWith(noteContent);

    //show edit button and hide save
    const editButton = note.querySelector('.edit-button')
    editButton.style.display = 'inline-block';
    saveButton.style.display = 'none'
  }
})

notesList.addEventListener('click', deleteNote => {
  if (deleteNote.target.classList.contains('delete-button')){
    const clickedDeleteButton = deleteNote.target;
    //Perform actions for editing note associated w click
  }
});