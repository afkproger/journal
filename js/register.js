document.querySelector('form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const pass = document.getElementById("pass").value;
    const repass = document.getElementById("repass").value;
    if (pass !== repass) {
        alert("Пароли не совпадают");
        document.getElementById("pass").style.border = "1px solid red";
        document.getElementById("repass").style.border = "1px solid red";
    }else {
        const form = e.target;
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
        try {
            const res = await fetch("http://127.0.0.1:8000/api/v1/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formDataObj),
            });

            if (res.ok){
                window.location.href = "../html/login.html";
            }else{
                const errorData = await res.json();
                alert('Ошибка: ' + (errorData.message || res.status));
            }
        }catch(err){
            console.error('Ошибка при отправке запроса:', err);
            alert('Не удалось отправить данные. Попробуйте позже.');
        }
    }
});