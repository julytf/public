<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Đăng ký</title>
    <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="images/favicon.ico">
    <?php include 'jsncss.php' ?>
<body lang="vn-VN">
<!-- header-start -->
<?php include 'header.php' ?>
<!-- header-end -->
<main class="main">
    <section>
        <h1 class="section__header">ĐĂNG KÝ</h1>
        <form method="post" enctype="multipart/form-data" onsubmit="return frmValidate5(this)">
            <table class="mr-auto">
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
                    <td><label for="psw2">
                        <i class="fa-solid fa-key icon--bg-green"></i>
                        <!-- Nhập lại mật khẩu -->
                    </label></td>
                    <td><input type="password" id="psw2" name="psw2" minlength="8" placeholder="Vui lòng nhập mật khẩu" required></td>
                </tr>
                <tr>
                    <td>
                        <i class="fa-solid fa-users icon--bg-green"></i>
                        <!-- Cấp độ thành viên -->
                    </td>
                    <td>
                        <input type="radio" id="silverRadio" name="level" value="silver" checked>
                        <label for="silverRadio">Bạc</label>
                        <input type="radio" id="goldRadio" name="level" value="gold">
                        <label for="goldRadio">Vàng</label>
                        <input type="radio" id="platinumRadio" name="level" value="platinum">
                        <label for="platinumRadio">Bạch Kim</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <i class="fa-solid fa-id-badge icon--bg-green"></i>
                        <!-- Ảnh đại diện -->
                    </td>
                    <td><input type="file"></td>
                </tr>
                <tr>
                    <td colspan="2">
                        Thông qua việc tạo tài khoản, bạn đồng ý với <a href="#">Điều khoản & Quyền riêng tư của chúng tôi</a>. 
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <input type="submit" value="Đăng ký">
                        <input type="reset" value="Hủy">
                    </td>
                </tr>
            </table>
        </form>
    </section>
</main>
<!-- footer-end -->
<?php include 'footer.php' ?>
<!-- footer-start -->
</body>
</html>