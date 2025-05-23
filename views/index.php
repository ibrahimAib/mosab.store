<?php ?>
<!DOCTYPE html>
<html lang="en" dir="rtl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>بسطة مصعب</title>
    <link rel="icon" type="image/x-icon" href="./logo.png">
    <link rel="stylesheet" href="./css/general.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@100..900&display=swap" rel="stylesheet">
</head>

<body>
    <div class="container" id="container">
        <div class="header" dir="ltr">
            <div class="logo">
                <a href="/index.html">
                    <img src="./logo.png" alt="Logo" width="100px">
                </a>
            </div>
            <nav class="nav">
                <a href="customers" class="nav-link">العملاء</a>
                <a href="prodoct" class="nav-link ">المنتجات</a>
                <a href="bills" class="nav-link">الفواتير</a>
                <a href="/" class="nav-link nav-selected">البيع</a>
            </nav>
        </div>
        <img id="banner" src="./banner.jpg" width="100%" height="" alt="">
        <div id="pad" style="height: 9px;"></div>
        <div class="bodycon">
            <div class="add_item">
                <h3 class="add_item_tag">اضافة متنج</h3>
                <div class="input_line">
                    <label class="label" for="item_name">المنتج:</label>

                    <select class="text_intput" id="add_name" name="item_name" onchange="getProductInfoByName()">

                    </select>
                </div>
                <div class="input_line">
                    <label class="label" for="Serial_number"> SN:</label>
                    <input class="text_intput" type="text" name="Serial_number" id="add_sn" autofocus>
                </div>
                <div class="input_line">
                    <label class="label" for="amount">الكمية:</label>
                    <input class="text_intput" type="number" name="amount" id="add_amount" value="1" min="1">
                </div>
                <div class="input_line">
                    <label class="label" for="price">السعر:</label>
                    <input class="small_input text_intput" type="number" name="price" id="add_price" readonly>
                </div>
                <div class="input_line">
                    <input onclick="add_item()" class="submit_button" type="button" name="" id="" value="اضافة">
                </div>

            </div>
            <div class="homeBill">
                <div id="homeBill_header" class="homeBill_header">
                    <div>
                        <label class="customers" for="customers">العميل:</label>
                        <select class="text_intput" id="customers">

                        </select>
                    </div>
                    <div>

                    </div>
                    <input id="save_home" class="submit_button save_btn" type="button" value="حفظ" onclick="saveBill()">
                    <!-- From Uiverse.io by martinval9 -->
                    <div class="whatsapp-checkbox-box">
                        <span>ارسال الفاتورة:</span>
                        <label class="whatsapp-checkbox-label">
                            <input type="checkbox" id="whatsappCheckbox">
                            <div class="checkmark"></div>
                        </label>
                    </div>
                    <div>
                        <label class="customers" for="overAll">المجموع:</label>
                        <input type="number" name="overAll" class="text_intput" id="overAll" readonly>
                        <span>ريال</span>

                        </input>
                    </div>
                </div>
                <hr>
                <div class="homeBill_content">
                    <div>
                        <table class="bill_table_titles cart_table" id="cart">


                        </table>
                    </div>
                </div>

                <hr>
            </div>
        </div>
    </div>
    <script src="./js/prodocts.js"></script>
    <script src="./js/bills.js"></script>
    <script src="./js/cart.js"></script>
    <!--<script>alert(window.innerWidth)</script>-->

</body>

</html>