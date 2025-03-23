let notes = [
    {
        id: 1,
        title: "Идеи для проекта",
        date: "2023-10-01",
        description: "Заметки о новых идеях для разработки.",
        content: "<p>1. Создать приложение для заметок.</p><p>2. Добавить возможность синхронизации.</p>"
    },
    {
        id: 2,
        title: "План на неделю",
        date: "2023-10-05",
        description: "Расписание задач на неделю.",
        content: "<p>Понедельник: Завершить верстку.</p><p>Вторник: Написать API.</p>"
    },
    {
        id: 3,
        title: "Книги для прочтения",
        date: "2023-10-10",
        description: "Список книг, которые нужно прочитать.",
        content: "<p>1. 'Чистый код' Роберт Мартин.</p><p>2. 'JavaScript: Сильные стороны' Дуглас Крокфорд.</p>"
    }
];
let currentNoteId = null;

document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
});

function loadNotes() {
    const notesList = document.querySelector('.notes-list');
    notesList.innerHTML = '';
    notes.forEach((note) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note-item';
        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p class="note-date">${note.date}</p>
            <p class="note-description">${note.description}</p>
        `;
        noteElement.addEventListener('click', () => openNote(note.id));
        notesList.appendChild(noteElement);
    });
}

function openNote(id) {
    const note = notes.find(n => n.id === id);
    if (note) {
        currentNoteId = id;
        document.getElementById('note-title').value = note.title;
        document.getElementById('note-content').innerHTML = note.content;
    }
}

function addNote() {
    const newNote = {
        id: notes.length + 1,
        title: `Новая запись ${notes.length + 1}`,
        date: new Date().toISOString().split('T')[0],
        description: "Описание новой записи.",
        content: "<p>Начните писать здесь...</p>"
    };
    notes.push(newNote);
    loadNotes();
    openNote(newNote.id);
}

function saveNote() {
    if (currentNoteId !== null) {
        const note = notes.find(n => n.id === currentNoteId);
        if (note) {
            note.title = document.getElementById('note-title').value;
            note.content = document.getElementById('note-content').innerHTML;
            alert('Запись сохранена!');
            loadNotes();
        }
    } else {
        alert('Нет активной записи для сохранения.');
    }
}

function deleteNote() {
    if (currentNoteId !== null) {
        notes = notes.filter(n => n.id !== currentNoteId);
        currentNoteId = null;
        loadNotes();
        document.getElementById('note-title').value = '';
        document.getElementById('note-content').innerHTML = '';
    } else {
        alert('Нет активной записи для удаления.');
    }
}

function formatText(command) {
    document.execCommand(command, false, null);
}

function insertLink() {
    const url = prompt('Введите URL ссылки:');
    if (url) {
        document.execCommand('createLink', false, url);
    }
}

function clearFormatting() {
    document.execCommand('removeFormat', false, null);
}

const dropZone = document.getElementById('drop-zone');
const noteContent = document.getElementById('note-content');

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    handleFiles(files);
});

function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                noteContent.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    }
}

dropZone.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.multiple = true;
    fileInput.onchange = (e) => handleFiles(e.target.files);
    fileInput.click();
});