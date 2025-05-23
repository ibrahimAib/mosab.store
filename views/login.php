<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تسجيل الدخول</title>
    <link rel="icon" type="image/x-icon" href="./logo.png">
    <link rel="stylesheet" href="./css/general.css"> <!-- Link to your CSS file -->
    <meta name="csrf-token" content="{{ csrf_token() }}">


</head>

<body>
    <div class="login-page">
        <div class="login-box">
            <h2>تسجيل الدخول</h2>
            <form class="login-form">
                <div class="form-group">
                    <label for="email">البريد الإلكتروني</label>
                    <input type="email" id="email" name="email">
                </div>
                <div class="form-group">
                    <label for="password">كلمة المرور</label>
                    <input type="password" id="password" name="password">
                </div>
                <input type="button" onclick="login()" class="login-submit" value="دخول">
            </form>
            <p class="signup-link">ليس لديك حساب؟ <a href="/signup.html">أنشئ حسابًا</a></p>
        </div>
    </div>
    <script>
        async function login() {
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            let url = 'https://green-gnu-332746.hostingersite.com/api/login';

            const responce = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });


            const data = await responce.json();

            let NEW_ACCESS_TOKEN = data['token']

            localStorage.setItem('ACCESS_TOKEN', NEW_ACCESS_TOKEN)
            if (responce.ok) {
                window.location.href = "https://mosab.store";

            }
        }
    </script>
</body>

</html>