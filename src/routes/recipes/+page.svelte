<script>
	import RangeSlider from 'svelte-range-slider-pips'
    import Tags from 'svelte-tags-input'
    import { images } from './components/imgData.js';
	import { categories } from './components/imgData.js'; /* Used for tagging */
	import Gallery from './components/Gallery.svelte';
    import '../../app.css';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import {
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
        Sidebar,
        SidebarGroup,
        SidebarItem,
        SidebarWrapper,
        Drawer,
        CloseButton,
        SidebarDropdownWrapper
    } from 'flowbite-svelte';
    import { Cog } from 'svelte-heros-v2';
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
</script>

<ul class="breadcrumb">
    <li><a href="/">Home</a></li>
    <li>Recipes</li>
</ul>

<svelte:window bind:innerWidth={width} />

<Navbar let:hidden let:toggle>
    <NavHamburger on:click={toggleDrawer} btnClass="ml-3 lg:hidden" />
    <NavBrand href="/" class="lg:ml-64">
      <span class= "self-center whitespace-nowrap text-xl font-semibold dark:text-white pl-4">
        Cultural Connections
      </span>
    </NavBrand>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden} {divClass} {ulClass}>
      <NavLi href="/">Home</NavLi>
      <NavLi href="recipes">Recipes</NavLi>
      <NavLi href="recipes/add">Create Recipe</NavLi>
      <NavLi href="/">My Recipes</NavLi>
    </NavUl>
  </Navbar>

  <Drawer
    transitionType= "fly"
    {backdrop}
    {transitionParams}
    bind:hidden={drawerHidden}
    bind:activateClickOutside
    width="w-100"
    class="overflow-scroll pb-32"
    id= "sidebar"
  >
  <div class=" flex items-center">
    <CloseButton on:click={() => (drawerHidden = true)} class="mb-4 dark:text-white lg:hidden" />
  </div>
  <Sidebar asideClass="w-54">
    <SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
      <SidebarGroup>
        <select bind:value={selected} style="max-width: 150px;">
            {#each options as value}<option {value}>{value}</option>{/each}
        </select>
        <div>
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
        <div>
            <h5 style="margin-top: 30px;">Rating</h5>
            <RangeSlider values={[3]} step={1}/>
        </div>
        <div>
            <h5 style="margin-top: 30px;">Price</h5>
            <RangeSlider values={[3]} step={1}/>
        </div>
        <div>
            <h5 style="margin-top: 30px;">Difficulty</h5>
            <RangeSlider values={[3]} step={1}/>
        </div>
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
  </Drawer>

  <div class="flex px-4 mx-auto w-full">
    <main class="lg:ml-72 w-full mx-auto">
      <slot />
    </main>
  </div>

<main>
    <Gallery>
		{#each images as {name, url, keyword, descr}}	
			{#if selectedTemp === "all"}
				<div class="show column">
					<div class="content">
						<img src={url} alt={name} style="width:100%">
						<h4>{name}</h4>
						<p>{descr}</p>
					</div>
				</div>
			{:else}
				<div class:show={selectedTemp === keyword} class="column">
					<div class="content">
						<img src={url} alt={name} style="width:100%">
						<h4>{name}</h4>
						<p>{descr}</p>
					</div>
				</div>
			{/if}
		{/each}
	</Gallery>
</main>  

<style global>
    main {
        margin-left: 260px; /* Same width as the sidebar + left position in px */
        font-size: 28px; /* Increased text to enable scrolling */
        padding: 0px 10px;
        max-width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    /* 	background-color: red; */
    }

    h4 {
        font-size: 2rem;
        margin: 0;
    }
        
    p {
        margin: 0 0 .5rem;
        position: relative;
    }

    /* Create three equal columns */
    .column {
        width: var(--columnSize);
        display: none;
        justify-content: center;
        margin: 20px 8px;
    }


    /* Content */
    .content {
        padding: 20px;
        width:250px;
        max-width:250px;
        min-width:250px;
        display: inline-block;
        background-color: white;
        margin: 5px;
        padding: 10px;
        width: 30vw;
        box-shadow: 1px 1px 5px black;
    }
        
        img {
            min-height: 200px;
        }

    /* The "show" class is added to the filtered elements */
    .show {
        display: flex;
    }

    .breadcrumbs {
        padding: 20px;
    }

    .sidenav {
        width: 250px;
        height: 400px;
        position: fixed;
        z-index: 1;
        top: 60px;
        left: 10px;
        background: #eee;
        overflow-x: hidden;
        padding: 10px;
    }

    .main {
        margin-left: 260px; /* Same width as the sidebar + left position in px */
        font-size: 28px; /* Increased text to enable scrolling */
        padding: 0px 10px;
    }

    @media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
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