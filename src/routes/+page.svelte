<script lang="ts">
    import './fonts.css';
	import { onMount } from "svelte";
	import NavbarRad from './NavbarRad.svelte';
	import { presetCards, shuffle } from './recipes/components/imgData.js';
	const randCards = shuffle(presetCards).slice(0, 6);
    let canvasElement: HTMLCanvasElement
	let canvasElement2: HTMLCanvasElement
	let worldmapElement: HTMLImageElement
	let innerWidth = 0
    let innerHeight = 0
    let mapContainer: HTMLDivElement
	let ctx, ctx2;
	let drewRecently = false;
	let dotcoords = [];
	let star = "⭐";
    onMount(async () => {
		
		while (!worldmapElement.complete || worldmapElement.naturalHeight === 0) {await sleep(100)};
		canvasElement2.addEventListener('mousemove', (e) => {
			const l = dotcoords.length;
			ctx2.fillStyle = 'red';
			let hovering = false;
			for (let i = 0; i < l; i++) {
				const x = dotcoords[i][0], y = dotcoords[i][1];
				if (Math.abs(x - e.offsetX) < 30 && Math.abs(y - e.offsetY) < 30) {
					window.requestAnimationFrame(() => {
						drawHover(x, y, 2, 1, 5);
					});
					hovering = true;
				} else {
					ctx2.clearRect(x - 5, y - 5, 10, 10);
				}
			}

			
			if (hovering) {
				canvasElement2.style.cursor = "pointer";
			} else {
				canvasElement2.style.cursor = "default";
			}
		});

		function drawHover(x, y, radius, step, finalRadius) {

			ctx2.beginPath();
			ctx2.arc(x,y, radius, 0, 2*Math.PI); // fill in the pixel at (10,10)
			ctx2.fill();

			if (radius !== finalRadius) {
				window.requestAnimationFrame(() => {
					drawHover(x, y, radius + step, step, finalRadius);
				});
			}
		}

		// canvasElement2.addEventListener('mousemove', (e) => {
		// 	const x = e.offsetX, y = e.offsetY;
		// 	let grd = ctx.createRadialGradient(x, y, 0, x, y, 100);
		// 	grd.addColorStop(0, 'rgba(255,0,0,.5)');
		// 	grd.addColorStop(1, "rgba(0,0,0,0)");
		// 	ctx.fillStyle = grd;
		// 	ctx.fillRect(x-100, y-100, 300, 300);
		// });

		const worldMapAspectRatio = worldmapElement.naturalHeight / worldmapElement.naturalWidth;
		
		
		// get canvas context
		ctx = canvasElement.getContext("2d")
		ctx2 = canvasElement2.getContext("2d")
		
		new ResizeObserver(draw).observe(mapContainer);
		
		async function draw() {
			if (drewRecently) return;
			drewRecently = true;
			dotcoords = [];
			// draw line
			canvasElement.width = Number(mapContainer.clientWidth);
			canvasElement.height = Number(mapContainer.clientWidth * worldMapAspectRatio);
			canvasElement2.width = Number(mapContainer.clientWidth);
			canvasElement2.height = Number(mapContainer.clientWidth * worldMapAspectRatio);
			
			ctx.drawImage(worldmapElement, 0, 0, canvasElement.width, canvasElement.height);
			let maxDots = 200;
			for (let i = 0; i < maxDots; i++) {
				const x = generateRandom(0,canvasElement.width);
				const y = generateRandom(0,canvasElement.height);
				let data = ctx.getImageData(x, y, 1, 1).data;
				//var rgb = [ data[0], data[1], data[2] ];
				if ((data[0] === 0 && data[1] === 0 && data[2] === 0)) {
					maxDots++;
					continue;
				}

				ctx.fillStyle = 'red';
				ctx.beginPath();
				ctx.arc(x,y, 1.5, 0, 2*Math.PI); // fill in the pixel at (10,10)
				ctx.fill();
				dotcoords.push([x, y]);
			}

			await sleep(75);
			drewRecently = false;

			
		}
	});
	

	function generateRandom(min = 0, max = 100) {
		let difference = max - min;
		let rand = Math.random();
		rand = Math.floor( rand * difference);
		rand = rand + min;
		return rand;
	}

	/** A simple sleep function. Obviously, only call this from async functions. */
	function sleep(milli) {
		return new Promise(resolve => {
			setTimeout(() => { resolve(null) }, milli);
		});
	}	

</script>



<h1 style="font-family: Avenir-Book; font-size: 30px;" class="" id="motto">Discover traditional cuisines from all over the world</h1>


<NavbarRad></NavbarRad>

