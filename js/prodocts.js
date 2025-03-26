let products;
let productsUrl = "https://green-gnu-332746.hostingersite.com/api/v1/products";
let ACCESS_TOKEN = "Bearer " + localStorage.getItem("ACCESS_TOKEN");
getData();
if (products != null) {
  // products = JSON.parse(localStorage.products);
} else {
  products = [];
  if (document.getElementById("products")) {
    document.getElementById("products").innerHTML =
      '<h3 style="text-align: center; color:red; font-size:20px">لا توجد منتجات</h3>';
  }
}

// add item botton
function add_product() {
  let add_title = document.getElementById("add_title");
  let add_sn = document.getElementById("add_sn");
  let add_price = document.getElementById("add_price");
  let add_amount = document.getElementById("add_amount");
  let add_category = document.getElementById("add_category");
  let addAmount = parseInt(add_amount.value);

  // check if the item exist in the products
  let index = products.findIndex(
    (item) => item.title === add_title.value || item.sn === add_sn.value
  );
  if (index != -1) {
    // if the item is aready exist this lins add the amount and update the sum
    let StockElementId = `stock${index}`;
    let stockValue = document.getElementById(StockElementId).value;
    let updatedAmount = parseInt(stockValue) + parseInt(add_amount.value);
    document.getElementById(StockElementId).value = updatedAmount;
    // products[index]['price'] = parseInt(add_price.value);
    let titleId = "title" + index;
    let snId = "sn" + index;
    let categoryId = "category" + index;
    let stockId = "stock" + index;
    let priceyId = "price" + index;
    let saveId = "save" + index;
    let saveIconId = "saveIcon" + index;
    let checkIconId = "checkIcon" + index;

    let save = document.getElementById(saveId);
    let saveIcon = document.getElementById(saveIconId);
    let checkIcon = document.getElementById(checkIconId);

    saveIcon.style.display = "block";
    checkIcon.style.display = "none";
    save.classList.add("savepro");
    save.classList.remove("btn-update");
    // renderproducts()
  } else {
    // if the item dosn't exsit this lins create new one
    let item = {
      title: add_title.value,
      sn: add_sn.value,
      price: add_price.value,
      category: add_category.value,
      stock: add_amount.value,
    };
    updoadProduct(item);
    // getData()
  }
  async function updoadProduct(item) {
    const response = await fetch(productsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: ACCESS_TOKEN,
      },
      body: JSON.stringify(item),
    });
    if (response.status == 401) {
      window.location.href = "https://mosab.store/pages/login.html";
    }
    if (!response.ok) {
      errorMessage();
      return;
    } else {
      successMessage();
    }
    products.push(item);
    renderproducts();
  }

  // add the products data into html
}

function renderproducts() {
  HTMLtable = "";
  if (document.getElementById("products")) {
    HTMLtable = `    
        <thead>                    
            <tr>
                <th>المنتج</th>
                <th>sn</th>
                <th>التصنيف</th>
                <th>المخزون</th>
                <th>السعر</th>
                <th>----</th>
            </tr>
        </thead>`;
    for (i = 0; i < products.length; i++) {
      HTMLtable += `
                <tr>
                    <form id="updateProductForm${products[i]["id"]}">
                        <td>
                            <input class="text_intput text_input_small" id="title${i}" type="text" value="${products[i]["title"]}" name="title">
                        </td>

                        <td>
                            <input class="text_intput text_input_small  mr-t" id="sn${i}" type="number" value="${products[i]["sn"]}" name="sn">
                        </td>

                        <td>
                            <input class="text_intput text_input_small  mr-t" id="category${i}" type="text" value="${products[i]["category"]}" name="category">
                        </td>

                        <td>
                            <input class="text_intput number_input_small mr-t" id="stock${i}" type="number" value="${products[i]["stock"]}" name="stock">
                        </td>

                        <td>
                            <input class="text_intput number_input_small mr-t" type="number" id="price${i}" value="${products[i]["price"]}" name="price">
                        </td>

                        <td>
                            <button id="save${i}" class="text_intput text_input_small btn-pro btn-update" onclick="updateProductButton(${products[i]["id"]},${i})" name="update">
                            <span class="material-symbols-outlined icon_btn_Product">check</span>
                            </button>
                            <button class="text_intput text_input_small  btn-del btn-pro" onclick="deleteProductButton(${products[i]["id"]})" name="update">
                            <span class="material-symbols-outlined icon_btn_Product ">delete</span></button>
                        </td>
                    </form>
                </tr>`;
    }
    document.getElementById("products").innerHTML = HTMLtable;
  }
}

