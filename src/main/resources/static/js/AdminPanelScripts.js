async function prepareEditModal(selctedUserID) {
    let userData = await getUserData(selctedUserID);
    $("#Edit #idEdit").val(selctedUserID);
    $("#Edit #username").val(userData.username);
    $("#Edit #email").val(userData.email);
    $("#Edit form").attr("action", `/admin/${selctedUserID}/edit`).append();
    let editButton = await document.getElementById('confirmEditUserBtn');
    editButton.setAttribute('onclick', `editUser()`);
}

async function prepareDeleteModal(selctedUserID) {
    let userData = await getUserData(selctedUserID);
    $("#Delete #idDelete").val(selctedUserID);
    $("#Delete #usernameDelete").val(userData.username);
    $("#Delete #emailDelete").val(userData.email);
    let deleteButton = await document.getElementById('confirmDeleteUserBtn');
    deleteButton.setAttribute('onclick', `deleteUser(${selctedUserID})`);
}

async function deleteUser(userId) {
    await fetch(`/rest/delete/${userId}`, {
        method: 'DELETE'
    });
    let row = await document.getElementsByName(`rowForUser${userId}`);
    row.forEach((el) => {
        el.remove()
    });
}

async function createUser() {
    await fetch('/rest/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "username": $('#newUserForm #newUsername').val(),
            "email": $('#newUserForm #newEmail').val(),
            "password": $('#newUserForm #newPassword').val(),
            'roles': $('#newUserForm #newSelectedRoles').val()
        })
    });
    await drawUsersTable();
    let usersTableTab = document.getElementById('usersTableTab');
    usersTableTab.setAttribute('class', 'tab-pane fade show active')
    let usersTableLink = document.getElementById("usersTableLink")
    usersTableLink.setAttribute('class', 'nav-link active')
    let newUserTab = document.getElementById('newUserTab');
    newUserTab.setAttribute('class', 'tab-pane fade')
    let newUserLink = document.getElementById("newUserLink")
    newUserLink.setAttribute('class', 'nav-link')
    $('#newUserForm #newUsername').val("")
    $('#newUserForm #newEmail').val("")
    $('#newUserForm #newPassword').val("")
    $('#newUserForm #newSelectedRoles').val("")
}

async function editUser() {
    await fetch('/rest/edit', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "id": $("#Edit #idEdit").val(),
            "username": $('#Edit #username').val(),
            "email": $('#Edit #email').val(),
            "password": $('#Edit #password').val(),
            'roles': $('#Edit #role').val()
        })
    });
    let user = await getUserData($("#Edit #idEdit").val())
    let row = await document.getElementsByName(`rowForUser${user.id}`);
    while (row[0].childNodes.length > 0) {
        row[0].childNodes.forEach((el) => {
            el.remove()
        });
    }
    await writeRow(row[0], user)
    $('#Edit #password').val("")
    $('#Edit #role').val("")
}

function writeRow(row, user) {
    row.setAttribute('name', `rowForUser${user.id}`);
    // 6 id username email role edit delete
    let userFields = [user.id, user.username, user.email, user.roles];
    userFields.forEach((data) => {
        let td = document.createElement('td')
        if (Array.isArray(data)) {
            data.forEach((role) => {
                td.append(document.createTextNode(role.name + ' '));
            })
        } else {
            td.append(document.createTextNode(data));
        }
        row.append(td);
    })
    let editTd = document.createElement('th')
    let editButton = document.createElement('button');
    editButton.setAttribute('id', user.id)
    editButton.setAttribute('type', 'button');
    editButton.setAttribute('class', 'btn btn-primary');
    editButton.setAttribute('data-toggle', 'modal');
    editButton.setAttribute('data-target', '#Edit');
    editButton.textContent = 'Edit';
    editButton.setAttribute('onclick', `prepareEditModal(${BigInt(user.id)})`);
    editTd.append(editButton);
    row.append(editTd);
    let deleteTd = document.createElement('th');
    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('id', user.id)
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('class', 'btn');
    deleteButton.setAttribute('data-toggle', 'modal');
    deleteButton.setAttribute('data-target', '#Delete');
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('onclick', `prepareDeleteModal(${BigInt(user.id)})`);
    deleteButton.setAttribute('style', 'background-color: brown; border-color: brown; color: #fff;');
    deleteTd.append(deleteButton)
    row.append(deleteTd);

}

async function drawUsersTable() {
    let usersData = await fetch('/rest/users').then(response => response.json());
    let table = document.getElementById('usersTable');
    while (table.childNodes.length != 0) {
        table.childNodes.forEach((node) => {
            node.remove()
        });
    }
    usersData.forEach((user) => {
        let row = document.createElement('tr');
        writeRow(row, user)
        // row.setAttribute('name', `rowForUser${user.id}`);
        // // 6 id username email role edit delete
        // let userFields = [user.id, user.username, user.email, user.roles];
        // userFields.forEach((data) => {
        //     let td = document.createElement('td')
        //     if (Array.isArray(data)) {
        //         data.forEach((role) => {
        //             td.append(document.createTextNode(role.name+' '));
        //         })
        //     }else {
        //         td.append(document.createTextNode(data));
        //     }
        //     row.append(td);
        // })
        // let editTd = document.createElement('th')
        // let editButton = document.createElement('button');
        // editButton.setAttribute('id', user.id)
        // editButton.setAttribute('type', 'button');
        // editButton.setAttribute('class', 'btn btn-primary');
        // editButton.setAttribute('data-toggle', 'modal');
        // editButton.setAttribute('data-target', '#Edit');
        // editButton.textContent = 'Edit';
        // editButton.setAttribute('onclick', `prepareEditModal(${BigInt(user.id)})`);
        // editTd.append(editButton);
        // row.append(editTd);
        // let deleteTd = document.createElement('th');
        // let deleteButton = document.createElement('button');
        // deleteButton.setAttribute('id', user.id)
        // deleteButton.setAttribute('type', 'button');
        // deleteButton.setAttribute('class', 'btn');
        // deleteButton.setAttribute('data-toggle', 'modal');
        // deleteButton.setAttribute('data-target', '#Delete');
        // deleteButton.textContent = 'Delete';
        // deleteButton.setAttribute('onclick', `prepareDeleteModal(${BigInt(user.id)})`);
        // deleteButton.setAttribute('style', 'background-color: brown; border-color: brown; color: #fff;');
        // deleteTd.append(deleteButton)
        // row.append(deleteTd);
        table.append(row);
    });
}

async function getUserData(userID) {
    let userData = await fetch(`/rest/user/${userID}`);
    return await userData.json();
}

DOMContentLoaded = drawUsersTable();