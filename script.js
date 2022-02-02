let tip = document.getElementById("tip");

const tipsArr = [
  "If the note is too long you can scroll to see the rest of it.",
  "You can edit the title of a note by <i>clicking it</i>, I know right, such tech...",
  "The content of a note can be edited, who would've thought?",
  "Don't forget to save your note!",
  "Click the \"New Note\" button to add a new note that you can edit!",
  "This app took too long to make, <a href='https://github.com/Sans3108/exo-text' target='_blank' rel='noopener noreferrer'>praise me</a>!",
  "Want your own message here? Contact <a href='https://github.com/Sans3108/Sans3108/blob/master/README.md' target='_blank' rel='noopener noreferrer'>me</a>."
];

let counter = 0;
let id = 0;

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

function newNote() {
  let noteCardTemplate = document.querySelector("[note-card-template]");
  let card = noteCardTemplate.content.cloneNode(true).children[0];

  let btn = document.createElement("button");
  btn.innerText = "Save";

  id++;

  card.children[0].innerText = `note-${id}`;
  //card.children[2].innerText = makeid(rNum(15, 200));

  btn.className = "save-btn";
  btn.setAttribute("onclick", `saveNote("note-${id}")`);
  card.setAttribute("id", `note-${id}`);

  card.appendChild(btn);

  let noteContainer = document.querySelector("[note-container]");
  noteContainer.append(card);
  card.scrollIntoView();
}

function getNote(id) {
  let note = document.getElementById(id);

  return { id: id, title: note.children[0].innerText, content: note.children[2].innerText };
}

function saveNote(id) {
  let data = getNote(id);
  alert(`Note ID: ${data.id}\nTitle: ${data.title}\nContent: ${data.content}`);
}

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

function rNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}