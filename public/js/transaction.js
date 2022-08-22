//show form create transaction
function showCreateTransactionForm() {
    showModalCreateTransaction();
    getWallet();
    getCategory();
}



function showModalCreateTransaction() {
    let now = moment().format('YYYY-MM-DD');
    let html = `<div class="form-group">
                    <label for="name">Money</label>
                    <input type="text" class="form-control" id="money">
                </div>
                <br>
                <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" class="form-control" id="description">
                </div>
                <div class="form-group">
                    <label for="time">Time</label>
                    <input type="date" class="form-control" id="time" value="${now}">
                </div>
                <br>
                <div class="form-group"> 
                    <label for="amount">Wallet</label>
                    <select id="selectWallet" class="form-control" >        
                        
                    </select>
                </div>
                <div class="form-group"> 
                    <label for="amount">Category</label>
                    <select id="selectCategory" class="form-control" >        
                        
                    </select>
                </div>
                <br>`;
    let html1 = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="createTransaction()">Create</button>`;
    $('.modal-title').html('Create Transaction');
    $("#modal-body").html(html);
    $('#modal-footer').html(html1);
};

function createTransaction() {
    let money = $('#money').val();
    let description = $('#description').val();
    let time = $('#time').val();
    let walletId = $('#selectWallet').val();
    let categoryId = $('#selectCategory').val();
    $.ajax({
        headers: {
            "Content-Type": "Application/json",
            'Authorization': 'Bearer ' + token.token
        },
        type: "GET",
        url: `${API_URL}/categories/${categoryId}`,
        success: function (data) {
            let transaction = {};
            if (data.type === 'pay') {
                transaction = {
                    money: -money,
                    description: description,
                    time: time,
                    walletId: walletId,
                    categoryId: categoryId
                };
            }else {
                transaction = {
                    money: money,
                    description: description,
                    time: time,
                    walletId: walletId,
                    categoryId: categoryId
                };
            }
            $.ajax({
                headers: {
                    "Content-Type": "Application/json",
                    'Authorization': 'Bearer ' + token.token
},
                type: "POST",
                url: `${API_URL}/transaction`,
                data: JSON.stringify(transaction),
                success: async function () {
                    await Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Create Success!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        }
    })

};

//get Wallet
function getWallet() {
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        url: `${API_URL}/wallets`,
        success: function (data) {
            let html = '<option>-- Select type --</option>';
            for (let i = 0; i < data.length; i++) {
                html += `<option value="${data[i]._id}">${data[i].name}</option>`
            }
            $('#selectWallet').html(html);
        }
    })
}

//get Category
function getCategory() {
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        url: `${API_URL}/categories`,
        success: function (data) {
            let html = '<option>-- Select type --</option>';
            for (let i = 0; i < data.length; i++) {
                html += `<option value="${data[i]._id}" type="${data[i].type}">${data[i].name}</option>`
            }
            $('#selectCategory').html(html);
        }
    })
}