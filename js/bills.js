let bills;
let billUrl = "https://green-gnu-332746.hostingersite.com/api/v1/bills";
let cartUrl = "https://green-gnu-332746.hostingersite.com/api/v1/carts";
ACCESS_TOKEN = "Bearer " + localStorage.getItem("ACCESS_TOKEN");

let targetBillId;
if (document.getElementById("bills")) {
  getBills();
  const checkbox = document.getElementById("showPaidBills");

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      renderBills();
    } else {
      renderBills();
    }
  });
}
async function saveBill() {
  if (cart.length <= 0) {
    alert("السلة فارغة");
    return;
  } else {
    let customers = document.getElementById("customers");
    let customerId = customers.options[customers.selectedIndex].value;
    let customerName = customers.options[customers.selectedIndex].text;
    let bill = {
      customer_id: customerId,
      overAll: document.getElementById("overAll").value,
    };
    const response = await fetch(billUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: ACCESS_TOKEN,
      },
      body: JSON.stringify(bill),
    });
    if (!response.ok) {
      errorMessage();
      return;
    } else {
      successMessage();
      sendWhatsappMessage();
    }
    if (response.status == 401) {
      window.location.href = "https://mosab.store/login";
    }
    const data = await response.json();
    const billId = data["id"];

    for (const item of cart) {
      const cartItem = {
        product_id: item["productId"],
        customer_id: customerId,
        bill_id: billId,
        title: item["title"],
        price: item["price"],
        amount: item["add_amount"],
        category: item["category"],
        sn: item["sn"],
      };
      try {
        const cartResponse = await fetch(cartUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: ACCESS_TOKEN,
          },
          body: JSON.stringify(cartItem),
        });
        if (cartResponse.status == 401) {
          window.location.href = "https://mosab.store/login";
        }

        if (!cartResponse.ok) {
          throw new Error(`HTTP error! status: ${cartResponse.status} `);
        }
      } catch (error) {
        console.error("Error:", error);
      }
      // update the stock in
    }
  }
  // cut the amount form stock
  localStorage.removeItem("cart");
  cart = [];
  if (document.getElementById("cart") && cart.length == 0) {
    document.getElementById("cart").innerHTML =
      '<h3 style="text-align: center; color:red; font-size:20px">لا توجد منتجات</h3>';
  }
}
// show the bills

async function getBills() {
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
  document.getElementById("bills").innerHTML = loading;
  const response = await fetch(billUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: ACCESS_TOKEN,
    },
  });
  if (response.status == 401) {
    window.location.href = "https://mosab.store/pages/login.html";
  }
  const data = await response.json();
  bills = data["data"];
  renderBills();
}

