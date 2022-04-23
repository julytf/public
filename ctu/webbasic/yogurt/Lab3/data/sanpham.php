<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Sản Phẩm</title>
    <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="images/favicon.ico">
    <?php include 'jsncss.php' ?>
    <script src="productData.json"></script>
    <script defer>
        function addCart(productCode) {//console.log('addCart');  
            let quantity = parseInt($('input[id='+productCode+']').value);

            if(typeof localStorage[productCode] === "undefined"){
                window.localStorage.setItem(productCode,quantity)
            } else {
                let currentQuantity = parseInt(window.localStorage[productCode]);
                let newQuantity = quantity + currentQuantity > 100 ? 100 : quantity + currentQuantity;
                window.localStorage.setItem(productCode, newQuantity);
            }

        }
    </script>
<body lang="vn-VN">
<!-- header-start -->
<?php include 'header.php' ?>
<!-- header-end -->
<main class="main--col-1">
    <section>
        <h1 class="section__header">Sản Phẩm Truyền Thống</h1>
        <div class="section__body">
            <article class="section__item">
                <figure>
                    <img src="images/sanpham/kiwi.jpg" alt="">
                </figure>
                <h2 class="article__title">Sữa Chua Vị Kiwi</h2>
                <p class="article__content">Hương vị thơm ngon của Kiwi xanh, nổi tiếng của đất nước New Zealand có trong Sữa chua vị Kiwi xanh đem đến một món ăn nghẹ Siêu ngon và tốt cho hệ tiêu hóa
                    <a href="#">Xem chi tiết</a>
                    <br>
                    <span class="article__content__button">
                        Số lượng
                        <input type="number" id="sp001" min="0" max="100" value="0" size="3">
                        <button onclick="addCart('sp001')">Đặt hàng</button>
                    </span>
                </p>
            </article>
            <article class="section__item">
                <figure>
                    <img src="images/sanpham/mango.jpg" alt="">
                </figure>
                <h2 class="article__title">Sữa Chua Vị Xoài</h2>
                <p class="article__content">Sữa chua xoài thích hợp cho mọi lứa tuổi, vì vậy hãy để cả gia đình quây quần bên nhau cùng thưởng thức món ăn thơm ngon, bổ dưỡng này.
                    <a href="#">Xem chi tiết</a>
                    <br>
                    <span class="article__content__button">
                        Số lượng
                        <input type="number" id="sp002" min="0" max="100" value="0" size="3">
                        <button onclick="addCart('sp002')">Đặt hàng</button>
                    </span>
                </p>
            </article>
            <article class="section__item">
                <figure>
                    <img src="images/sanpham/cantaloupe.jpg" alt="">
                </figure>
                <h2 class="article__title">Sữa Chua Vị Dưa Lưới</h2>
                <p class="article__content">Trong dưa lưới chứa rất nhiều vitamin C có tác dụng làm đẹp da hiệu quả. Phụ nữ ăn sinh tố dưa lưới thường xuyên sẽ có làn da min màng.
                    <a href="#">Xem chi tiết</a>
                    <br>
                    <span class="article__content__button">
                        Số lượng
                        <input type="number" id="sp003" min="0" max="100" value="0" size="3">
                        <button onclick="addCart('sp003')">Đặt hàng</button>
                    </span>
                </p>
            </article>
        </div>
    </section>
    <section>
        <h1 class="section__header">Sản Phẩm Mới</h1>
        <div class="section__body">
            <article class="section__item">
                <figure>
                    <img src="images/sanpham/blackberry.jpg" alt="">
                </figure>
                <h2 class="article__title">Sữa Chua Vị Mâm Xối</h2>
                <p class="article__content">Quả mâm xôi là loại quả ăn họ hoa hồng, có nguồn gốc từ châu Âu, Bắc Á và được trồng ở các vùng ôn đới trên toàn thế giới. Có nhiều loại, bao gồm đe, tím và vàng
                    <a href="#">Xem chi tiết</a>
                    <br>
                    <span class="article__content__button">
                        Số lượng
                        <input type="number" id="sp004" min="0" max="100" value="0" size="3">
                        <button onclick="addCart('sp004')">Đặt hàng</button>
                    </span>
                </p>
            </article>
            <article class="section__item">
                <figure>
                    <img src="images/sanpham/strawberry.jpg" alt="">
                </figure>
                <h2 class="article__title">Sữa Chua Vị Dâu Tây</h2>
                <p class="article__content">Dâu tây là loại cây thân thảo có thân ngắn và các chiếc là mọc gần nhau. Lá có nhiều gai, bề mặt lá có nhiều lông tơ và kích thước lá có thể khác nhau ở từn
                    <a href="#">Xem chi tiết</a>
                    <br>
                    <span class="article__content__button">
                        Số lượng
                        <input type="number" id="sp005" min="0" max="100" value="0" size="3">
                        <button onclick="addCart('sp005')">Đặt hàng</button>
                    </span>
                </p>
            </article>
            <article class="section__item">
                <figure>
                    <img src="images/sanpham/blueberry.jpg" alt="">
                </figure>
                <h2 class="article__title">Sữa Chua Vị Việt Quốc</h2>
                <p class="article__content">Quả việt quất chứa các dưỡng chất tốt cho sức khỏe như chất xơ, kali, dolate, vitamin C và vitamin B6 (Những chất hỗ trợn rất tốt cho sức khỏe của tim).
                    <a href="#">Xem chi tiết</a>
                    <br>
                    <span class="article__content__button">
                        Số lượng
                        <input type="number" id="sp006" min="0" max="100" value="0" size="3">
                        <button onclick="addCart('sp006')">Đặt hàng</button>
                    </span>
                </p>
            </article>
        </div>
    </section>
    <section>
        <h1 class="section__header">Sản Phẩm Trái Cây Miền Nhiệt Đới</h1>
        <div class="section__body">
            <article class="section__item">
                <figure>
                    <img src="images/sanpham/grapes.jpg" alt="">
                </figure>
                <h2 class="article__title">Sữa Chua Vị Bưởi</h2>
                <p class="article__content">Bưởi là một loại quả thuộc chi Cam chanh có nguồn gốc từ Đông Nam Á. Bưởi tiếng Anh gọi là Pomelo, tuy nhiên nhiều từ điển Việt Nam lại dịch thành grapefruit.
                    <a href="#">Xem chi tiết</a>
                    <br>
                    <span class="article__content__button">
                        Số lượng
                        <input type="number" id="sp007" min="0" max="100" value="0" size="3">
                        <button onclick="addCart('sp007')">Đặt hàng</button>
                    </span>
                </p>
            </article>
            <article class="section__item">
                <figure>
                    <img src="images/sanpham/green-apple.jpg" alt="">
                </figure>
                <h2 class="article__title">Sữa Chua Vị Táo Xanh</h2>
                <p class="article__content">Táo xanh có hàm lượng chất xơ cao giúp tăng cường quá trình trao đổi chất của cơ thể. Bên cạnh đó, chất xơ còn giúp quá trình giải độc gan và hệ tiêu hóa.
                    <a href="#">Xem chi tiết</a>
                    <br>
                    <span class="article__content__button">
                        Số lượng
                        <input type="number" id="sp008" min="0" max="100" value="0" size="3">
                        <button onclick="addCart('sp008')">Đặt hàng</button>
                    </span>
                </p>
            </article>
            <article class="section__item">
                <figure>
                    <img src="images/sanpham/pineapple.jpg" alt="">
                </figure>
                <h2 class="article__title">Sữa Chua Vị Dứa</h2>
                <p class="article__content">Dứa có các tên gọi khác nhau như là khóm, thơm, khớm, gai hoặc huyền nương. Đây là một loại quả nhiệt đới. Dứa là cây bản địa của các nước Nam Mỹ.
                    <a href="#">Xem chi tiết</a>
                    <br>
                    <span class="article__content__button">
                        Số lượng
                        <input type="number" id="sp009" min="0" max="100" value="0" size="3">
                        <button onclick="addCart('sp009')">Đặt hàng</button>
                    </span>
                </p>
            </article>
        </div>
    </section>
</main>
<!-- header-end -->
<?php include 'footer.php' ?>
<!-- header-start -->
</body>
</html>