<img bind:this={worldmapElement} id="worldmap" src="frontpage/worldmap.svg" style="display:none;">
<div class="sideBySideCardContainer">
	<div class="sectionCard sideBySide" id="mapContainer" bind:this={mapContainer}>
		<canvas id="canvas" bind:this={canvasElement} width="100%" height="100%"></canvas>
		<canvas id="canvas2" bind:this={canvasElement2} width="100%" height="100%"></canvas>
		<h1 style="font-family: Avenir-Black; width: 100%; margin-top: 15px; font-size: 30px;" class="centeredBitch" id="maphelp">Select a location to find regional dishes <b style="font-size: 30px">&#x2934;</b></h1>
	</div>
	<div class="sectionCard sideBySide" id="foodContainer">
		<div id="hotdishes" class="centeredBitch"><span>HOT DISHES</span></div>
		<div class="sideBySideCardContainer"  id="actfoodContainer">
			{#each randCards as {name, url, stars, keyword, descr, href}}
				<a href={href}>
					<div class="foodBox">
						<img src={url} alt={name} >
						<h4>{name}</h4>
						<span class="stars">{star.repeat(stars)}</span>
					</div>
				</a>
			{/each}
		  </div>
	</div>
</div>

<svelte:window bind:innerWidth bind:innerHeight />

<style>
	:global(html) {
		width: 100%;
		overflow-x: hidden; 
	}

	:global(body) {
		padding-top: 100px;
		width: 100%;
		overflow-x: hidden; /* Without this, the tooltip will cause horizontal scroll bar and jump downwards on mouseleave */
		margin: 0;
		width: 100vw;
		background-size: 100vw;
		text-align: center;
	}

	

	@media screen and (max-width: 1175px) {
		#mapContainer {
			width: 100% !important;
			padding: 0;
			margin: 0;
		}

		main {
			width: 100%;
		}

		#maphelp {
			font-size: 20px !important;
		}

		#hotdishes {
			margin-top: 100px;
		}

		.sectionCard.sideBySide {
			margin-left: 0 !important;
			margin-right: 0 !important;
		}
	}


	#motto {
		width: 100%;
		margin-bottom:50px;
		padding-left: 15px;
		padding-right: 15px;
	}
	.row {
		color: blue;
	}

	#actfoodContainer {
		width: 100%;
		margin: 0 auto;
	}
	#foodContainer {
		max-width: 500px;
		padding: 0;
		padding-top: 0px;
		text-align: center;
	}

	.stars {
        font-size: 1rem;
        margin: 0;
        position: 'relative';
        top: -15px;
    }
	
	.foodBox>img {
		max-height: 120px !important;
		border-radius: 8px;
		height: 100px;
		margin: 0 auto;
		object-fit: cover;
	}
	.foodBox>h4 {
		position: absolute;
		text-align: center;
		left: 0%;
    	bottom: 5px;
		width: 100%;
		font-size: 20px;
		color: #000000;
		transform: translateY(-8px)
	}

	.foodBox { position: relative; display: inline-block;
		width: 200px;
		height: 175px;
		border-radius: 9px;
		background-color: rgb(255, 255, 255);
		margin-top: 15px;
		margin-left: 7px;
		margin-right: 7px;
		padding: 10px;text-align: center;
		transition: ease 0.1s;
		cursor: pointer;
		box-shadow: 2px 5px 5px rgb(153, 153, 153);
	}

	.foodBox:hover {

	}

	.foodBox:hover:not(:active) {
		transform: scale(1.07);
	}

	#mapContainer {
		position: relative;
		max-width: 1200px; 
		width: 60%;
		height: fit-content;
		padding: 0;
	}

	#canvas, #canvas2 {
		/* background: url('frontpage/worldmap.svg');
		background-size: 100%;
		background-repeat: no-repeat; */
		margin: 20px;
	
	}

	#canvas2 {
		position: absolute;
		left: 0;
		top: 0;
	}

	#hotdishes {
		border-radius: 8px;
		font-size: 40px;
		background-color: #CD010C;
		color: white;
		text-align: center;
		font-family: Avenir-Black;
		padding: 5px 10px;
		width: fit-content;


	}
	#hotdishes > span {
		white-space: nowrap;
	}

	.centeredBitch {
		margin-left: 50%;
		text-align: center;
		transform: translateX(-50%);
	}

	#maphelp {
		width: 100%;
	}


	.sideBySideCardContainer {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		
	}

	.sectionCard {
		margin-left: auto; /* this means the margins are the same, so it gets pushed to the middle */
		margin-right: auto;
		margin-bottom: 20px;
		padding: 32px 48px 32px; /* top, left&right, bottom */
		border-radius: var(--defaultBorderRadius);
		box-sizing: border-box;         /* Opera/IE 8+ */
	}

	.sectionCard.sideBySide {
		margin-left: 20px;
		margin-right: 20px;
	}


    /* Style the list */
ul.breadcrumb {
  padding: 10px 16px;
  list-style: none;
  background-color: #eee;
}

/* Display list items side by side */
ul.breadcrumb li {
  display: inline;
  font-size: 18px;
}

/* Add a slash symbol (/) before/behind each list item */
ul.breadcrumb li+li:before {
  padding: 8px;
  color: black;
  content: "/\00a0";
}

/* Add a color to all links inside the list */
ul.breadcrumb li a {
  color: #0275d8;
  text-decoration: none;
}

/* Add a color on mouse-over */
ul.breadcrumb li a:hover {
  color: #01447e;
  text-decoration: underline;
}
</style>