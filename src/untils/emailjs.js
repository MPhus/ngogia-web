const EMAILJS_URL = 'https://api.emailjs.com/api/v1.0/email/send'

const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;' }[c]))
const money = (n) => new Intl.NumberFormat().format(n)

export const sendEmail = async ({ to, subject, html }) => {
	const res = await fetch(EMAILJS_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
			template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
			user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
			template_params: { to_email: to, subject, html_content: html }
		})
	})
	if (!res.ok) throw new Error(`Gửi email thất bại: ${await res.text()}`)
	return { to: [to] }
}

const itemRows = (productList, size) => productList.map((item) => `
<tr><td style="padding:12px 0;border-bottom:1px solid #eee;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr>
    <td width="${size}" style="vertical-align:top;"><img src="${esc(item.thumb)}" alt="${esc(item.name)}" style="width:${size}px;border-radius:6px;border:1px solid #eee;" /></td>
    <td style="padding-left:12px;vertical-align:top;">
      <h3 style="margin:0 0 6px;font-size:16px;color:#222;">${esc(item.name)}</h3>
      <p style="margin:0;font-size:14px;color:#555;">Số lượng: <strong>${item.quantityInCart}</strong></p>
    </td>
  </tr></table>
</td></tr>`).join('')

const customerInfo = (info) => `
<p><strong>Họ tên:</strong> ${esc(info.fullname)}</p>
<p><strong>Email:</strong> ${esc(info.email)}</p>
<p><strong>Số điện thoại:</strong> ${esc(info.phone)}</p>
<p><strong>Địa chỉ:</strong> ${esc(info.ward)}, ${esc(info.district)}, ${esc(info.city)}</p>
<p><strong>Ghi chú:</strong> ${esc(info.note) || 'Không có'}</p>`

// Order with price: customer must click the link to confirm (was JWT link, now order id link)
export const sendConfirmOrderMail = ({ info, productList, totalPrice, tranportFee }, verifyUrl) => sendEmail({
	to: info.email,
	subject: 'Xác nhận đơn hàng',
	html: `
<div style="padding:20px;color:#000;font-family:Arial,sans-serif;">
  <h1>Đơn hàng của bạn đã đặt thành công</h1>
  <h2>Thông tin về đơn hàng</h2>
  <table width="100%" cellpadding="0" cellspacing="0">${itemRows(productList, 120)}</table>
  <h2>Giá trị đơn hàng: ${money(totalPrice * 1000)} VND</h2>
  <h3>Phí vận chuyển: ${money(tranportFee * 1000)} VND</h3>
  <h1>Tổng cộng: ${money((totalPrice + tranportFee) * 1000)} VND</h1>
  <a href="${verifyUrl}" style="background-color:#ca1a75;color:#fff;padding:20px;text-decoration:none;font-weight:700;display:inline-block;">Click vào đây để xác nhận đơn hàng của bạn</a>
  <p style="color:#888;">Liên kết có hiệu lực trong 5 phút.</p>
</div>`
})

// Order without price: customer receives acknowledgement, shop receives notification
export const sendNoPriceOrderMails = async ({ info, productList }) => {
	const customer = await sendEmail({
		to: info.email,
		subject: 'Xác nhận đơn hàng',
		html: `
<div style="background:#f6f6f6;padding:20px;font-family:Arial,sans-serif;">
  <h1 style="color:#d81b60;">Ngô Gia Sắc Ngọc</h1>
  ${customerInfo(info)}
  <p>✅ <strong>Đơn hàng của bạn đã được đặt thành công.</strong><br/>Chúng tôi sẽ sớm liên hệ và báo giá chi tiết cho bạn.</p>
  <h2>Thông tin đơn hàng</h2>
  <table width="100%" cellpadding="0" cellspacing="0">${itemRows(productList, 120)}</table>
  <p style="text-align:center;color:#888;">© ${new Date().getFullYear()} Ngô Gia Sắc Ngọc</p>
</div>`
	})
	await sendEmail({
		to: import.meta.env.VITE_EMAIL_SELL,
		subject: 'XÁC NHẬN ĐƠN HÀNG MỚI',
		html: `
<div style="background:#f2f4f7;padding:20px;font-family:Arial,sans-serif;">
  <h1 style="color:#5cb85c;">ĐƠN HÀNG MỚI</h1>
  <p>Có khách hàng vừa đặt hàng trên website</p>
  <h2>Thông tin khách hàng</h2>
  ${customerInfo(info)}
  <h2>Sản phẩm đã đặt</h2>
  <table width="100%" cellpadding="0" cellspacing="0">${itemRows(productList, 90)}</table>
</div>`
	})
	return customer
}
