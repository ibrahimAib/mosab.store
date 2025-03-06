cart;
let prodocts;
let customerUrl = 'https://green-gnu-332746.hostingersite.com/api/v1/customers';
ACCESS_TOKEN = 'Bearer ' + localStorage.getItem('ACCESS_TOKEN');

if(localStorage.cart != null && document.getElementById('cart')){
    cart = JSON.parse(localStorage.cart);
    renderCart()
}else{
    cart = [];
    
}
// let cart = [];

let couter = 0;

// check if the cart is empty
if(document.getElementById('cart') && cart.length ==0 ){
    document.getElementById('cart').innerHTML = '<h3 style="text-align: center; color:red; font-size:20px">لا توجد منتجات</h3>';
    
}
function getIds(){
    let add_name = document.getElementById('add_name');
    let add_sn = document.getElementById('add_sn');
    let add_price = document.getElementById('add_price');
    let add_amount = document.getElementById('add_amount');
    let addAmount = parseInt(add_amount.value);
    
    let Name = document.getElementById('name');
    let amount = document.getElementById('amount');
    let price = document.getElementById('price');
    let sum = document.getElementById('sum');
    let del = document.getElementById('del'); 

    let overAll = document.getElementById('overAll');
}
let itemindex;
async function getselections() {
    try {
        const response = await fetch(productsUrl,{
            headers:{
                'Authorization': ACCESS_TOKEN
            },
        }); // Add your `productsUrl` here
        if (response.status == 401) {
            window.location.href = "https://mosab.store/pages/login.html";

        };
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        products = data['data'];
        let products_selctions = '';
        products_selctions += '<option id="" value="" name="">اختر</option>';
        for(i=0; i<products.length; i++){
            products_selctions += `
            <option id="${products[i]['id']}" value="${products[i]['title']}" name="${products[i]['sn']}">${products[i]['title']}</option>
            `;
        };
        document.getElementById('add_name').innerHTML += products_selctions;
            // Attach event listeners programmatically
        
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}
getselections()

// add item botton
function add_item(){
    getIds();

    // id of the seliction's option
    let item = add_name.options[add_name.selectedIndex];

    // the prodoct id of the seclecded item
    let itemindex = products.findIndex(i => {
        return i.id === parseInt(item.id);
    });
    
    // check if the item exist in the cart
    let index = cart.findIndex(item => item.title === add_name.value);

    if(index != -1){
        // if the item is aready exist this lins add the amount and update the sum
        let updatedAmount = cart[index]['add_amount'] + parseInt(add_amount.value);
        if(updatedAmount >= products[itemindex].stock){
            cart[index]['add_amount'] = products[itemindex].stock;
            cart[index]['sum'] = cart[index]['add_amount'] * cart[index]['price'];
            localStorage.setItem('cart', JSON.stringify(cart));
        }else{
            cart[index]['add_amount'] = updatedAmount;
            cart[index]['sum'] = cart[index]['add_amount'] * cart[index]['price'];
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        

    }else{
        // if the item dosn't exsit this lins create new one
        item = {
            id : couter,
            productId : item.id,
            sn: item.getAttribute('name'),
            category: products[itemindex].category,
            title : add_name.value,
            add_amount : parseInt(add_amount.value),
            price: add_price.value,
            sum: Number(add_price.value) * Number(add_amount.value),
            paid: false,
        };
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        couter++

    }


    // add the cart data into html
    renderCart()
};


// products selction



// costumoers selction
async function costumoersSelction() {
    
    response = await fetch(customerUrl,{
        headers:{
            'Authorization': ACCESS_TOKEN
        },
    });
    if (response.status == 401) {
        window.location.href = "https://mosab.store/pages/login.html";
    };
    const customers = await response.json();
    let customers_selctions = '';
    for(i=0; i < customers['data'].length; i++){
        customers_selctions += `
            <option value="${customers['data'][i]['id']}">${customers['data'][i]['name']}</option>
        `;
        document.getElementById('customers').innerHTML = customers_selctions;
    }
}
costumoersSelction()
// updata the input if the user chang the seliction

function getProductInfoByName(){
    getIds();
    let item = add_name.options[add_name.selectedIndex];
    let itemindex = products.findIndex(i => {
        return i.id === parseInt(item.id)
    });
    document.getElementById('add_price').value = products[itemindex].price;
    document.getElementById('add_sn').value = products[itemindex].sn;
    document.getElementById('add_amount').value = 1;
    document.getElementById('add_amount').setAttribute("max", products[itemindex].stock);
    
}
let snEvent = document.getElementById('add_sn');
snEvent.addEventListener('input', getProdoctInfoBySn);
function getProdoctInfoBySn() {
    let itemindex = products.findIndex(i => {
        return i.sn === snEvent.value
    });
    document.getElementById('add_price').value = products[itemindex].price;
    document.getElementById('add_name').value = products[itemindex].title;
    document.getElementById('add_amount').value = 1;
    document.getElementById('add_amount').setAttribute("max", products[itemindex].stock);
    add_item();
    document.getElementById('add_sn').value = '';
}


function remove(ind){
    let index = parseInt(ind);
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart()
}

function renderCart() {
    let HTMLtable = '';
    let overAll = 0;
        HTMLtable = `
        <thead>
            <tr>
                <th>المنتج</th>
                <th>العدد</th>
                <th>السعر</th>
                <th>المجموع</th>
                <th>---</th>
            </tr>
        </thead>
`
    for (let i = 0; i < cart.length; i++) {
        let ide = 'id' + i;
        HTMLtable += `

        <tr>
            <td><input class="text_intput text_input_small" type="text" value="${cart[i].title}"></input></td>
            <td><input class="text_intput number_input_small mr-t" id="${ide}" onchange="amoutnUpdataCart(${i})" min="1" type="number" value="${cart[i].add_amount || 0}"></td>
            <td>
            <input class="text_intput number_input_small mr-t " type="number" value="${cart[i].price}" readonly>
                <span >ريال</span>
            </td>
            <td>
                <input class="text_intput number_input_small mr-t " type="number" value="${cart[i].sum}" readonly>
                <span>ريال</span>
            </td>
            <td>
                <input class="text_intput number_input_small mr-t btn-del " type="button" value="حذف" onclick="remove(${i})">
            </td>
        </tr>`;
        overAll += cart[i].sum;
    }
    document.getElementById('cart').innerHTML = HTMLtable;
    document.getElementById('overAll').value = overAll;
}
function amoutnUpdataCart(id){
    let ide = 'id' + id;
    let newAmount = parseInt(document.getElementById(ide).value);
    let index = id;

    if(newAmount >= products[index].stock){
        cart[id].add_amount = products[index].stock;
        localStorage.setItem('cart', JSON.stringify(cart));
    }else{
        cart[id]['add_amount'] = newAmount;
        cart[id]['sum'] = cart[id]['add_amount'] * cart[id]['price'];
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    let price = cart[index]['price'];
    let amount = parseFloat(cart[id]['add_amount']);
    let sum = price * amount;
    cart[id]['sum'] = parseFloat(sum);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart()
}