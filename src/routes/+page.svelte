<ul class="breadcrumb">
    <li>Home</li>
</ul>

<h1 style="font-family: Avenir-Book" class="centeredBitch">Discover tradition cuisines from all over the world</h1>


<div><a href="recipes">Recipes</a> </div>
<img bind:this={worldmapElement} src="frontpage/worldmap.svg" style="display:none;">
<div class="sideBySideCardContainer">
	<div class="sectionCard sideBySide" id="mapContainer" bind:this={mapContainer} style="max-width: 600px; height: auto;">
		<canvas id="canvas" bind:this={canvasElement} width="100%" height="100%"></canvas>
		<h1 style="font-family: Avenir-Black; width: 100%; margin-top: 15px;" class="centeredBitch">Select a location to find regional dishes <b style="font-size: 30px">&#x2934;</b></h1>
	</div>
	<div class="sectionCard sideBySide" style="max-width: 300px;">
		<div id="hotdishes" class="centeredBitch"><span>HOT DISHES</span></div>
	</div>
</div>


<script lang="ts">
    import './fonts.css';
	import { onMount } from "svelte";
    let canvasElement: HTMLCanvasElement
	let worldmapElement: HTMLImageElement
	let innerWidth = 0
    let innerHeight = 0
    let mapContainer: HTMLDivElement
	let ctx;
	let drewRecently = false;
	
    onMount(async () => {
		
		while (!worldmapElement.complete || worldmapElement.naturalHeight === 0) {await sleep(100)};
		canvasElement.addEventListener('click', (e) => {
			console.log(e);
		});
		const worldMapAspectRatio = worldmapElement.naturalHeight / worldmapElement.naturalWidth;
		
		
		// get canvas context
		ctx = canvasElement.getContext("2d")
	
		new ResizeObserver(draw).observe(mapContainer);
		
		async function draw() {
			console.log('drwain')
			if (drewRecently) return;
			console.log('yes\n----')
			drewRecently = true;
			// draw line
			canvasElement.width = Number(mapContainer.clientWidth);
			canvasElement.height = Number(mapContainer.clientWidth * worldMapAspectRatio);
			
			ctx.drawImage(worldmapElement, 0, 0, canvasElement.width, canvasElement.height);
			let maxDots = 100;
			for (let i = 0; i < maxDots; i++) {
				const x = generateRandom(0,canvasElement.width);
				const y = generateRandom(0,canvasElement.height);
				var data = ctx.getImageData(x, y, 1, 1).data;
				//var rgb = [ data[0], data[1], data[2] ];
				if ((data[0] === 0 && data[1] === 0 && data[2] === 0)) {
					maxDots++;
					continue;
				}
				//console.log(rgb);
				ctx.fillStyle = 'red';
				ctx.beginPath();
				ctx.arc(x,y, 1.5, 0, 2*Math.PI); // fill in the pixel at (10,10)
				ctx.fill();
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

<svelte:window bind:innerWidth bind:innerHeight />


<style>
	#mapContainer {
		max-height: 500px;
		padding: 0;
	}

	#canvas {
		/* background: url('frontpage/worldmap.svg');
		background-size: 100%;
		background-repeat: no-repeat; */
		margin: 20px;
	
	}
	#hotdishes {
		border-radius: 8px;
		font-size: 30px;
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

	#worldmap {
		filter: contrast(50%);
	}

	.sideBySideCardContainer {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		
	}

	.sectionCard {
		width: 100%;
		max-width: 2000px;
		margin-left: auto; /* this means the margins are the same, so it gets pushed to the middle */
		margin-right: auto;
		margin-bottom: 20px;
		padding: 32px 48px 32px; /* top, left&right, bottom */
		border: 2px solid red;
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