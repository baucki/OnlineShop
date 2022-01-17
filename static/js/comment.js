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
        fetch(`http://127.0.0.1:8002/admin/comments/${id}`).then(result => result.json().then(comment => {
            if (comment) {

                for (let i = 0; i < userSelect.options.length; i++) {
                    if (userSelect.options[i].text === comment.user.username) {
                        userSelect.selectedIndex = i;
                        break;
                    }
                }

                for (let i = 0; i < productSelect.options.length; i++) {
                    if (productSelect.options[i].text === comment.product.name) {
                        productSelect.selectedIndex = i;
                        break;
                    }
                }

                document.getElementById('comment').value = comment.content;
                document.getElementById('btn').innerHTML='Save';
                document.getElementById('btn').onclick=save;
            }
        }));
    }

}

function create() {

    let userID = parseInt(userSelect.options[userSelect.selectedIndex].value);
    let productID = parseInt(productSelect.options[productSelect.selectedIndex].value);
    let content = document.getElementById('comment').value;

    fetch('http://127.0.0.1:8002/admin/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userID: userID,
            productID: productID,
            content: content
        })
    }).then(res => {
        res.json().then(comment => {
            if(comment) {
                document.location.href = 'http://127.0.0.1:8000/admin/comments'
            }
        });
    });

}

function save() {

    let userID = parseInt(userSelect.options[userSelect.selectedIndex].value);
    let productID = parseInt(productSelect.options[productSelect.selectedIndex].value);
    let content = document.getElementById('comment').value;

    fetch('http://127.0.0.1:8002/admin/comments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userID: userID,
            productID: productID,
            content: content,
            id: id
        })
    }).then(res => {
        res.json().then(comment => {
            if(comment) {
                document.location.href = 'http://127.0.0.1:8000/admin/comments'
            }
        });
    });
}