function renderBills() {
  checkbox = document.getElementById("showPaidBills");

  document.getElementById("bills").innerHTML = "";

  HTMLtable = `
    <thead>
        <tr>
            <th>العميل</th>
            <th>المجموع</th>
            <th>حالة الدفع</th>
        </tr>
    </thead>`;
  bills
    .slice()
    .reverse()
    .forEach((bill) => {
      if (!checkbox.checked && bill["paid"] == 1) return;
      HTMLtable += `
        <tr>
            <td><input type="text" class="text_intput text_input_small ${
              bill["customer"] == "العميل محذوف" ? "customer_deleted" : ""
            } " value="${bill["customer"]}" readonly></td>
            <td class="td_price">
                <input class="text_intput number_input_small mr-t ${
                  bill["customer"] == "العميل محذوف" ? "customer_deleted" : ""
                }" type="text" value="${bill["overAll"]}" readonly>
                <span>ريال</span>
            </td>
            <td>
            <button class="text_intput number_input_small mr-t ${
              bill["paid"] == 0 ? "btn-del" : "btn-update"
            } ${
        bill["customer"] == "العميل محذوف" ? "customer_deleted" : ""
      }" onclick="paymentUpdata(${bill["id"]},${bill["paid"]})">
                <span id="waiting${
                  bill["id"]
                }" class="material-symbols-outlined icon_btn_bill " style="display: none;">schedule</span>
                <span id="state${bill["id"]}" class="icon_btn_bill "> ${
        bill["paid"] == 0 ? "دفع" : "تم"
      }</span>
            </button>

            <button class="text_intput text_input_small  btn-del  btn-pro mr-t delete-bill-btn" onclick="areYouShur(${
              bill["id"]
            })" name="delete">
                            <span class="material-symbols-outlined icon_btn_Product mr-t">delete</span></button>
            </td>
            </tr>`;
      // <input class="text_intput text_input_small mr-t ${bill['paid'] == 0 ? 'btn-del' : 'btn-update'}" type="button" value="${bill['paid'] == 0 ? 'دفع': 'تم'}" onclick="paymentUpdata(${bill['id']},${bill['paid']})">
    });
  document.getElementById("bills").innerHTML += HTMLtable;
}
function areYouShur(id) {
  if (document.getElementById("areYouShur") != null) {
    document.getElementById("areYouShur").remove();
  }
  targetBillId = id;
  document.getElementById("bill-box").innerHTML += `
  <div class="areYouShur" id="areYouShur">
      <div>
          <p>هل أنت متأكد من حذف الفاتورة</p>
      </div>
      <div class="areYouShure-btns-box">
          <button class="text_intput number_input_small mr-t btn-del " onclick="deleteBill()">حذف</button>
          <button class="text_intput number_input_small mr-t btn-del " onclick="closeAreYouShurBox()">الغاء</button>
      </div>
  </div>
  `;
}
async function deleteBill() {
  let deletbillurl = billUrl + "/" + targetBillId;
  let response = await fetch(deletbillurl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: ACCESS_TOKEN,
    },
  });
  if (!response.ok) {
    errorMessage();
    return;
  } else {
    successMessage();
    getBills();
  }
  targetBillId = null;
  document.getElementById("areYouShur").remove();
}
function closeAreYouShurBox() {
  document.getElementById("areYouShur").remove();
}

function errorMessage() {
  if (document.getElementById("erorr-message") != null) {
    document.getElementById("erorr-message").remove();
  }
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
  if (document.getElementById("success-message") != null) {
    document.getElementById("success-message").remove();
  }
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
async function paymentUpdata(element, state) {
  let waitingIconId = `waiting${element}`;
  let stateId = `state${element}`;
  let loadingMessage = document.getElementById(waitingIconId);
  let loadingstate = document.getElementById(stateId);
  loadingMessage.style.display = "block"; // Show loading message
  loadingstate.style.display = "none"; // Show loading message

  let elementUrl = `${billUrl}/${element}`;
  let body = {
    paid: state == 0 ? 1 : 0,
  };
  const response = await fetch(elementUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: ACCESS_TOKEN,
    },
    body: JSON.stringify(body),
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
  getBills();
}

function sendWhatsappMessage() {
  console.log("first line");
  let isChecked = document.getElementById("whatsappCheckbox").checked;
  if (!isChecked) {
    console.log("!isChecked");
    return;
  }
  console.log("isChecked");
  let sumoverAll = document.getElementById("overAll").value;
  let wpTitle;
  let wpAmount;
  let wpPrice;
  let combain;
  let newline = "%0a";
  let spirater = "-------------------";
  let wpMessage =
    "*الفاتورة:*" + newline + "ـــــــــــــــــــــــــــــــــــــ";
  cart.forEach((item) => {
    wpTitle = item.title;
    wpAmount = item.add_amount;
    wpPrice = item.sum;
    combain = `
    ${newline}
    ${newline}
    ${newline}
    *${wpTitle}*
    ${newline}
    العدد:  ${wpAmount}
    ${newline}
    السعر:  ${wpPrice} ريال
    ${newline}
    ${spirater}
    ${newline}
    `;
    wpMessage += combain;
  });
  let finaladd = `
  
  ${newline}
  ${newline}
  ـــــــــــــــــــــــــــــــــــــ
  ${newline}
  المجموع:  ${sumoverAll} ريال
  `;
  wpMessage += finaladd;
  let customersSelect = document.getElementById("customers");
  let selectedOption =
    customersSelect.options[customersSelect.selectedIndex].value;

  let customerPhone =
    customers["data"].find((customer) => customer.id == selectedOption)
      ?.phone || "";
  window.open("https://wa.me/" + "+966" + customerPhone + "?text=" + wpMessage);
}
