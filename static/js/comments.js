function init() {
    const tbody = document.getElementById('tbody');
    let tableRow = 1;

    fetch('http://127.0.0.1:8002/admin/comments').then(res => {
        res.json().then(comments => {
            comments.forEach(comment => {
                tbody.innerHTML +=
                    '<tr>\n' +
                    `      <th scope="row">${tableRow++}</th>\n` +
                    `      <td>${comment.id}</td>\n` +
                    `      <td>${comment.user.username}</td>\n` +
                    `      <td>${comment.product.name}</td>\n` +
                    `      <td>${comment.content}</td>\n` +
                    `<td><button type="button" class="btn btn-primary" onclick="edit(${comment.id})">Edit</button></td>\n` +
                    `<td><button type="button" class="btn btn-danger" onclick="deleteComment(${comment.id})">Delete</button></td>\n` +
                    ' </tr>'
            });
        });
    });

}

function create() {
    document.location.href = 'http://127.0.0.1:8000/admin/comment';
}

function edit(id) {
    document.location.href = `http://127.0.0.1:8000/admin/comment/${id}`;
}

function deleteComment(id) {
    fetch(`http://127.0.0.1:8002/admin/comments`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: id})
    }).then(res => {
        res.json().then(comment => {
            if(comment) {
                document.location.href = 'http://127.0.0.1:8000/admin/comments';
            }
        });
    });
}