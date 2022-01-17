let id;
let userSelect;
let productSelect;

function init() {
    let  url =  document.URL.split('/');
    id = parseInt(url[url.length-1]);

    userSelect = document.getElementById('user');
    productSelect = document.getElementById('product');

    fetch('http://127.0.0.1:8002/admin/users').then(res => {
        res.json().then(users => {
            users.forEach(user => {
                userSelect.innerHTML += `<option value="${user.id}">${user.username}</option>`
            });
        });
    });

    fetch('http://127.0.0.1:8002/admin/products').then(res => {
        res.json().then(products => {
            products.forEach(product => {
                productSelect.innerHTML += `<option value="${product.id}">${product.name}</option>`
            });
        });
    });

    if (id) {
        fetch(`http://127.0.0.1:8002/admin/carts/${id}`).then(result => result.json().then(cart => {
            if (cart) {

                for (let i = 0; i < userSelect.options.length; i++) {
                    if (userSelect.options[i].text === cart.user.username) {
                        userSelect.selectedIndex = i;
                        break;
                    }
                }

                for (let i = 0; i < productSelect.options.length; i++) {
                    if (productSelect.options[i].text === cart.product.name) {
                        productSelect.selectedIndex = i;
                        break;
                    }
                }

                document.getElementById('quantity').value = cart.quantity;
                document.getElementById('btn').innerHTML='Save';
                document.getElementById('btn').onclick=save;
            }
        }));
    }

}

function create() {

    let userID = parseInt(userSelect.options[userSelect.selectedIndex].value);
    let productID = parseInt(productSelect.options[productSelect.selectedIndex].value);
    let quantity = document.getElementById('quantity').value;

    fetch('http://127.0.0.1:8002/admin/carts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userID: userID,
            productID: productID,
            quantity: quantity
        })
    }).then(res => {
        res.json().then(cart => {
            if(cart) {
                document.location.href = 'http://127.0.0.1:8000/admin/carts'
            }
        });
    });
}

function save() {
    let userID = parseInt(userSelect.options[userSelect.selectedIndex].value);
    let productID = parseInt(productSelect.options[productSelect.selectedIndex].value);
    let quantity = document.getElementById('quantity').value;

    fetch('http://127.0.0.1:8002/admin/carts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userID: userID,
            productID: productID,
            quantity: quantity,
            id: id
        })
    }).then(res => {
        res.json().then(cart => {
            if(cart) {
                document.location.href = 'http://127.0.0.1:8000/admin/carts'
            }
        });
    });
}