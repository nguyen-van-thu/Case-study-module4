const API_URL = 'http://localhost:3000';
        $(function () {
            categoryList();
        })
        let totalCategory = 0;
        function categoryList() {
            $.ajax({
                type: 'GET',
                url: `${API_URL}/categories`,
                success: function (data) {
                    let html = "";
                    totalCategory = data.length;
                    for (let i = 0; i < data.length; i++) {
                        html += `<tr id=${data[i]._id}>
                                <td>${i + 1}</td>
                                <td>${data[i].name}</td>
                                <td>${data[i].description}</td>
                                <td>
                                <button type="button" onclick="showUpdateForm('${data[i]._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Update
                                </button>
                                </td>
                                <td><button class="btn btn-danger" onclick="showConfirmDelete('${data[i]._id}')">Delete</button></td>
                            </tr>`
                    }
                    $('#categories').html(html);
                }
            })
        }
        function showCreateForm(){
            resetFrom();
            let html = `
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="createCategory()">Create</button>
            `
            $('#exampleModalLabel').html('create category');
            $('#footer').html(html);
        }
        function createCategory() {
            let name = $('#name').val();
            let description = $('#description').val();
            let category = {
                name: name,
                description: description
            }
            $.ajax({
                type: 'POST',
                url: `${API_URL}/categories`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(category),
                success: function (data) {
                    let html = '';
                    totalCategory++
                    html += `<tr id = '${data._id}'>
                                <td>${totalCategory}</td>
                                <td>${data.name}</td>
                                <td>${data.description}</td>
                                <td>
                                <button type="button" onclick="showUpdateForm('${data._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Update
                                </button>
                                </td>
                                <td><button class="btn btn-danger" onclick="showConfirmDelete('${data._id}')">Delete</button></td>
                            </tr>`
                    $('#categories').append(html);
                    resetFrom()
                }
            })
        }
        function showConfirmDelete(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteCategory(id);
                    categoryList();
                }
            })
        }
        function deleteCategory(id) {
            $.ajax({
                type: 'DELETE',
                url: `${API_URL}/categories/${id}`,
                success: function () {
                    Swal.fire(
                        'Deleted!',
                        'Product has been deleted.',
                        'success'
                    )
                    $(`#${id}`).remove();
                }
            })
        }
        function showUpdateForm(id){
            let html = `
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="updateCategory('${id}')">Update</button>`
            $('#exampleModalLabel').html('Update Category');
            $('#footer').html(html);
            getCategory(id);
        }
        function getCategory(id){
            $.ajax({
                type: 'GET',
                url:`${API_URL}/categories/${id}`,
                success: function(data) {
                    $('#name').val(data.name);
                    $('#description').val(data.description);
                }
            })
        }
        function updateCategory(id) {
            let name = $('#name').val();
            let description = $('#description').val();
            let category = {
                name: name,
                description: description
            }
            $.ajax({
                type: 'PUT',
                url: `${API_URL}/categories/${id}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(category),
                success: function(data) {
                    let html = '';
                    html += `<tr id = '${data._id}'>
                                <td>${totalCategory}</td>
                                <td>${data.name}</td>
                                <td>${data.description}</td>
                                <td>
                                <button type="button" onclick="showUpdateForm('${data._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Update
                                </button>
                                </td>
                                <td><button class="btn btn-danger" onclick="showConfirmDelete('${data._id}')">Delete</button></td>
                            </tr>`
                    $(`#${id}`).replaceWith(html);
                    resetFrom()
                }
            })
        }
        function resetFrom() {
            $('#name').val('');
            $('#description').val('')
        }