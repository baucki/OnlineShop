let id;

function init() {

    let  url =  document.URL.split('/');
    id = parseInt(url[url.length-1]);

    if (id) {
        fetch(`http://127.0.0.1:8002/admin/products/${id}`).then(result => result.json().then(product => {
            if (product) {

                document.getElementById('name').value = product.name;
                // document.getElementById('name').value = product.name;
                // document.getElementById('name').value = product.name;
                document.getElementById('btn').innerHTML='Save';
                document.getElementById('btn').onclick=save;
            }
        }));
    }

}

function create() {

    let name = document.getElementById('name').value;
    let price = parseInt(document.getElementById('price').value);
    let quantity = parseInt(document.getElementById('quantity').value);

    fetch('http://127.0.0.1:8002/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            price: price,
            quantity: quantity
        })
    }).then(res => {
        res.json().then(product => {
            if(product) {
                document.location.href = 'http://127.0.0.1:8000/admin/products'
            }
        });
    });

}

function save() {

    fetch('http://127.0.0.1:8002/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: document.getElementById('name').value,
            price: parseInt(document.getElementById('price').value),
            quantity: parseInt(document.getElementById('quantity').value),
            id: id
        })
    }).then(res => {
        res.json().then(product => {
            if(product) {
                document.location.href = 'http://127.0.0.1:8000/admin/products';
            }
        });
    });

}
