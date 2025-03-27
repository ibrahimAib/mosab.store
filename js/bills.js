let bills;
let billUrl = "https://green-gnu-332746.hostingersite.com/api/v1/bills";
let cartUrl = "https://green-gnu-332746.hostingersite.com/api/v1/carts";
ACCESS_TOKEN = "Bearer " + localStorage.getItem("ACCESS_TOKEN");

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
    if (response.status == 401) {
      window.location.href = "https://mosab.store/pages/login.html";
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
        if (response.status == 401) {
          window.location.href = "https://mosab.store/pages/login.html";
        }

        if (!cartResponse.ok) {
          throw new Error(`HTTP error! status: ${cartResponse.status}`);
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
      if (!checkbox.checked & (bill["paid"] == 1)) return;
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
            </td>
            </tr>`;
      // <input class="text_intput text_input_small mr-t ${bill['paid'] == 0 ? 'btn-del' : 'btn-update'}" type="button" value="${bill['paid'] == 0 ? 'دفع': 'تم'}" onclick="paymentUpdata(${bill['id']},${bill['paid']})">
    });
  document.getElementById("bills").innerHTML += HTMLtable;
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
  getBills();
}
let customers = [
  {
    id: 0,
    name: "جدي",
  },
  {
    id: 1,
    name: "جده",
  },
  {
    id: 2,
    name: "تركي",
  },
  {
    id: 3,
    name: "نسيبة",
  },
  {
    id: 4,
    name: "ساره",
  },
  {
    id: 5,
    name: "اسية",
  },
  {
    id: 6,
    name: "افنان",
  },
  {
    id: 7,
    name: "منيرة",
  },
  {
    id: 8,
    name: "رزان",
  },
  {
    id: 9,
    name: "ابراهيم",
  },
  {
    id: 10,
    name: "ايلاف",
  },
  {
    id: 11,
    name: "سما",
  },
  {
    id: 12,
    name: "ناصر",
  },
];
