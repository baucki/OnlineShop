let id;

function init() {
    let  url =  document.URL.split('/');
    id = parseInt(url[url.length-1]);
    if (id) {
        fetch(`http://127.0.0.1:8002/admin/users/${id}`).then(result => result.json().then(user => {
            if (user) {
                document.getElementById('floatingInput').value = user.username;
                document.getElementById('floatingPassword').innerHTML = 'New Password'
                document.getElementById('floatingRepeatedPassword').innerHTML = 'Repeat New Password';
                if (user.isAdmin) {
                    document.getElementById('flexCheckDefault').click();
                }
                document.getElementById('btn').innerHTML = 'Save';
                document.getElementById('btn').onclick=save;
            }
        }));
    }

}

function create() {

    let username = document.getElementById('floatingInput').value;
    let password = document.getElementById('floatingPassword').value;
    let repeatedPassword = document.getElementById('floatingRepeatedPassword').value;
    let isAdmin = document.getElementById('flexCheckDefault').value;

    if (password !== repeatedPassword) return alert("passwords didn't match");
    if (isAdmin === 'checked') isAdmin = true;
    else isAdmin = false;

    fetch(`http://127.0.0.1:8002/admin/users`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password,
            isAdmin: isAdmin
        })
    }).then(res => {
        res.json().then(user => {
            if(user) {
                document.location.href = 'http://127.0.0.1:8000/admin/users';
            }
        });
    });
}

function checkboxValue(id) {
    const checkbox = document.getElementById(id);

    if(checkbox.value === 'unchecked')
        checkbox.value = 'checked';
    else
        checkbox.value = 'unchecked';
}

function save() {
    if (document.getElementById('floatingPassword').value ===
        document.getElementById('floatingRepeatedPassword'). value) {

        let isAdminValue = document.getElementById('flexCheckDefault').value;
        if(isAdminValue === 'checked')
             isAdminValue = true;
        else isAdminValue = false;

        fetch('http://127.0.0.1:8002/admin/users', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: document.getElementById('floatingInput').value,
                password: document.getElementById('floatingPassword').value,
                isAdmin: isAdminValue,
                id: id
            })
        }).then(res => {
            res.json().then(user => {
                if(user) {
                    document.location.href = 'http://127.0.0.1:8000/admin/users';
                }
            });
        });
    }


}