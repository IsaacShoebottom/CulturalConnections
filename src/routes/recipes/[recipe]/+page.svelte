<script lang="js">
	/** @type {import('./$types').PageData} */
	export let data;

	import "../../styles.css" // Import the font

	let star = "⭐";
	let stars = star.repeat(data.data.stars);

	let difficultyMap = new Map();
	difficultyMap.set("easy", "Easy difficulty");
	difficultyMap.set("medium", "Medium difficulty");
	difficultyMap.set("hard", "Hard difficulty");
	let difficultyText =
		difficultyMap.get(data.data.difficulty) || "No difficulty set";

	let ingredients = data.data.ingredients;

	console.log(ingredients);

	let ingredientsLength = Object.keys(ingredients).length;
	let ingredientText;
	if (ingredientsLength === 0) {
		ingredientText = "No ingredients";
	} else if (ingredientsLength === 1) {
		ingredientText = "1 ingredient";
	} else {
		ingredientText = `${ingredientsLength} ingredients`;
	}

	let ingredientsArray = Object.entries(ingredients);

	let recipeArray = data.data.recipe.split(".");
	recipeArray.pop(); // Remove the last empty element
</script>

<div class="m-10 space-y-3 overflow-auto">
	<div class="flex place-items-center flex-col text-left">
		<div>
			<span class="text-3xl">{data.data.title}</span> ~
			<span>{data.data.price}</span> $
		</div>
		<div>
			<span>{stars}</span> ~ <span>{difficultyText}</span> ~
			<span>{ingredientText}</span>
		</div>
		<div class="text-xl">{data.data.country}</div>
		<!-- Here is where tags go? Not sure how we are doing tags atm -->
	</div>

	<div class="flex flex-wrap justify-center place-items-center">
		<div class="max-w-screen-sm w-full">
			<div class="mr-5 mb-5">
				<!-- svelte-ignore a11y-missing-attribute -->
				<img class="rounded-xl max-w-screen-sm max-h-xl w-full" src={data.data.photo} />
			</div>
			<div class="max-w-screen-sm w-full mb-5">
				{#each ingredientsArray as ingredient}
					<div>• {ingredient[0]}: {ingredient[1]}</div>
				{/each}
			</div>
		</div>
		
		<div class="space-y-5">
			<div class="max-w-screen-sm">{data.data.culture}</div>
			
			<div class="max-w-screen-sm">
				{#each recipeArray as step, index}
					<div class="mb-1">{index + 1}. {step}</div>
				{/each}
			</div>
		</div>
	</div>
</div>
