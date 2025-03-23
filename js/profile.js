
function addFriend() {
    const friendUsername = document.querySelector('.friend-input input').value;
    if (friendUsername) {
        alert(`Запрос на добавление в друзья отправлен пользователю ${friendUsername}`);
    } else {
        alert('Введите никнейм!');
    }
}

function logout() {
    alert('Вы вышли из аккаунта');
    window.location.href = '../html/login.html';
}