let prodocts = JSON.parse(localStorage.prodocts);
let url = 'https://green-gnu-332746.hostingersite.com/api/v1/getDataFromLocalStorage';

let couter = 0
function g(){
    getDataFromLocalStorage(prodocts[couter])
    couter++
}
async function getDataFromLocalStorage(bo){
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bo)
    })
    const data = await response.json()
}

async function getData() {
    let url = 'https://green-gnu-332746.hostingersite.com/api/v1/products';
    const response = await fetch(url,{
        
    })
    const data = await response.json()
    let product = data['data']

    HTMLtable = '';
    if(document.getElementById('prodocts')){
        HTMLtable = `                        
        <tr>
            <th>المنتج</th>
            <th>المخزون</th>
            <th>السعر</th>
            <th>----</th>
        </tr>`
        for(i = 0; i < product.length; i++){

            HTMLtable += `
            <tr>
            <td class="td_title "><input class="text_intput" id="title${i}" type="text" value="${product[i]['title']}"></td>
            <td><input class="text_intput text_input_small mr-t" id="stock${i}" type="number" value="${product[i]['stock']}"></td>
            <td class="td_price"><input class="text_intput text_input_small mr-t" type="number" id="price${i}" value="${product[i]['price']}"></td>
            <td class="td_price">
                <input class="text_intput text_input_small mr-t btn-update" type="button" value="تعديل" onclick="updata(${i})">
            </td>
            </tr>`;
            document.getElementById('prodocts').innerHTML = HTMLtable;

        }
    }
    
}