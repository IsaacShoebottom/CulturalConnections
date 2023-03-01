<script lang="js">
	/** @type {import('./$types').PageData} */
	export let data;

	let star = "⭐";
	let stars = star.repeat(data.data.stars);

	let difficultyMap = new Map();
	difficultyMap.set("easy", "Easy difficulty");
	difficultyMap.set("medium", "Medium difficulty");
	difficultyMap.set("hard", "Hard difficulty");
	let difficultyText =
		difficultyMap.get(data.data.difficulty) || "No difficulty set";

	let ingredientText;
	if (data.data.ingredients.length === 0) {
		ingredientText = "No ingredients";
	} else if (data.data.ingredients.length === 1) {
		ingredientText = "1 ingredient";
	} else {
		ingredientText = `${data.data.ingredients.length} ingredients`;
	}

	let contentStyle = ""
	
	let innerWidth
	let innerHeight
	$: aspectRatio = innerWidth / innerHeight

	if (aspectRatio > 1) {
		contentStyle = "flex flex-wrap-reverse"
	} else {
		contentStyle = "flex flex-wrap flex-col"
	}

	//const image = new Image();
	//image.src = data.data.photo;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="m-5 space-y-3">
	<div class="">
		<span id="title">{data.data.title}</span> ~ <span>{data.data.price}</span> $
	</div>
	<div>
		<span>{stars}</span> ~ <span>{difficultyText}</span> ~ <span>{ingredientText}</span>
	</div>
	<div id="country">{data.data.country}</div>
	<!-- Here is where tags go? Not sure how we are doing tags atm -->

	<div class={contentStyle}>
		<div>
			<!-- svelte-ignore a11y-missing-attribute -->
			<img class="rounded" src={data.data.photo} />
		</div>
		
		<div>
			<div>{data.data.culture}</div>
			<div>{data.data.recipe}</div>
		</div>
	</div>
</div>

<style>
	#title {
		font-size: 2rem;
	}
	#country {
		font-size: 1.5rem;
	}
</style>
