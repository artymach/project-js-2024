const params = new URLSearchParams(window.location.search);
const postId = params.get('postId');

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(response => response.json())
    .then(post => {

        const postDetailsContainer = document.querySelector('.post-details');
        postDetailsContainer.innerHTML = '';

        for (const key in post) {
            const detail = document.createElement('p');
            detail.innerHTML = `<b>${key}:</b> ${post[key]}`;
            postDetailsContainer.appendChild(detail);
        }

    });


fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(response => response.json())
    .then(comments => {

        comments.forEach(comment => {
            const commentBlock = document.createElement('div');
            commentBlock.classList.add('comment-block');
            commentBlock.innerHTML = '';

            for (const key in comment) {
                const detail = document.createElement('p');
                detail.innerHTML = `<b>${key}:</b> ${comment[key]}`;
                commentBlock.appendChild(detail);
            }

            document.querySelector('.comments-container').appendChild(commentBlock);
        });

    });
