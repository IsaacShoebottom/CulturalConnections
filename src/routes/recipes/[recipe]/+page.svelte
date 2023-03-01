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
</script>

<div class="m-10 space-y-3">
	<div class="">
		<span class='text-3xl'>{data.data.title}</span> ~ <span>{data.data.price}</span> $
	</div>
	<div>
		<span>{stars}</span> ~ <span>{difficultyText}</span> ~ <span>{ingredientText}</span>
	</div>
	<div class="text-xl">{data.data.country}</div>
	<!-- Here is where tags go? Not sure how we are doing tags atm -->

	<div class="flex flex-wrap">
		<div class="mr-5">
			<!-- svelte-ignore a11y-missing-attribute -->
			<img class="rounded max-h-fit" src={data.data.photo} />
		</div>
		<div class="space-y-5">
			<div class="max-w-screen-sm">{data.data.culture}</div>
			<div class="max-w-screen-sm">{data.data.recipe}</div>
		</div>
		
	</div>
</div>