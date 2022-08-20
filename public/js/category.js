
let totalCategory = 0;
function showCategories(){
    headerTableCategory();
    theadCategory();
    showCategoryList();
    showCreateCategoryFooter();
}

function resetFormCreateCategory(){
    $("#name").val('');
    $("#description").val('');
    $("#type").val('-- Select type --');
}

function headerTableCategory(){
    let html = `<h6 class="mb-0" id="title">Category List</h6>
                <div id="button-create">
                    <button type="button" onclick="showCreateCategoryForm()" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Create new category
                    </button>
                </div>`
    $("#header-table").html(html)
}

function theadCategory(){
    let thCategory = `<tr class="text-dark">
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col" colspan="2" >Action</th>
                    </tr>`
    $("#thead-list").html(thCategory)
}

function showCategoryList(){
    $.ajax({
    type: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token.token
    },
    url: `${API_URL}/categories`,
    success: function (data) {
        let html = '';
        for (let i = 0; i < data.length; i++) {
            totalCategory++
            html += `<tr id=${data[i]._id}>
                        <td>${i+1}</td>
                        <td>${data[i].name}</td>
                        <td>${data[i].description}</td>
                        <td>${data[i].type}</td>
                        <td><button type="button" class="btn btn-sm btn-primary" onclick="showCategoryUpdateForm('${data[i]._id}')">Edit</button></td>
                        <td><button type="button" class="btn btn-sm btn-primary" onclick='deleteCategory('${data[i]._id}')'>Delete</button></td>
                    </tr>`
                }
                $('#tbody-list').html(html);
    }
    })
}
function showCreateCategoryForm(){
    let html = `<div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name">
                </div>
                <br>
                <div class="form-group">
                    <label for="price">Description</label>
                    <input type="text" class="form-control" id="description">
                </div>
                <br>
                <div class="form-group">
                    <label for="amount">Type</label>
                    <select id="type" class="form-control">        
                        <option>-- Select type --</option>
                        <option value="recharge">Recharge</option>
                        <option value="pay">Pay</option>
                    </select>
                </div>
                <br>`
        $("#modal-body").html(html)
}

function showCreateCategoryFooter() {
    let html = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="createCategory()">Create</button>`;
    $("#modal-footer").html(html)
}

function createCategory(){
    let name = $("#name").val();
    let description = $("#description").val();
    let type = $("#type").val();
    let category = {
        name: name,
        description: description,
        type: type,
    }
    $.ajax({
        type: "POST",
        url: `${API_URL}/categories`,
        headers: {
            "Content-Type": "Application/json",
            "Authorization": "Bearer " + token.token
        },
        data: JSON.stringify(category),
        success: function(data){
            totalCategory++;
            let html = '';
            html += `<tr id=${data._id}>
                        <td>${totalCategory}</td>
                        <td>${data.name}</td>
                        <td>${data.description}</td>
                        <td>${data.type}</td>
                        <td><button type="button" class="btn btn-sm btn-primary" onclick="showCategoryUpdateForm('${data._id}')">Edit</button></td>
                        <td><button type="button" class="btn btn-sm btn-primary" onclick="deleteCategory('${data._id}')">Delete</button></td>
                    </tr>`
            $('#tbody-list').append(html);
            resetFormCreateCategory();    
        }
    })
    
}

// Các hàm dưới bị nhét trong hàm createCategory nên nó chỉ tồn tại trong cái hàm createCategory => lúc a gọi nó sẽ báo lỗi là hàm ko đc định nghĩa
function showCategoryUpdateForm(id) {
    console.log("Check");
    let html = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="updateCategory('${id}')">Save</button>`;
    $('#modal-title').html('Update Category');
    $('#modal-footer').html(html);
    getCategory(id);
}
function getCategory(id){
    $.ajax({
        type: "GET",
        url: `${API_URL}/categories/${id}`,
        headers: {
            'Authorization': 'Bearer ' +token.token
        },
        success: function (data) {
            let html = `<div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" value="${data.name}" id="name">
                        </div>
                        <br>
                        <div class="form-group">
                            <label for="price">Description</label>
                            <input type="text" class="form-control" value="${data.description}" id="description">
                        </div>
                        <br>
                        <div class="form-group">
                            <label for="amount">Type</label>
                            <select id="type" class="form-control">        
                                <option>-- Select type --</option>
                                <option value="recharge">Recharge</option>
                                <option value="pay">Pay</option>
                            </select>
                        </div>
                        <br>`
            $("#modal-body").html(html)
            
        }
    })
}


function updateCategory(id){

}