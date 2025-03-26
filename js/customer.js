let customers;
let customerUrl = "https://green-gnu-332746.hostingersite.com/api/v1/customers";
let ACCESS_TOKEN = "Bearer " + localStorage.getItem("ACCESS_TOKEN");

getData();
if (customers != null) {
  // customer = JSON.parse(localStorage.customer);
} else {
  customers = [];
  if (document.getElementById("customer")) {
    document.getElementById("customer").innerHTML =
      '<h3 style="text-align: center; color:red; font-size:20px">لا توجد منتجات</h3>';
  }
}

// add item botton
function add_product() {
  let add_name = document.getElementById("add_name");
  let add_phone = document.getElementById("add_phone");

  // check if the item exist in the customer
  let index = customers.findIndex(
    (item) => item.name === add_name.value || item.phone === add_phone.value
  );
  if (index != -1) {
    // if the item is aready exist this lins add the amount and update the sum
    let nameId = "name" + index;
    let phoneId = "phone" + index;
    let saveId = "save" + index;
    let saveIconId = "saveIcon" + index;
    let checkIconId = "checkIcon" + index;

    let name = document.getElementById(nameId);
    let phone = document.getElementById(phoneId);
    let save = document.getElementById(saveId);
    let saveIcon = document.getElementById(saveIconId);
    let checkIcon = document.getElementById(checkIconId);

    saveIcon.style.display = "block";
    checkIcon.style.display = "none";
    name.classList.add("redOutLine");
    phone.classList.add("redOutLine");
  } else {
    // if the item dosn't exsit this lins create new one
    item = {
      name: add_name.value,
      phone: add_phone.value,
    };
    updoadcustomer(item);
    customers.push(item);
    rendercustomer();
  }
  async function updoadcustomer(item) {
    const response = await fetch(customerUrl, {
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
  }

  // add the customer data into html
}

function rendercustomer() {
  HTMLtable = "";
  if (document.getElementById("customers")) {
    HTMLtable = ` 
        <thead>                       
            <tr>
                <th>الاسم</th>
                <th>الهاتف</th>
                <th>----</th>
            </tr>
        </thead>`;
    for (i = 0; i < customers.length; i++) {
      HTMLtable += `
                <tr>
                    <form id="updateCustomerForm${customers[i]["id"]}">
                        <td>
                            <input class="text_intput " id="name${i}" type="text" value="${customers[i]["name"]}" name="name">
                        </td>

                        <td>
                            <input class="text_intput  mr-t" id="phone${i}" type="number" value="${customers[i]["phone"]}" name="phone">
                        </td>


                        <td>
                            <button id="save${i}" class="text_intput text_input_small btn-pro btn-update" onclick="updateCustomerButton(${customers[i]["id"]},${i})" name="update">
                            <span class="material-symbols-outlined icon_btn_Product">check</span>
                            </button>
                            <button class="text_intput text_input_small  btn-del btn-pro" onclick="deleteProductButton(${customers[i]["id"]})" name="update">
                            <span class="material-symbols-outlined icon_btn_Product ">delete</span></button>
                        </td>
                    </form>
                </tr>`;
    }
    document.getElementById("customers").innerHTML = HTMLtable;
  }
}

async function getData() {

    let loading = `
        <div class="dot-spinner">
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
            <div class="dot-spinner__dot"></div>
        </div>`;
    document.getElementById("customers").innerHTML = loading;
  try {
    const response = await fetch(customerUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ACCESS_TOKEN,
      },
    }); // Add your `customerUrl` here
    if (response.status == 401) {
      window.location.href = "https://mosab.store/pages/login.html";
    }
    const data = await response.json();
    if (response.status == 401) {
      window.location.href = "https://mosab.store/pages/login.html";
    }
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    customers = data["data"];
    let HTMLtable = "";
    if (document.getElementById("customers")) {
      HTMLtable = `
            <thead>
                <tr>
                    <th>الاسم</th>
                    <th>الجوال</th>
                    <th>----</th>
                </tr>
            </thead>`;
      for (let i = 0; i < customers.length; i++) {
        HTMLtable += `
                <tr>
                    <form id="updateCustomerForm${customers[i]["id"]}">
                        <td>
                            <input class="text_intput text_input_small" id="name${i}" type="text" value="${customers[i]["name"]}" name="name">
                        </td>

                        <td>
                            <input class="text_intput text_input_small mr-t" id="phone${i}" type="number" value="${customers[i]["phone"]}" name="phone">
                        </td>


                        <td>
                            <button id="save${i}" class="text_intput text_input_small btn-pro btn-update" onclick="updateCustomerButton(${customers[i]["id"]},${i})" name="update">
                                <span id="saveIcon${i}" style="display: none;" class="material-symbols-outlined icon_btn_Product">save</span>
                                <span id="checkIcon${i}" class="material-symbols-outlined icon_btn_Product">check</span>
                            </button>
                            <button class="text_intput text_input_small  btn-del btn-pro" onclick="deleteProductButton(${customers[i]["id"]})" name="update">
                            <span class="material-symbols-outlined icon_btn_Product ">delete</span></button>
                        </td>
                    </form>
                </tr>`;
      }

      document.getElementById("customers").innerHTML = HTMLtable;

      // Attach event listeners programmatically
    }
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}
async function updateCustomerButton(id, ind) {
  // let ind = id -1;
  const formId = `updateCustomerForm${id}`;
  const formEl = document.getElementById(formId);

  let name = "name" + ind;
  let phone = "phone" + ind;
  let save = "save" + ind;
  let saveIcon = "saveIcon" + ind;
  let checkIcon = "checkIcon" + ind;
  let url = customerUrl + "/" + id;

  let updatedProductData = {
    name: document.getElementById(name).value,
    phone: document.getElementById(phone).value,
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
  document.getElementById(save).classList.remove("savepro");
  document.getElementById(save).classList.add("btn-update");
  document.getElementById(saveIcon).style.display = "none";
  document.getElementById(checkIcon).style.display = "block";
}
async function deleteProductButton(id) {
  let url = customerUrl + "/" + id;
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: ACCESS_TOKEN,
    },
  }).then(getData);
  if (response.status == 401) {
    window.location.href = "https://mosab.store/pages/login.html";
  }
}

function updata(element) {
  let customer = customers[element];

  let getName = "name" + element;
  let name = document.getElementById(getName).value;
  customers[element].name = name;

  let getPhone = "phone" + element;
  let phone = document.getElementById(getPhone).value;
  customers[element].phone = phone;

  localStorage.setItem("customer", JSON.stringify(customer));
  rendercustomer();
}

//headers.append('Content-Type', 'text/json');
