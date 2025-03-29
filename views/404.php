<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 Not Found</title>
    <style>
        :root {
            --primary: #ffc107;
            --secondary: #ff5622;
            --accent: #38803a;
            --backgroundc: #fff8e1;
            --dbackgroundc: #faeab7;
            --textcolor: #4e342e;
        }

        body {
            background-color: var(--backgroundc);
            color: var(--textcolor);
            text-align: center;
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .container {
            background-color: var(--dbackgroundc);
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            font-size: 80px;
            margin: 0;
            color: var(--primary);
        }

        p {
            font-size: 20px;
            margin: 10px 0;
        }

        a {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: var(--secondary);
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 18px;
            transition: background 0.3s;
        }

        a:hover {
            background-color: var(--accent);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>404</h1>
        <p>عذرًا! الصفحة التي تبحث عنها غير موجودة.</p>
        <a href="/">العودة إلى الصفحة الرئيسية</a>
    </div>
</body>
</html>
