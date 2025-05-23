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
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0">

</head>

<body>
    <div class="container">
        <div class="header" dir="ltr">
            <div class="logo">
                <a href="/index.html">
                    <img src="./logo.png" alt="Logo" width="100px">
                </a>
            </div>
            <nav class="nav">
                <a href="customers" class="nav-link  nav-selected">العملاء</a>
                <a href="prodoct" class="nav-link ">المنتجات</a>
                <a href="bills" class="nav-link ">الفواتير</a>
                <a href="/" class="nav-link">البيع</a>
            </nav>
        </div>
        <div style="height: 20px;"></div>
        <div class="bodycon pro_extra ">
            <div class="add_item">
                <h3 class="add_item_tag ">اضافة عميل</h3>
                <div class="input_line">
                    <label class="label" for="add_name">الإسم:</label>
                    <input class="text_intput" type="text" name="item_name" id="add_name">
                </div>
                <div class="input_line">
                    <label class="label" for="add_ns">رقم الهاتف</label>
                    <input class="text_intput" type="text" name="Serial_number" id="add_phone" >
                </div>
                
                <div class="input_line">
                    <input onclick="add_product()" class="submit_button" type="button" name="" id=""
                        value="اضافة">
                </div>

            </div>
            <div class="homeBill">

                <hr>
                <div class="homeBill_content homeBill_content_customers">
                    <div>
                        <table class="bill_table_titles customers_table" id="customers">

                            <table class="bill_table">
                            </table>
                        </table>
                    </div>
                </div>

                <hr>

            </div>
        </div>
    </div>
    <script src="./js/customer.js"></script>

</body>

</html>