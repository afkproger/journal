document.querySelector('form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());
    try {
        const res = await fetch("http://127.0.0.1:8000/api/v1/auth/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObj),
            credentials: 'include'
        });

        if (res.ok) {
            let json = await res.json();
            document.cookie = `access=${json.access}; path=/; httponly=true`;
            document.cookie = `refresh=${json.refresh}; path=/; httponly=true`;
            window.location.href = "../html/workspace.html";
        } else {
            const errorData = await res.json();
            alert('Ошибка: ' + (errorData.message || res.status));
        }
    } catch (err) {
        console.error('Ошибка при отправке запроса:', err);
        alert('Не удалось отправить данные. Попробуйте позже.');
    }
});