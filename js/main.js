openPage = (url) => {
    window.location.href = url;
}

const profile = document.querySelector('[data-header-profile]');
const chats = document.querySelector('[data-header-chats]');
const notes = document.querySelector('[data-header-notes]');
const workspace = document.querySelector('[data-header-workspace]');

profile.addEventListener('click', function() {
    window.location.href = `../html/chat.html`;
});

chats.addEventListener('click', function() {
    window.location.href = `../html/chats.html`;
});

notes.addEventListener('click', function() {
    window.location.href = `../html/note.html`;
});

workspace.addEventListener('click', function() {
    window.location.href = `../html/workspace.html`;
});