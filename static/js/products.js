function init() {

    const tbody = document.getElementById('tbody');
    let tableRow = 1;

    fetch('http://127.0.0.1:8002/admin/products').then(res => {
        res.json().then(products => {
            products.forEach(product => {
                tbody.innerHTML +=
                    '<tr>\n' +
                    `      <th scope="row">${tableRow++}</th>\n` +
                    `      <td>${product.id}</td>\n` +
                    `      <td>${product.name}</td>\n` +
                    `      <td>${product.price}</td>\n` +
                    `      <td>${product.quantity}</td>\n` +
                    `<td><button type="button" class="btn btn-primary" onclick="edit(${product.id})">Edit</button></td>\n` +
                    `<td><button type="button" class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button></td>\n` +
                    ' </tr>'
            });
        });
    });

}

function create() {
    document.location.href = 'http://127.0.0.1:8000/admin/product';
}

function edit(id) {
    document.location.href = `http://127.0.0.1:8000/admin/product/${id}`;
}

function deleteProduct(id) {
    fetch(`http://127.0.0.1:8002/admin/products`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: id})
    }).then(res => {
        res.json().then(product => {
            if(product) {
                document.location.href = 'http://127.0.0.1:8000/admin/products';
            }
        });
    });

}