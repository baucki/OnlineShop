function init() {
    const tbody = document.getElementById('tbody');
    let tableRow = 1;

    fetch('http://127.0.0.1:8002/admin/carts').then(res => {
        res.json().then(carts => {
            carts.forEach(cart => {
                tbody.innerHTML +=
                    '<tr>\n' +
                    `      <th scope="row">${tableRow++}</th>\n` +
                    `      <td>${cart.id}</td>\n` +
                    `      <td>${cart.user.username}</td>\n` +
                    `      <td>${cart.product.name}</td>\n` +
                    `      <td>${cart.quantity}</td>\n` +
                    `<td><button type="button" class="btn btn-primary" onclick="edit(${cart.id})">Edit</button></td>\n` +
                    `<td><button type="button" class="btn btn-danger" onclick="deleteCart(${cart.id})">Delete</button></td>\n` +
                    ' </tr>'
            });
        });
    });
}

function create() {
    document.location.href = 'http://127.0.0.1:8000/admin/cart';
}

function edit(id) {
    document.location.href = `http://127.0.0.1:8000/admin/cart/${id}`;
}

function deleteCart(id) {
    fetch(`http://127.0.0.1:8002/admin/carts`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: id})
    }).then(res => {
        res.json().then(cart => {
            if(cart) {
                document.location.href = 'http://127.0.0.1:8000/admin/carts';
            }
        });
    });
}