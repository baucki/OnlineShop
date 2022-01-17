
function init() {

    const tbody = document.getElementById('tbody');
    let tableRow = 1;

    fetch('http://127.0.0.1:8002/admin/users').then(res => {
        res.json().then(users => {
            users.forEach(user => {
                tbody.innerHTML +=
                    '<tr>\n' +
                    `      <th scope="row">${tableRow++}</th>\n` +
                    `      <td>${user.id}</td>\n` +
                    `      <td>${user.username}</td>\n` +
                    `      <td>${user.password}</td>\n` +
                    `      <td>${user.isAdmin}</td>\n` +
                    `<td><button type="button" class="btn btn-primary" onclick="edit(${user.id})">Edit</button></td>\n` +
                    `<td><button type="button" class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button></td>\n` +
                    ' </tr>'
            });
        });
    });

}

function create() {
    document.location.href = 'http://127.0.0.1:8000/admin/user';
}

function edit(id) {
    document.location.href = `http://127.0.0.1:8000/admin/user/${id}`;
}

function deleteUser(id) {

    fetch(`http://127.0.0.1:8002/admin/users`,{
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: id})
    }).then(res => {
        res.json().then(user => {
            if(user) {
                document.location.href = 'http://127.0.0.1:8000/admin/users';
            }
        });
    });

}