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
                <a href="bills" class="nav-link  nav-selected">الفواتير</a>
                <a href="/" class="nav-link">البيع</a>
            </nav>
        </div>
        <div style="height: 9px;"></div>
        <div class="bodycon extra centerer">
            <div class="homeBill">
                <div class="otherBill_header">

                    <div>
                        <input type="checkbox" name="" id="showPaidBills">
                        <span>إظهار/إخفاء الفواتير المدفوعة:</span>
                    </div>
                </div>
                <hr>
                <div class="homeBill_content homeBill_content_bill extra" id="bill-box">
                    <div>
                        <table class="bill_table_titles bills_table" id="bills">

                        </table>
                    </div>
                    <!-- <div class="areYouShur" id="areYouShur">
                        <div>
                            <p>هل أنت متأكد من حذف الفاتورة</p>
                        </div>
                        <div class="areYouShure-btns-box">
                            <button class="text_intput number_input_small mr-t btn-del " onclick="deleteBill()">حذف</button>
                            <button class="text_intput number_input_small mr-t btn-del ">الغاء</button>
                        </div>
                    </div> -->
                </div>

                <hr>

            </div>
        </div>
    </div>
    <script src="./js/bills.js"></script>

</body>

</html>