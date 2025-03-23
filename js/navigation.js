const profile = document.querySelector('[data-header-profile]');
const chats = document.querySelector('[data-header-chats]');
const note = document.querySelector('[data-header-notes]');
const workspace = document.querySelector('[data-header-workspace]');

profile.addEventListener('click', function() {
    window.location.href = `../html/profile.html`;
});

chats.addEventListener('click', function() {
    window.location.href = `../html/chats.html`;
});

note.addEventListener('click', function() {
    window.location.href = `../html/note.html`;
});

workspace.addEventListener('click', function() {
    window.location.href = `../html/workspace.html`;
});