
function getPoeple() {

    fetch('http://localhost:7000/people')
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.forEach(element => {
                $('#content').append(`
                    <tr>
                        <td>${element._id}</td>
                        <td>${element.fullname}</td>
                        <td>${element.occupation}</td>
                        <td>${element.email}</td>
                        <td>${element.phonenumber}</td>
                        <td>
                            <button class = "btn btn-success" onClick="editPeople('${element._id}')">Edit</button>
                            <button class = "btn btn-danger mt-1" onClick="deletePeople('${element._id}')">Delete</button>
                        </td>
                    </tr>
                `);
            });
        }).catch(error => {
            console.log(error);
        });
}

function editPeople(_id) {
    fetch(`http://localhost:7000/people/${_id}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            $('input[name="id"]').val(`${data._id}`);
            $('input[name="fullname"]').val(`${data.fullname}`);
            $('input[name="occupation"]').val(`${data.occupation}`);
            $('input[name="email"]').val(`${data.email}`);
            $('input[name="phonenumber"]').val(`${data.phonenumber}`);
        });
}

function deletePeople(_id) {
    fetch(`http://localhost:7000/people/delete/${_id}`, {
        method: 'DELETE'
    })
        .then(response => response.text())
        .then(response => console.log(response));

    location.reload();
}

$(document).ready(function () {

    getPoeple();

    $('#create').on('click', function () {
        let fullname = $('input[name="fullname"]').val(),
            occupation = $('input[name="occupation"]').val(),
            email = $('input[name="email"]').val(),
            phonenumber = $('input[name="phonenumber"]').val();

        let people = { fullname, occupation, email, phonenumber };

        fetch('http://localhost:7000/people/add', {
            method: "POST",
            body: JSON.stringify(people),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(location.reload());


    });

    $('#update').on('click', function () {
        let fullname = $('input[name="fullname"]').val(),
            occupation = $('input[name="occupation"]').val(),
            email = $('input[name="email"]').val(),
            phonenumber = $('input[name="phonenumber"]').val(),
            id = $('input[name="id"]').val()

        let people = { fullname, occupation, email, phonenumber };

        fetch(`http://localhost:7000/people/update/${id}`, {
            method: "POST",
            body: JSON.stringify(people),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(location.reload());
    })
});