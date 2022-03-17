document.addEventListener("DOMContentLoaded",()=>{
	const $ = document.querySelector.bind(document);
	const $$ = document.querySelectorAll.bind(document); 

	const colors = ["#95C170","#269DB2","#603CA5","#D12C2F","#F98328","#FAD902","#F78B9E","#cbcac5"];

	var	pieces;
	var	labels;
	const spinBtn = $("#spin_btn");
	const incBtn = $("#inc");
	const decBtn = $("#dec");

	// console.log(pieces) ;

	function render() {
		pieces = $$(".piece");
		labels = $$(".piece .label");

		deg = 360/(pieces.length);

		for (var i = 0; i < pieces.length; i++) {
			pieces[i].style.transform = "rotate(" + i*deg + "deg)";
			labels[i].style.background = colors[i%colors.length];
			console.log(pieces[i], colors[i%colors.length])
		}
		pieces[pieces.length-1].style.transform = "rotate(" + -deg + "deg)";
	}

	spinBtn.onclick = ()=>{
		result = Math.round(Math.random()*360) + 360*5;

		animate = $("#wheel").animate([
		  // keyframes
		  { transform: "rotate(" + result + "deg)" }
		], {
		  // timing options
		  duration: 5000,
		  // iterations: Infinity,
		  easing: "ease-in-out",
		});

		animate.onfinish = ()=>{
		  	wheel.style.transform = "rotate(" + result%360 + "deg)";
		  }
		// animate.pause();
	}

	incBtn.onclick = ()=>{
		console.log(1);
		if(wheel.dataset.quantity >= 8)
			return;
		quantity = ++wheel.dataset.quantity;
		//create label
		aLabel = document.createElement("div");
		aLabel.className = "label";
		//create piece
		aPiece = document.createElement("div");
		aPiece.className = "piece";
		aPiece.append(aLabel);
		//prepend to wheel
		wheel.prepend(aPiece);
		render();
	}

	decBtn.onclick = ()=>{
		if(wheel.dataset.quantity <= 4)
			return;
		quantity = --wheel.dataset.quantity;
		//remove a piece
		pieces[0].remove();
		render();
	}

	render();

})