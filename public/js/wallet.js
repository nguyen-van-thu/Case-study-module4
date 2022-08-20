let totalWallet = 0;
function showWallet(){
    headerTableWallet();
    theadWallet();
    showWalletList();
    showCreateWalletForm();
    showCreateWalletFooter();
}
function resetFormCreateWallet(){
    $("#name").val('');
    $("#typeMoney").val('');
    $("#totalMoney").val('');
    $("#icon").val('');
}

function headerTableWallet(){
    let html = `<h6 class="mb-0" id="title">Wallet List</h6>
                <div id="button-create">
                    <button type="button" onclick="showCreateWalletForm()" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Create new wallet
                    </button>
                </div>`
    $("#header-table").html(html)
}

function theadWallet(){
    let thWallet = `<tr class="text-dark">
                        <th scope="col">#</th>
                        <th scope="col">Icon</th>
                        <th scope="col">Name</th>
                        <th scope="col">Type Money</th>
                        <th scope="col">Total Money</th>
                        <th scope="col">Current Money</th>
                        <th scope="col">Action</th>
                    </tr>`
    $("#thead-list").html(thWallet)
}

function showWalletList(){
    $.ajax({
    type: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token.token
    },
    url: `${API_URL}/wallets`,
    success: function (data) {
        let html = '';
        for (let i = 0; i < data.length; i++) {
            totalWallet++
            let currentMoney = data[i].totalMoney;
            html += `<tr id=${data[i]._id}>
                        <td>${i+1}</td>
                        <td><image href="${API_URL}/${data[i].icon}"></td>
                        <td>${data[i].name}</td>
                        <td>${data[i].typeMoney}</td>
                        <td>${data[i].totalMoney}</td>
                        <td>${currentMoney}</td>
                        <td><button type="button" class="btn btn-sm btn-primary" onclick="detail("${data[i]._id}")">Detail</button></td>
                    </tr>`
                }
                $('#tbody-list').html(html);
    }
    })
}

function showCreateWalletForm(){
    let html = `<div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name">
                </div>
                <div class="form-group">
                    <label for="price">Type Money</label>
                    <input type="text" class="form-control" id="typeMoney">
                </div>
                <div class="form-group">
                    <label for="amount">Money</label>
                    <input type="text" class="form-control" id="totalMoney">
                </div>
                <div class="form-group">
                    <label for="icon">Icon</label>
                    <input type="file" class="form-control" id="icon">
                </div>`
        $("#modal-body").html(html)
}

function showCreateWalletFooter() {
    let html = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="createWallet()">Create</button>`;
    $("#modal-footer").html(html)
}

function createWallet(){
    let name = $("#name").val();
    let typeMoney = $("#typeMoney").val();
    let totalMoney = $("#totalMoney").val();
    let icon = $("#icon").val();
    let wallet = {
        name: name,
        typeMoney: typeMoney,
        totalMoney: totalMoney,
        icon: icon
    }
    $.ajax({
        type: "POST",
        url: `${API_URL}/wallets`,
        headers: {
            "Content-Type": "Application/json",
            "Authorization": "Bearer " + token.token
        },
        data: JSON.stringify(wallet),
        success: function(data){
            totalMoney++
            let currentMoney = 0;
            currentMoney = data.totalMoney;
            totalWallet++;
            let html = `<tr id=${data._id}>
                        <td>${totalWallet}</td>
                        <td><image href="${API_URL}/${data.icon}"></td>
                        <td>${data.name}</td>
                        <td>${data.typeMoney}</td>
                        <td>${data.totalMoney}</td>
                        <td>${currentMoney}</td>
                        <td><button class="btn btn-sm btn-primary" onclick="detail("${data._id}")">Detail</button></td>
                    </tr>`
            $('#tbody-list').append(html);
            resetFormCreateWallet();    
        }
    })
}

function detail(id){
    
}

$(function () {
    showTime();
})

function showTime() {
    let time = moment().format('DD/MM/YYYY, h:mm A');
    let html = `<span>${time}</span>`
    $('#ViewTime').html(html);
}