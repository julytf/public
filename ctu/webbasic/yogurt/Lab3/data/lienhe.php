<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Liên Hệ</title>
    <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="images/favicon.ico">
    <?php include 'jsncss.php' ?>
<body lang="vn-VN">
<!-- header-start -->
<?php include 'header.php' ?>
<!-- header-end -->
<main class="main--col-1">
    <section>
        <h1 class="section__header">Liên Hệ</h1>
        <div class="section__body">
            <div class="icon--bg-green">
                <img class="check-in-icon" src="images/lienhe/check-in.png" alt="">
            </div>
            <p>
                <b>Địa chỉ: 0123, Tòa Nhà ABC, TP. Cần Thơ</b>
                Nếu bạn có góp ý, vui lòng liên hệ bằng thư điện tử hoặc sửa dụng biểu mẫu bên dưới. Xin cảm ơn.
            </p>
        </div>
    </section>
    <section>
        <h1>Góp ý</h1>
        <form action="" method="post" onsubmit="return frmValidate5(this)">
            <table class="mr-auto">
                <tr>
                    <td><label for="name">
                        <i class="fa-solid fa-user icon--bg-green"></i>
                        <!-- Họ Tên: -->
                    </label></td>
                    <td><input type="text" id="name" name="name" minlength="4" placeholder="Vui lòng nhập Họ tên của bạn" required></td>
                </tr>
                <tr>
                    <td><label for="email">
                        <i class="fa-solid fa-envelope icon--bg-green"></i>
                        <!-- Email: -->
                    </label></td>
                    <td><input type="text" id="email" name="email" pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}" placeholder="Vui lòng nhập địa chỉ email" required></td>
                </tr>
                <tr>
                    <td>
                        <i class="fa-solid fa-list icon--bg-green"></i>
                        <!-- Chủ đề -->
                    </td>
                    <td>
                        <select name="chude" id="" size="1">
                            <option value="">Về Sản Phẩm Dịch vụ</option>
                            <option value="">Về Ưu Đãi Thành Viên</option>
                            <option value="">Về Tin Tuyển Dụng</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label for="content">
                        <i class="fa-solid fa-note-sticky icon--bg-green"></i>
                        <!-- Nội dung: -->
                    </label></td>
                    <td><textarea name="content" id="content" cols="60" rows="7" minlength="10" placeholder="Nội dung cần liên hệ" required></textarea></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <input type="submit" value="Gửi">
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