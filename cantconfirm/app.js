const $ = document.querySelector.bind(document);

var yesBtn = $('#yesBtn');
var noBtn = $('#noBtn');

yesBtn.onclick = () => {
	alert("u chose yes!")
}

noBtn.onclick = () => {
	alert("u chose no!")
}

yesBtn.onmouseover = () => {
	yesBtn.style.top = Math.random()*(window.innerHeight - 50) + 1;
	yesBtn.style.left = Math.random()*(window.innerWidth - 50) + 1;
}