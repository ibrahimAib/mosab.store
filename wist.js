// async function getData() {
    
//     const response = await fetch(productsUrl,{
        
//     })
//     const data = await response.json()
//     let product = data['data']

//     HTMLtable = '';
//     console.log(HTMLtable);
//     if(document.getElementById('products')){
//         HTMLtable = `                        
//         <tr>
//             <th>المنتج</th>
//             <th>sn</th>
//             <th>المخزون</th>
//             <th>السعر</th>
//             <th>----</th>
//         </tr>`
//         for(i = 0; i < product.length; i++){

//             HTMLtable += `
//             <tr>
//                 <form id="updataProductForm${product[i]['id']}">
//                     <td>
//                         <input class="text_intput" id="title${i}" type="text" value="${product[i]['title']}" name="title">
//                     </td>

//                     <td>
//                         <input class="text_intput  mr-t" id="sn${i}" type="number" value="${product[i]['sn']}" name="sn">
//                     </td>

//                     <td>
//                         <input class="text_intput text_input_small mr-t" id="stock${i}" type="number" value="${product[i]['stock']}" name="stock">
//                     </td>

//                     <td>
//                         <input class="text_intput text_input_small mr-t" type="number" id="price${i}" value="${product[i]['price']}" name="price">
//                     </td>

//                     <td>
//                         <button class="text_intput text_input_small mr-t btn-update" type="submit" value="تعديل" onclick="updateProduct(${product[i]['id']})" name="update">تعديل</button>
//                     </td>
//                 </form>
//             </tr>
//             `;
//             document.getElementById('products').innerHTML = HTMLtable;

//         }
//     }
    
// }