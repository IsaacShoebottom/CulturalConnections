<script lang="js">
	

	import NavbarRad from "../../NavbarRad.svelte"
	import "../../styles.css" // Import the font

	let ingredients = JSON.parse(localStorage.getItem("recipeIngredients"));
	let recipeArray = JSON.parse(localStorage.getItem("recipeInstructions"));

	let title = localStorage.getItem("recipeTitle");
	let country = localStorage.getItem("recipeCountry");
	let description = localStorage.getItem("recipeDescription");
	let photo = localStorage.getItem("recipePhoto");

	if (!ingredients || !recipeArray || !title || !country || !description || !photo) {
		window.location.href = "/recipes/add";
	}

	console.log(ingredients);
	console.log(recipeArray)

	let ingredientsLength = Object.keys(ingredients).length;
	let ingredientText;
	if (ingredientsLength === 0) {
		ingredientText = "No ingredients";
	} else if (ingredientsLength === 1) {
		ingredientText = "1 ingredient";
	} else {
		ingredientText = `${ingredientsLength} ingredients`;
	}
</script>

<NavbarRad></NavbarRad>
<div style="margin-top: 110px;"></div>

<div class="m-10 space-y-3 overflow-auto text-left">
	<div class="flex place-items-center flex-col text-left">
		<div>
			<span class="text-3xl">{title}</span>
		</div>
		<div>
			<span>{ingredientText}</span>
		</div>
		<div class="text-xl">{country}</div>
		<!-- Here is where tags go? Not sure how we are doing tags atm -->
	</div>

	<div class="flex flex-wrap justify-center ">
		<div class="max-w-screen-sm w-full">
			<div class="mr-5 mb-5">
				<!-- svelte-ignore a11y-missing-attribute -->
				<img class="rounded-xl max-w-screen-sm max-h-xl w-full" src={photo} />
			</div>
			<div class="max-w-screen-sm w-full mb-5">
				{#each ingredients as ingredient}
					<div>• {ingredient.Name}: {ingredient.Amount}</div>
				{/each}
			</div>
		</div>
		
		<div class="space-y-5">
			<div class="max-w-screen-sm">{description}</div>
			
			<div class="max-w-screen-sm">
				{#each recipeArray as step, index}
					<div class="mb-1">{index + 1}. {step.Step}</div>
				{/each}
			</div>
		</div>
	</div>
</div>

