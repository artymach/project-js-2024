const params = new URLSearchParams(window.location.search);
const userId = params.get('userId');

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => response.json())
    .then(user => {

        function displayUserInfo(user) {
            const userDetails = document.getElementById('user-details');
            userDetails.innerHTML = '';

            function appendUserDetail(key, value) {
                const detail = document.createElement('p');
                if (typeof value === 'object' && value !== null) {
                    detail.innerHTML = `<strong>${key}</strong>:`;
                    const ul = document.createElement('ul');
                    for (const subKey in value) {
                        const li = document.createElement('li');
                        appendUserDetail(subKey, value[subKey]).forEach(item => ul.appendChild(item));
                    }
                    detail.appendChild(ul);
                } else {
                    detail.innerHTML = `<strong>${key}</strong>: ${value}`;
                }
                return [detail];
            }

            for (const key in user) {
                const userDetail = document.createElement('div');
                appendUserDetail(key, user[key]).forEach(item => userDetail.appendChild(item));
                userDetails.appendChild(userDetail);
            }
        }

        displayUserInfo(user);

        const buttonPosts = document.getElementById('post-button');
        buttonPosts.onclick = function() {
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
                .then(response => response.json())
                .then(posts => {
                    const postsContainer = document.getElementById('posts');
                    postsContainer.innerHTML = ''; // Очистимо попередній вміст
                    posts.forEach(post => {
                        const postDiv = document.createElement('div');
                        postDiv.classList.add('post');
                        postDiv.innerHTML = `        
                            <p><b>Title:</b> ${post.title}</p>
                        `;
                        const button = document.createElement('button');
                        button.textContent = 'View Post';
                        button.onclick = () => {
                            window.location.href = `post-details.html?postId=${post.id}`;
                        };
                        postDiv.appendChild(button);
                        postsContainer.appendChild(postDiv);
                    });
                });
        };
    });

