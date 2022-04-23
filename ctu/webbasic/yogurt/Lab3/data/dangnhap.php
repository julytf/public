<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Đăng nhập</title>
    <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="images/favicon.ico">
    <?php include 'jsncss.php' ?>
<body lang="vn-VN">
<!-- header-start -->
<?php include 'header.php' ?>
<!-- header-end -->
<main class="main">
    <section>
        <h1>ĐĂNG NHẬP</h1>
        <form method="post" onsubmit="return frmValidate5(this)">
            <table class="mr-auto">
                <tr>
                    <td colspan="2">
                        <img style="width: 200px;" src="images/dangnhap/userlogin.png" alt="">
                    </td>
                </tr>
                <tr>
                    <td><label for="email">
                        <i class="fa-solid fa-envelope icon--bg-green"></i>
                        <!-- Email -->
                    </label></td>
                    <td><input type="email" id="email" name="email" pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}" placeholder="Vui lòng nhập email" required></td>
                </tr>
                <tr>
                    <td><label for="psw">
                        <i class="fa-solid fa-key icon--bg-green"></i>
                        <!-- Mật Khẩu -->
                    </label></td>
                    <td><input type="password" id="psw" name="psw" minlength="8" placeholder="Vui lòng nhập mật khẩu" required></td>
                </tr>
                <tr>
                    <td colspan="2">
                        Bạn quên <a href="#">Mật Khẩu?</a>
                        <input type="checkbox" id="remember" name="remember">
                        <label for="remember">
                            Ghi nhớ cho lần đăng nhập sau
                        </label>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <input type="submit" value="Đăng nhập">
                        <input type="reset" value="Hủy">
                    </td>
                </tr>
            </table>
        </form>
    </section>
</main>
<!-- header-end -->
<?php include 'footer.php' ?>
<!-- header-start -->
</body>
</html>