async function prepareEditModal(selctedUserID) {
    let userData = await getUserData(selctedUserID);
    $("#Edit #idEdit").val(selctedUserID);
    $("#Edit #username").val(userData.username);
    $("#Edit #email").val(userData.email);
    $("#Edit form").attr("action", `/admin/${selctedUserID}/edit`).append();
}

async function prepareDeleteModal(selctedUserID) {
    let userData = await getUserData(selctedUserID);
    //$("#Delete #userDeleteForm").attr("action", `/admin/${selctedUserID}/delete`).append();
    $("#Delete #idDelete").val(selctedUserID);
    $("#Delete #usernameDelete").val(userData.username);
    $("#Delete #emailDelete").val(userData.email);
    let deleteButton = await document.getElementById('confirmDeleteUserBtn');
    deleteButton.setAttribute('onclick', `deleteUser(${selctedUserID})`);
}

async function deleteUser(userId) {
    await fetch(`/rest/delete/${userId}`, {
        method: 'POST'
    });
    let row = await document.getElementsByName(`rowForUser${userId}`);
    row.forEach((el)=>{el.remove()});
}

async function createUser() {

}

async function drawUsersTable() {
    let usersData = await fetch('/rest/users').then(response => response.json());
    let table = document.getElementById('usersTable');
    for (element in table.tbody) {
        element.remove();
    }
    usersData.forEach((user) => {
        let row = document.createElement('tr');
        row.setAttribute('name', `rowForUser${user.id}`);
        // 6 id username email role edit delete
        let userFields = [user.id, user.username, user.email, user.roles];
        userFields.forEach((data) => {
            let td = document.createElement('td')
            if (Array.isArray(data)) {
                data.forEach((role) => {
                    td.append(document.createTextNode(role.name+' '));
                })
            }else {
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
        table.append(row);
    });
}

async function getUserData(userID) {
    let userData = await fetch(`/rest/user/${userID}`);
    return await userData.json();
}

// $('table button[data-target="#Edit"]').on('click', function () {
//     alert('Перехват #Edit')
//     let selctedUserID = $(this).attr("id");
//     prepareEditModal(selctedUserID);
// })
//
// $('table button[data-target="#Delete"]').on('click', function () {
//     alert('Перехват #Delete')
//     let selctedUserID = $(this).attr("id");
//     prepareDeleteModal(selctedUserID);
// })

DOMContentLoaded = drawUsersTable();