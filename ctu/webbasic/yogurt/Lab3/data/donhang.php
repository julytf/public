<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Sản Phẩm</title>
    <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="images/favicon.ico">
    <?php include 'jsncss.php' ?>
    <script src="productData.json"></script>
</head>
<body lang="vn-VN">
<!-- header-start -->
<?php include 'header.php' ?>
<!-- header-end -->
<main class="main--col-1">
    <section>
        <h1 class="section__header">CHI TIẾT ĐƠN HÀNG</h1>
        <table border="1px" width="100%">
            <thead>
                <tr>
                    <th>Hình SP</th>
                    <th>Tên SP</th>
                    <th>Số Lượng</th>
                    <th>Giá</th>
                    <th>Thành Tiền</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <!-- <tr testing id="sp002">
                    <td class="text-center">
                        <img src="images/sanpham/blackberry.jpg" class="w-100" alt="">
                    </td>
                    <td>
                        Sữa Chua Vị Dưa Lưới
                    </td>
                    <td class="text-right">
                        4
                    </td>
                    <td class="text-right">
                        22.000đ
                    </td>
                    <td class="text-right">
                        92.000đ
                    </td>
                    <td class="text-center">
                        <div onclick="removeCart('sp002')">
                            <i class="fa-solid fa-trash-can icon--bg-green icon--pink"></i>
                        </div>
                    </td>
                </tr> -->
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="6">
                        Tổng thành tiền (A) = <span id="totalPreTax">0</span> đ
                    </td>
                </tr>
                    <td colspan="6">
                        Chiết Khấu (B) = 0.1 x A = <span id="discount">0</span> đ
                    </td>
                </tr>
                    <td colspan="6">
                        Thuế (C) = 10% x (A - B) = <span id="tax">0</span> đ
                    </td>
                </tr>
                    <td colspan="6">
                        Tổng Đơn Hàng = A - B + C = <span id="total">0</span> đ
                    </td>
                </tr>
                    <td colspan="6" class="text-center">
                        <button>Xác Nhận Đơn Hàng</button>
                    </td>
                </tr>
            </tfoot>
        </table>
    </section>
</main>
<!-- header-end -->
<?php include 'footer.php' ?>
<!-- header-start -->
    <script type="text/javascript" defer>
        var query = document.querySelector.bind(document);

        var tbody = query('tbody');

        let totalPreTaxSpan = query('#totalPreTax')
        let discountSpan = query('#discount')
        let taxSpan = query('#tax')
        let totalSpan = query('#total')

        render() 

        window.onstorage = () => {
            render();
        };

        

        function render() {
            let totalPreTax = 0

            tbody.innerHTML = ''
            for (var i = 1; i <= 99; i++) {
                productCode = 'sp' + i.toString().padStart(3, '0')
                orderNumber= localStorage.getItem(productCode)

                if (!orderNumber || orderNumber == '0')
                    continue;

                item = itemList[productCode]
                // console.log(item, orderNumber)
                photo = item.photo
                name = item.name 
                price = item.price

                let tr = document.createElement('tr')
                tr.id = productCode


                tr.innerHTML = `<tr id="${productCode}">
                        <td class="text-center">
                            <img src="${photo}" class="w-100" alt="">
                        </td>
                        <td>
                            ${name}
                        </td>
                        <td class="text-right">
                            ${orderNumber}
                        </td>
                        <td class="text-right">
                            ${price}đ
                        </td>
                        <td class="text-right">
                            ${price*orderNumber}đ
                        </td>
                        <td class="text-center">
                            <div onclick="removeCart(this)" data-code="${productCode}">
                                <i data-code="${productCode}" class="fa-solid fa-trash-can icon--bg-green icon--pink"></i>
                            </div>
                        </td>
                    </tr>`

                tbody.append(tr)
                
                totalPreTax += price*orderNumber
             } 

            totalPreTaxSpan.innerHTML = totalPreTax
            discount = getDiscountRate()*totalPreTax
            discountSpan.innerHTML = discount
            tax = 0.1*(totalPreTax - discount)
            taxSpan.innerHTML = tax
            total = totalPreTax - discount + tax
            totalSpan.innerHTML = total
        }

        function removeCart(btn) {
// console.log(btn.dataset.code)
            productCode = btn.dataset.code
            orderNumber = window.localStorage.getItem(productCode)

            if (!orderNumber || orderNumber == '0')
                return;

            window.localStorage.setItem(productCode, 0)

            render()
        }

        function getDiscountRate() {
            var d = new Date();
            //lấy ngày hiện tại của máy tính
            var weekday = d.getDay();
            //lấy ngày trong tuần
            var totalMins = d.getHours()*60+d.getMinutes();
            //đổi thời gian hiện tại ra số phút tương đối trong ngày
            if(weekday >= 1 && weekday <= 3 && ((totalMins >= 420 && totalMins <= 660)||(totalMins >= 780 && totalMins <= 1020)))
                return 0.1;
            return 0;
        } 
    </script>
</body>
</html>