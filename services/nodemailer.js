// gửi email

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.ethereal.email",
  port: 465,
  secure: true,
  auth: {
    user: "nhasachbinhminh09@gmail.com",
    pass: "nhasach!",
  },
});

const sendMail = async (to, subject, data) => {
  // send mail with defined transport object
  const mailOptions = {
    from: "nhasachbinhminh09@gmail.com",
    to: to,
    subject: subject,
    html: data,
  }

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error.message);
      return process.exit(1);
    }

    console.log('Message sent successfully!');
    // only needed when using pooled connections
    transporter.close();
  });
};

function formatPrice(x) {
  x += "";
  return x.length
    ? x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    : "";
}

const sendMailOrder = async (to, order, products) => {
  try {
    let tableProducts = order.products.map((e) => {
      let tmp = products.find((product) => {
        return product._id.toString() === e.productId._id.toString();
      });

      return `<tr>
        <td style="border: 1px solid black;">${e.productId.name}</td>
        <td style="border: 1px solid black;">${e.amount}</td>
        <td style="border: 1px solid black;">${formatPrice(
        tmp.priceDiscount ? tmp.priceDiscount : tmp.price
      )}₫</td>
      </tr>`;
    });

    function getTotalTmp() {
      return order.products.reduce((acc, e) => {
        let tmp = products.find((product) => {
          return product._id.toString() === e.productId._id.toString();
        });
        return (
          acc + (tmp.priceDiscount ? tmp.priceDiscount : tmp.price) * e.amount
        );
      }, 0);
    }

    const mailOptions = {
      from: "nhasachbinhminh09@gmail.com", // sender address
      to,
      subject: "Đơn hàng từ nhà sách Bình Minh",
      html: `<div style="font-size: 20px">
          <div style= "font-size: 24px; font-weight: 1000">
            Thông tin người nhận
          </div>
          <div>
            Họ tên: <strong>${order.name}</strong>
          </div>
          <div>
            Địa chỉ: <strong>${order.address}</strong>
          </div>
          <div>
            Số điện thoại: <strong>${order.phone}</strong>
          </div>
          <div>
            Ghi chú: <strong>${order.note}</strong>
          </div>
          <div style="font-size: 24px; font-weight: 1000">
            Thông tin đơn hàng
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <th style="border: 1px solid black;">Hàng hóa</th>
              <th style="border: 1px solid black;">SL</th>
              <th style="border: 1px solid black;">GIá</th>
            </tr>
            ${tableProducts.join("")}
          </table>
          <table>
          <tr>
              <td style="font-size: 20px; font-weight:600">Mã code</td>
              <td style="font-size: 20px; font-weight:600">${order._id}</td>
            </tr>
            <tr>
              <td style="font-size: 20px; font-weight:600">Tạm tính</td>
              <td style="font-size: 20px; font-weight:600">${formatPrice(getTotalTmp())}₫</td>
            </tr>
            <tr>
              <td style="font-size: 20px; font-weight:600">Phí ship</td>
              <td style="font-size: 20px; font-weight:600">${order.shipType === "fast" ? formatPrice(40000) : 0}₫</td>
            </tr>
            <tr>
              <td style="font-size: 20px; font-weight:600">Tổng tiền</td>
              <td style="font-size: 20px; font-weight:600">${formatPrice(order.total)}₫</td>
            </tr>
          </table>
          </>
        </div>`
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error.message);
        return process.exit(1);
      }

      console.log('Message sent successfully!');
      // only needed when using pooled connections
      transporter.close();
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendMail,
  sendMailOrder,
};
