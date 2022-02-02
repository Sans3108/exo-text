let tip = document.getElementById("tip");

const tipsArr = [
  "Click the \"New Note\" button to add a new note that you can edit!",
  "You can edit the title of a note by <i>clicking it</i>, I know right, such tech...",
  "The content of a note can be edited, who would've thought?",
  "Don't forget to save your note!",
  "This app took too long to make, <a href='https://github.com/Sans3108/exo-text' target='_blank' rel='noopener noreferrer'>praise me</a>!",
  "Did you know you can paste images in notes? Yea... that's definitely not a bug...",
  "Want your own message here? Contact <a href='https://github.com/Sans3108/Sans3108/blob/master/README.md' target='_blank' rel='noopener noreferrer'>me</a>."
];

let counter = 0;

if (localStorage.length == 0) {
  localStorage.setItem('notes', '[]');
}

let notesArray = JSON.parse(localStorage.getItem('notes'));

if (notesArray[0]) {
  notesArray.forEach(n => {
    newNote(n);
  });
}

function pick() {
  counter++;

  if (counter > tipsArr.length) {
    counter = 1;
  }

  return tipsArr[counter - 1];
}

setInterval(() => {
  tip.innerHTML = `<h4>${pick()}</h4>`;
}, 10 * 1000);

function newNote(data) {
  let noteCardTemplate = document.querySelector("[note-card-template]");
  let card = noteCardTemplate.content.cloneNode(true).children[0];

  let sBtn = document.createElement("button");
  sBtn.innerText = "Save";
  let dBtn = document.createElement("button");
  dBtn.innerText = "Delete";

  let id;

  if (data && data.id) {
    id = data.id;
  } else id = uuidv4();

  sBtn.className = "save-btn";
  sBtn.setAttribute("onclick", `saveNote("${id}")`);
  dBtn.className = "del-btn";
  dBtn.setAttribute("onclick", `delNote("${id}")`);

  if (data && data.title) {
    card.children[0].innerText = data.title;
  }

  if (data && data.content) {
    card.children[2].innerText = data.content;
  }

  card.setAttribute("id", `${id}`);

  card.appendChild(sBtn);
  card.appendChild(dBtn);

  let noteContainer = document.querySelector("[note-container]");
  noteContainer.append(card);
  card.scrollIntoView();
}

function getNote(id) {
  let note = document.getElementById(id);

  return { id: id, title: note.children[0].innerText, content: note.children[2].innerText };
}

function saveNote(id) {
  let nArr = JSON.parse(localStorage.getItem('notes'));

  if (nArr.find(n => n.id === id)) {
    let note = getNote(id);
    nArr.find(n => n.id === id).title = note.title;
    nArr.find(n => n.id === id).content = note.content;
  } else {
    nArr.push(getNote(id));
  }

  localStorage.setItem('notes', JSON.stringify(nArr));
}

function delNote(id) {
  let nArr = JSON.parse(localStorage.getItem('notes'));

  if (nArr.find(n => n.id === id)) {
    let index = nArr.indexOf(nArr.find(n => n.id === id));
    nArr.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(nArr));
  }

  let card = document.getElementById(id);
  card.parentNode.removeChild(card);
}