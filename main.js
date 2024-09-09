fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        const userContainer = document.getElementById('userContainer');
        users.forEach(user => {
            const userBlock = document.createElement('div');
            userBlock.classList.add('user');
            const userId = document.createElement('h2');
            userId.innerText = `Id: ${user.id}`;
            const userName = document.createElement('h2');
            userName.innerText = `Name: ${user.name}`;
            const button = document.createElement('button');
            button.classList.add('user-button');
            button.innerText = 'More details';
            button.onclick = () => {
                window.location.href = `user-details.html?userId=${user.id}`;
            };
            userBlock.append(userId,userName,button); // Додаємо кнопку в блок користувача
            userContainer.appendChild(userBlock); // Додаємо блок користувача в контейнер на сторінці
        });
    });
