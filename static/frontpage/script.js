class Helper {
	constructor() {
	  console.log("working");

	  const canvas = document.getElementById("canvas");
		function draw() {
			
			
			if (canvas.getContext) {
				canvas.width  = window.innerWidth;
				  canvas.height = window.innerHeight;
				const ctx = canvas.getContext("2d");
	
				ctx.fillRect(25, 25, 100, 100);
				ctx.clearRect(45, 45, 60, 60);
				ctx.strokeRect(50, 50, 50, 50);
			}
	
			window.requestAnimationFrame(draw);
		}
	window.requestAnimationFrame(draw);
	}
}


