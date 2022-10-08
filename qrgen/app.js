const $ = document.querySelector.bind(document)

const createBtn = $("#createBtn")
const contentInput = $("#contentInput")
const contentSpan = $("#content")
const qrcode = new QRCode($("#qrcode"))
const defaultContent = window.location.href

function makeCode(content) {
  content = content || defaultContent
  qrcode.makeCode(content)
  contentSpan.textContent = content
}

createBtn.onclick = contentInput.onblur = () => {makeCode(contentInput.value)}

makeCode()