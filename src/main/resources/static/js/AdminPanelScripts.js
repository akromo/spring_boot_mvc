async function prepareEditModal(selctedUserID) {
    let userData = await getUserData(selctedUserID);
    $("#Edit #idEdit").val(selctedUserID);
    $("#Edit #username").val(userData.username);
    $("#Edit #email").val(userData.email);
    $("#Edit form").attr("action", `/admin/${selctedUserID}/edit`).append();
}

async function prepareDeleteModal(selctedUserID) {
    let userData = await getUserData(selctedUserID);
    $("#Delete #userDeleteForm").attr("action", `/admin/${selctedUserID}/delete`).append();
    $("#Delete #idDelete").val(selctedUserID);
    $("#Delete #usernameDelete").val(userData.username);
    $("#Delete #emailDelete").val(userData.email);
}

async function drawUsersTable() {
    let usersData = await fetch('/rest/users').then(response => response.json());
    let table = document.getElementById('usersTable');
    for (element in table.tbody) {
        element.remove();
    }
    usersData.forEach((user) => {
        let row = document.createElement('tr');
        // 6 id username email role edit delete
        let userRoles = '';
        user.roles.forEach((role) => { userRoles+role.name+' '})
        let userFields = [user.id, user.username, user.email, userRoles].flat();
        userFields.forEach((data) => {
            let td = document.createElement('td')
            td.append(document.createTextNode(data))
            row.append(td);
        })


        // row.append(document.createElement('td').append(document.createTextNode(user.username)))
        //
        //
        // row.append(document.createElement('td').after(td => td.append(document.createTextNode(user.username))));
        // row.append(document.createElement('td').append(document.createTextNode(user.email)));
        // let userRoles = '';
        // user.roles.forEach((role) => {
        //     userRoles + role.name + ' ';
        // });
        // row.append(document.createElement('td').setAttribute('text', userRoles));
        let editButton = document.createElement('button');
        editButton.setAttribute('id', user.id)
        editButton.setAttribute('type', 'button');
        editButton.setAttribute('class', 'btn btn-primary');
        editButton.setAttribute('data-toggle', 'modal');
        editButton.setAttribute('data-target', '#Edit');
        editButton.setAttribute('text', 'Edit');
        row.append(document.createElement('td').append(editButton)); //<button th:attr="id=${user.getId()}" type="button" class="btn btn-primary" data-toggle="modal" data-target="#Edit">
        let deleteButton = document.createElement('button');
        editButton.setAttribute('id', user.id)
        editButton.setAttribute('type', 'button');
        editButton.setAttribute('class', 'btn');
        editButton.setAttribute('data-toggle', 'modal');
        editButton.setAttribute('data-target', '#Delete');
        editButton.setAttribute('text', 'Delete');
        editButton.setAttribute('style', 'background-color: brown; border-color: brown; color: #fff;');
        row.append(document.createElement('td').append(deleteButton));
        table.append(row);
    });
}

async function getUserData(userID) {
    let userData = await fetch(`/rest/user/${userID}`);
    return await userData.json();
}

$('table button[data-target="#Edit"]').on('click', function () {
    let selctedUserID = $(this).attr("id");
    prepareEditModal(selctedUserID);
})

$('table button[data-target="#Delete"]').on('click', function () {
    let selctedUserID = $(this).attr("id");
    prepareDeleteModal(selctedUserID);
})

DOMContentLoaded = drawUsersTable();