<script>
    import RangeSlider from 'svelte-range-slider-pips'
    import Tags from 'svelte-tags-input'
    import '../../../app.css';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import {
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
        Button,
        Sidebar,
        SidebarGroup,
        SidebarItem,
        SidebarWrapper,
        Drawer,
        CloseButton,
        SidebarDropdownWrapper
    } from 'flowbite-svelte';
    import { Camera } from 'svelte-heros-v2';
    import { sineIn } from 'svelte/easing';
    
    let divClass = 'w-full md:block md:w-auto pr-8';
    let ulClass = 'flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium';

    let drawerHidden = false;
    const toggleDrawer = () => {
        drawerHidden = !drawerHidden;
    };

    let backdrop = false;
    let activateClickOutside = true;
    let breakPoint = 1024;
    let width;
    let transitionParams = {
      x: -320,
      duration: 200,
      easing: sineIn
    };
    $: if (width >= breakPoint) {
      drawerHidden = false;
      activateClickOutside = false;
    } else {
      drawerHidden = true;
      activateClickOutside = true;
    }
    onMount(() => {
      if (width >= breakPoint) {
        drawerHidden = false;
        activateClickOutside = false;
      } else {
        drawerHidden = true;
        activateClickOutside = true;
      }
    });

    const toggleSide = () => {
    if (width < breakPoint) {
        drawerHidden = !drawerHidden;
    }
    };
    $: activeUrl = $page.url.pathname;
    let spanClass = 'pl-2 self-center text-md text-gray-900 whitespace-nowrap dark:text-white';

    let tag = "";

    function handleTags(event) {
        tag = event.detail.tags;
    }

    const tagList = [
        "Vegan",
        "Vegetarian",
        "Kito",
        "Healthy"
    ];

    let selectedTemp = 'all';
	let selected = 'Canada';
	let options = ["United States", "Canada", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and/or Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecudaor", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France, Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kosovo", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfork Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbarn and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States minor outlying islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Vietnam", "Virigan Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zaire", "Zambia", "Zimbabwe"]

	$: console.log('Changed selected:', selected)
	$: console.log('Updated options:', options)

    let columnSize = "33.3%";

    const items = [
        { text: 'Home', href: '/' },
        { text: 'Recipes', href: 'recipes' }
    ];

    $: ingredients = [];

    function addIngredient(){
        ingredients.push({Name:"Salt",Amount:"1tps"});
        ingredients = ingredients;
    }

    function removeIngredient(index){
        ingredients.splice(index,1);
        ingredients = ingredients;
    }

    $: instructions = [];

    function addInstruction(){
        instructions.push({Step:"Mix"});
        instructions = instructions;
    }

    function removeInstruction(index){
        instructions.splice(index,1);
        instructions = instructions;
    }

    let avatar, fileinput;
    const onFileSelected =(e)=>{
    let image = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                 avatar = e.target.result
        };
    }
</script>

<svelte:window bind:innerWidth={width} />

<Navbar let:hidden let:toggle>
    <NavBrand href="/" class="lg:ml-64">
        <span class= "self-center whitespace-nowrap text-xl font-semibold dark:text-white pl-4">
        Cultural Connections
        </span>
    </NavBrand>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden} {divClass} {ulClass}>
        <NavLi href="/">Home</NavLi>
        <NavLi href="../recipes">Recipes</NavLi>
        <NavLi href="recipes/add">Create Recipe</NavLi>
        <NavLi href="/">My Recipes</NavLi>
    </NavUl>
</Navbar>

<main class="mt-10" style="background-color:aliceblue; padding: 50px;">
    <div>
        <div id="app">
            {#if avatar}
            <img class="avatar" src="{avatar}" alt="d" />
            {:else}
            <img class="avatar" src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" alt="" /> 
            {/if}
            <Button gradient color="purpleToPink" on:click={()=>{fileinput.click();}} class="!p-2"><Camera/>Upload Image</Button>
            <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
        </div>
        <div class = "flex items-center grid grid-rows-2 mr-10 ml-10">
            <h5>Recipe Name:</h5>
            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Recipe Title" required>
            <h5 class="mt-10">Recipe Description:</h5>
            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
        </div>
        <div class="flex items-center grid grid-rows-3 mr-10 ml-10 mt-10">
            <h5>Country of origin:</h5>
            <select bind:value={selected} style="max-width: 150px;">
                {#each options as value}<option {value}>{value}</option>{/each}
            </select>
        </div>
        <div class = "flex items-center grid grid-rows-2 mr-10 ml-10">
            <h5>Tags:</h5>
            <Tags
            on:tags={handleTags}
            addKeys={[9]}
            maxTags={5}
            allowPaste={true}
            allowDrop={true}
            splitWith={"/"}
            onlyUnique={false}
            removeKeys={[27]}
            placeholder={"'vegan', 'vegetarian', etc"}
            autoComplete={tagList}
            name={"custom-name"}
            id={"custom-id"}
            allowBlur={true}
            disable={false}
            minChars={3}
            onlyAutocomplete
            />
        </div>
        <div id="app" class="mt-10">
            <h1 class="mb-5">Ingredients:</h1>
            {#each ingredients as ingredient, i (ingredient)}
            <div class = "flex items-center mb-5">
                <h5 class="mr-2">Name:</h5>
                <input placeholder='Ingredient Name' type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <h5 class="mr-2 ml-5">Amount:</h5>
                <input placeholder='Ingredient Amount' type="text" id="small-input" class="mr-5 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <Button pill={true} color="red" size="xs" on:click={() => removeIngredient(i)}> Remove </Button>
            </div>
            {/each}
            <Button on:click={addIngredient}>Add Ingredient</Button>
        </div>
        <div id="app" class="mt-10">
            <h1 class="mb-5">Instructions:</h1>
            {#each instructions as instruction, i (instruction)}
            <div class = "flex items-center mb-5">
                <div style="min-width: 60px">Step {i+1}:</div>
                <input placeholder='Instruction text' type="text" id="small-input" class="mr-5 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <Button pill={true} color="red" size="xs" on:click={() => removeInstruction(i)}> Remove </Button>
            </div>
            {/each}
            <Button on:click={addInstruction}>Add Instruction</Button>
        </div>
    </div>
</main>

<div  class = "flex items-center justify-center m-10">
    <Button color="red" class="mr-10" on:click={()=>window.history.back()}>Cancel</Button>
    <Button href="/" gradient color="cyanToBlue" class="submit">Submit</Button>
</div>

<style global>
    #app{
	    display:flex;
		align-items:center;
		justify-content:center;
		flex-flow:column;
    }
    div {
        overflow: hidden;
    }
    .upload{
		display:flex;
	    height:50px;
		width:50px;
		cursor:pointer;
	}
    .avatar{
		height:200px;
		width:200px;
        margin-bottom: 5px;
	}

</style>