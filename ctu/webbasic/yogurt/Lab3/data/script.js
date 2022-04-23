var $ = document.querySelector.bind(document);

var searchForm = $('#searchForm');
var searchInput = $('#searchInput');

searchForm.onsubmit = (e)=>{
	if (searchInput.value.length == 0) 
		return false;
}

function frmValidate5(form) {
	// console.log(form);
	
	let emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	if (form.querySelector('input[name="email"]') &&
		emailReg.test(form.querySelector('input[name="email"]').value) == false) 
			return false;

	if (form.querySelector('input[name="psw"]') && 
		form.querySelector('input[name="psw"]').value < 8) 
			return false;

	if (form.querySelector('input[name="psw2"]') && 
		form.querySelector('input[name="psw2"]').value < 8) 
			return false;

	if (form.querySelector('input[name="name"]') && 
		form.querySelector('input[name="name"]').value < 4) 
			return false;

	if (form.querySelector('input[name="content"]') && 
		form.querySelector('input[name="content"]').value < 10) 
			return false;

	return true;
}