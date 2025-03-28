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
                <a href="customers" class="nav-link  ">العملاء</a>
                <a href="prodoct" class="nav-link nav-selected">المنتجات</a>
                <a href="bills" class="nav-link ">الفواتير</a>
                <a href="/" class="nav-link">البيع</a>
            </nav>
        </div>
        <div style="height: 20px;"></div>
        <div class="bodycon pro_extra ">
            <div class="add_item">
                <h3 class="add_item_tag ">اضافة متنج</h3>
                <div class="input_line">
                    <label class="label" for="add_title">المنتج:</label>
                    <input class="text_intput" type="text" name="item_name" id="add_title">
                </div>
                <div class="input_line">
                    <label class="label" for="add_ns"> التسلسلي:</label>
                    <input class="text_intput" type="text" name="Serial_number" id="add_sn" ">
                </div>
                <div class=" input_line">
                    <label class="label" for="add_amount">الكمية:</label>
                    <input class="small_input text_intput" type="number" name="amount" id="add_amount" value="1">
                </div>
                <div class="input_line">
                    <label class="label" for="add_price">السعر:</label>
                    <input class="small_input text_intput" type="number" name="price" id="add_price" value="">
                </div>
                <div class="input_line">
                    <label class="label" for="add_category">التصنيف:</label>
                    <input class="small_input text_intput" type="text" name="category" id="add_category">
                </div>
                <div class="input_line">
                    <input onclick="add_product()" class="submit_button" type="button" name="" id=""
                        value="اضافة المنتج">
                </div>

            </div>
            <div class="homeBill">

                <hr>
                <div class="homeBill_content homeBill_content_products">
                    <div>
                        <table class="bill_table_titles" id="products">
                            <tr>
                                <th>المنتج</th>
                                <th>المخزون</th>
                                <th>السعر</th>
                                <th>----</th>
                            </tr>
                            <table class="bill_table">
                            </table>
                        </table>
                    </div>
                </div>

                <hr>

            </div>
        </div>
    </div>
    <script src="./js/prodocts.js"></script>

</body>

</html>