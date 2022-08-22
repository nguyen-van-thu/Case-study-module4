let totalWallet = 0;
let datas;
let page = 1,
records = 5,
totalCount = 0,
search = '';
function showWallet(){
    headerTableWallet();
    theadWallet();
    showWalletList();
    showPageWallet();
}
function resetFormCreateWallet(){
    $("#name").val('');
    $("#typeMoney").val('');
    $("#totalMoney").val('');
    $("#icon").val('');
}

function showPageWallet(){
    let html = `<nav aria-label="Page navigation pagination-rounded example justify-content-end mb-0">
                    <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous" id="Previous">
                        <span aria-hidden="true"><i class="fa fa-chevron-left"></i></span>
                        </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next" id="Next">
                        <span aria-hidden="true"><i class="fa fa-chevron-right"></i></span>
                        </a>
                    </li>
                    </ul>
                </nav>`
    $('#page-footer').html(html);
}
function headerTableWallet(){
    let html = `<h6 class="mb-0" id="title">Wallet List</h6>
                <div id="page-footer"></div>
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
                        <th scope="col" colspan="2">Action</th>
                    </tr>`
    $("#thead-list").html(thWallet)
}

// --------
const Story = document.querySelector('#tbody-list');

function  showWalletList() {
    $.ajax ({
        type :'GET',
        headers: {
            'Authorization':'Bearer ' + token.token
        },
        url:`${API_URL}/wallets`,
        success : function(data) {
            datas = data;
            totalWallet = data.length;
                    
                    // Run on page load
                    fetchData();

                    $(document).on('click', '.page-item-numbers a', function() {
                        page = parseInt($(this)[0].text);
                        fetchData();
                    });

                    // Previous Page
                    $('[aria-label="Previous"]').click(function() {
                        if (page > 1) {
                        page--;
                        }
                        fetchData();
                    });

                    // Next page 
                    $('[aria-label="Next"]').click(function() {
                        if (page * records < totalCount) {
                        page++;
                        }
                        fetchData();
                    });
                    // data fetching from API

       }
        
    })
}

function renderPagination() {
            $('.page-item-numbers').remove();
            let pagesNumbers = Math.ceil(totalCount / records);
            for (let i = 1; i <= pagesNumbers; i++) {
            $(`.pagination > li:nth-child(${i})`).after(`<li class="page-item page-item-numbers ${i == page ? 'active': ''}" ><a class="page-link" href="#">${i}</a></li>`);
            }
        }

function fetchData() {
    totalCount = totalWallet;
    let i = 1;
    Story.innerHTML = '';
    datas.slice((page - 1) * records, page * records).map((data) => {
    let currentMoney = data.totalMoney;
        Story.innerHTML +=
                         `<tr id=${data._id}>
                             <td>${i++}</td>
                             <td><img src="${data.icon}" style = "width: 50px; height: 50px;"></td>
                             <td>${data.name}</td>
                             <td>${data.typeMoney}</td>
                             <td>${data.totalMoney}</td>
                             <td>${currentMoney}</td>
                             <td><button type="button" class="btn btn-sm btn-primary" onclick="detail('${data._id}')">Detail</button></td>
                             <td>
                                 <button type="button" onclick="showUpdateWalletForm('${data._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                 Update
                                 </button>  
                             </td>
                        </tr>`
    })
    renderPagination();
}

// -------

// function showWalletList(){
//     $.ajax({
//     type: 'GET',
//     headers: {
//         'Authorization': 'Bearer ' + token.token
//     },
//     url: `${API_URL}/wallets`,
//     success: function (data) {
//         let html = '';
//         for (let i = 0; i < data.length; i++) {
//             totalWallet++
//             let currentMoney = data[i].totalMoney;
//             html += `<tr id=${data[i]._id}>
//                         <td>${i+1}</td>
//                         <td><img src="${data[i].icon}" style = "width: 50px; height: 50px;"></td>
//                         <td>${data[i].name}</td>
//                         <td>${data[i].typeMoney}</td>
//                         <td>${data[i].totalMoney}</td>
//                         <td>${currentMoney}</td>
//                         <td><button type="button" class="btn btn-sm btn-primary" onclick="detail('${data[i]._id}')">Detail</button></td>
//                         <td>
//                             <button type="button" onclick="showUpdateWalletForm('${data[i]._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
//                             Update
//                             </button>  
//                         </td>
//                     </tr>`
//                 }
//                 $('#tbody-list').html(html);
//     }
//     })
// }

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
        $("#modal-title").html("Create wallet");
        showCreateWalletFooter();
}