async function getData() {
  try {
    const response = await fetch(productsUrl, {
      headers: {
        Authorization: ACCESS_TOKEN,
      },
    }); // Add your `productsUrl` here
    if (response.status == 401) {
      window.location.href = "https://mosab.store/pages/login.html";
    }
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    products = data["data"];
    let HTMLtable = "";
    if (document.getElementById("products")) {
      HTMLtable = `
            <thead>
                <tr>
                    <th>المنتج</th>
                    <th>sn</th>
                    <th>التصنيف</th>
                    <th>المخزون</th>
                    <th>السعر</th>
                    <th>----</th>
                </tr>
            </thead>`;

      for (let i = 0; i < products.length; i++) {
        HTMLtable += `
                <tr>
                    <form id="updateProductForm${products[i]["id"]}">
                        <td>
                            <input class="text_intput text_input_small" id="title${i}" type="text" value="${products[i]["title"]}" name="title">
                        </td>

                        <td>
                            <input class="text_intput text_input_small  mr-t" id="sn${i}" type="number" value="${products[i]["sn"]}" name="sn">
                        </td>

                        <td>
                            <input class="text_intput text_input_small  mr-t" id="category${i}" type="text" value="${products[i]["category"]}" name="category">
                        </td>

                        <td>
                            <input class="text_intput number_input_small mr-t" id="stock${i}" type="number" value="${products[i]["stock"]}" name="stock">
                        </td>

                        <td>
                            <input class="text_intput number_input_small mr-t" type="number" id="price${i}" value="${products[i]["price"]}" name="price">
                        </td>

                        <td>
                            <button type="button" id="save${i}" class="text_intput number_input_small btn-pro btn-update" onclick="updateProductButton(${products[i]["id"]},${i})" name="update">
                                <span id="saveIcon${i}" style="display: none;" class="material-symbols-outlined icon_btn_Product">save</span>
                                <span id="checkIcon${i}" class="material-symbols-outlined icon_btn_Product">check</span>
                            </button>
                            <button class="text_intput number_input_small  btn-del btn-pro" onclick="deleteProductButton(${products[i]["id"]})" name="update">
                            <span class="material-symbols-outlined icon_btn_Product ">delete</span></button>
                        </td>
                    </form>
                </tr>`;
      }

      document.getElementById("products").innerHTML = HTMLtable;

      // Attach event listeners programmatically
    }
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}
async function updateProductButton(id, ind) {
  // let ind = id -1;
  const formId = `updateProductForm${id}`;
  const formEl = document.getElementById(formId);

  let title = "title" + ind;
  let sn = "sn" + ind;
  let stock = "stock" + ind;
  let price = "price" + ind;
  let category = "category" + ind;
  let save = "save" + ind;
  let saveIcon = "saveIcon" + ind;
  let checkIcon = "checkIcon" + ind;

  let url = productsUrl + "/" + id;
  let updatedProductData = {
    title: document.getElementById(title).value,
    sn: document.getElementById(sn).value,
    stock: document.getElementById(stock).value,
    price: document.getElementById(price).value,
    category: document.getElementById(category).value,
  };

  let response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: ACCESS_TOKEN,
    },
    body: JSON.stringify(updatedProductData),
  });
  if (response.status == 401) {
    window.location.href = "https://mosab.store/pages/login.html";
  }

  if (!response.ok) {
    errorMessage();
    return;
  } else {
    successMessage();
  }
  document.getElementById(save).classList.remove("savepro");
  document.getElementById(save).classList.add("btn-update");
  document.getElementById(saveIcon).style.display = "none";
  document.getElementById(checkIcon).style.display = "block";
}

async function deleteProductButton(id) {
  let url = productsUrl + "/" + id;
  let response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: ACCESS_TOKEN,
    },
  });
  if (response.status == 401) {
    window.location.href = "https://mosab.store/pages/login.html";
  }
  if (!response.ok) {
    errorMessage();
    return;
  } else {
    successMessage();
  }
  getData();
}
function errorMessage() {
  let errorMessage = `        
      <div class="error-message-box" id="erorr-message">
          <span>حدث خطأ:</span>
          <p>لم يتم حفظ التغييرات</p>
          <button type="button" class="" onclick="closcMessagErorr()">X</button>
      </div>`;

  document.getElementById("container").innerHTML += errorMessage;
}
function closcMessagErorr() {
  let errorMessage = document.getElementById("erorr-message");
  if (errorMessage) {
    errorMessage.remove(); // Removes the element from the DOM
  }
}
function successMessage() {
  let errorMessage = `        
      <div class="error-message-box success-message-box " id="success-message">
          <p>تم حفظ التغييرات</p>
          <button type="button" class="" onclick="closcSuccessMessage()">X</button>
      </div>`;

  document.getElementById("container").innerHTML += errorMessage;
}
function closcSuccessMessage() {
  let errorMessage = document.getElementById("success-message");
  if (errorMessage) {
    errorMessage.remove(); // Removes the element from the DOM
  }
}

function updata(element) {
  let prodoct = products[element];

  let getTitle = "title" + element;
  let title = document.getElementById(getTitle).value;
  products[element].title = title;

  let getStock = "stock" + element;
  let stock = document.getElementById(getStock).value;
  products[element].stock = stock;

  let getPrice = "price" + element;
  let price = document.getElementById(getPrice).value;
  products[element].price = price;

  localStorage.setItem("products", JSON.stringify(products));
  renderproducts();
}

//headers.append('Content-Type', 'text/json');