function showUpdateWalletForm(id) {
    let htmlFooter = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="updateWallet('${id}')">Update</button>`;
    $('#modal-title').html('Update Wallet');
    $('#modal-footer').html(htmlFooter);
    getWalletDetail(id)
}

function getWalletDetail(id){
    $.ajax({
        type: "GET",
        url: `${API_URL}/wallets/${id}`,
        headers: {
            'Authorization': 'Bearer ' +token.token
        },
        success: function (data) {
        let html = `<div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" value="${data.name}">
                </div>
                <div class="form-group">
                    <label for="price">Type Money</label>
                    <input type="text" class="form-control" id="typeMoney" value="${data.typeMoney}">
                </div>
                <div class="form-group">
                    <label for="amount">Money</label>
                    <input type="text" class="form-control" id="totalMoney" value="${data.totalMoney}">
                </div>
                <div class="form-group">
                    <label for="icon">Icon</label>
                    <input type="file" class="form-control" id="icon">
                </div>`
        $("#modal-body").html(html)
        }
    })
}

function updateWallet(id){
    let name = $('#name').val();
    let typeMoney = $('#typeMoney').val();
    let totalMoney = $('#totalMoney').val();
    
    const firebaseConfig = {
        apiKey: "AIzaSyCyeFbKhQleEyCE1PYyTVUOLwnKrTS5gK0",
        authDomain: "bao2k-md4.firebaseapp.com",
        projectId: "bao2k-md4",
        storageBucket: "bao2k-md4.appspot.com",
        messagingSenderId: "335141486798",
        appId: "1:335141486798:web:298a6343a67f75d727909f",
        measurementId: "G-E11R2YM4LB"
      };
       // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const ref = firebase.storage().ref();
        const file = document.querySelector("#icon").files[0];
        const nameImage = +new Date() + "-" + file.name;
        const metadata = {
        contentType: file.type
        };
        const task = ref.child(nameImage).put(file, metadata);
        console.log(task);
        task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            let wallet = {
                name: name,
                typeMoney: typeMoney,
                totalMoney: totalMoney,
                icon: url
            }
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, update it!'
              }).then((result) =>{
                if (result.isConfirmed) {
                    $.ajax({
                        type: 'PUT',
                        url: `${API_URL}/wallets/${id}`,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' +token.token
                        },
                        data: JSON.stringify(wallet),
                        success: function(data){
                            let currentMoney = 0;
                            currentMoney = data.totalMoney;
                            let html = `<tr id="${data._id}">
                                            <td>${totalWallet}</td>
                                            <td><img src="${data.icon}"style = "width: 50px; height: 50px;"></td>
                                            <td>${data.name}</td>
                                            <td>${data.typeMoney}</td>
                                            <td>${data.totalMoney}</td>
                                            <td>${currentMoney}</td>
                                            <td><button class="btn btn-sm btn-primary" onclick="detail("${data._id}")">Detail</button></td>
                                            <td>
                                            <button type="button" onclick="showUpdateWalletForm('${data._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Update
                                            </button>  
                                            </td
                                        </tr>`
                            $(`#${id}`).replaceWith(html);   
                            resetFormCreateWallet(); 
                            Swal.fire(
                                'Updated!',
                                'wallet has been updated.',
                                'success'
                            )
                        }
                    })      
                }
                
              })

        })
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
    const firebaseConfig = {
        apiKey: "AIzaSyCyeFbKhQleEyCE1PYyTVUOLwnKrTS5gK0",
        authDomain: "bao2k-md4.firebaseapp.com",
        projectId: "bao2k-md4",
        storageBucket: "bao2k-md4.appspot.com",
        messagingSenderId: "335141486798",
        appId: "1:335141486798:web:298a6343a67f75d727909f",
        measurementId: "G-E11R2YM4LB"
      };
       // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const ref = firebase.storage().ref();
        const file = document.querySelector("#icon").files[0];
        const nameImage = +new Date() + "-" + file.name;
        const metadata = {
        contentType: file.type
        };
        const task = ref.child(nameImage).put(file, metadata);
        console.log(task);
        task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            let wallet = {
                name: name,
                typeMoney: typeMoney,
                totalMoney: totalMoney,
                icon: url
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
                                <td><img src="${data.icon}"style = "width: 50px; height: 50px;"></td>
                                <td>${data.name}</td>
                                <td>${data.typeMoney}</td>
                                <td>${data.totalMoney}</td>
                                <td>${currentMoney}</td>
                                <td><button class="btn btn-sm btn-primary" onclick="detail("${data._id}")">Detail</button></td>
                                <td>
                                <button type="button" onclick="showUpdateWalletForm('${data._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Update
                                </button>  
                                </td
                            </tr>`
                    $('#tbody-list').append(html);
                    resetFormCreateWallet();    
                }
            })
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