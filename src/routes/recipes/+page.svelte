<script>
	import RangeSlider from 'svelte-range-slider-pips'
    import Tags from 'svelte-tags-input'
    import { presetCards } from './components/imgData.js';
    import { Button } from 'flowbite-svelte';
	import Gallery from './components/Gallery.svelte';
    import '../../app.css';
    import { onMount } from 'svelte';
	import NavbarRad from '../NavbarRad.svelte';
    import {
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
        Sidebar,
        SidebarGroup,
        SidebarWrapper,
        Drawer,
        CloseButton,
    } from 'flowbite-svelte';
    import { sineIn } from 'svelte/easing';

    let star = "⭐";

    let cards = presetCards.slice();

    // page logic
    let unfilteredCards = presetCards.slice();
    let pageNumber = Math.ceil(cards.length / 15);
    let currentPage = 0;
    let pageArray = [];
    for (let i=0; i<pageNumber; i++) {
        pageArray.push(i+1);
    }

    let selectedCards
    if (cards.length <= 15) {
        selectedCards = cards.slice();
    }
    else {
        selectedCards = cards.slice().splice(0, 15);
    }

    function changePage(i) {
        currentPage = i;
        let firstIndex = i * 15;
        let lastIndex = firstIndex + 15;
        if (lastIndex >= cards.length) {
            selectedCards = cards.slice().splice(firstIndex, cards.length);
        }
        else {
            selectedCards = cards.slice().splice(firstIndex, lastIndex+1)
        }
    }
    
    let divClass = 'w-full md:block md:w-auto pr-8';
    let ulClass = 'flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium';

    let drawerHidden = false;
    let backdrop = false;
    const toggleDrawer = () => {
        drawerHidden = !drawerHidden;
    };

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
      backdrop = false;
      activateClickOutside = false;
    } else {
      drawerHidden = true;
      backdrop = true;
      activateClickOutside = true;
    }

    onMount(() => {
      if (width >= breakPoint) {
        drawerHidden = false;
        backdrop = false;
        activateClickOutside = false;
      } else {
        drawerHidden = true;
        backdrop = true;
        activateClickOutside = true;
      }
    });
    
    let tags = [];
    let searchTags = [];

    const tagList = [
        "vegan",
        "vegetarian",
        "keto",
        "healthy",
        "unhealthy",
        "meat",
        "kosher"
    ];

    function setTags() {
        searchTags = tags;

        // filter keywords
        if (searchTags == undefined || searchTags.length == 0) {
            cards = unfilteredCards.slice();
        }
        else {
            cards = [];
            unfilteredCards.forEach(c => {
                if (c.keyword.some(r=>searchTags.includes(r))) {
                    cards.push(c);
                }
            });
        }

        //filter rating
        if (searchRating != 0) {
            let tempCards = cards.slice();
            let cardsCopy = [];
            tempCards.forEach(c => {
                if (c.stars == searchRating) {
                    cardsCopy.push(c);
                }
            })
            cards = cardsCopy.slice();
        }

        //filter price
        if (searchPrice != 0) {
            let tempCards = cards.slice();
            let cardsCopy = [];
            tempCards.forEach(c => {
                if (c.price == searchPrice) {
                    cardsCopy.push(c);
                }
            })
            cards = cardsCopy.slice();
        }

        //filter difficulty
        if (searchDifficulty != 0) {
            let tempCards = cards.slice();
            let cardsCopy = [];
            tempCards.forEach(c => {
                if (c.difficulty == searchDifficulty) {
                    cardsCopy.push(c);
                }
            })
            cards = cardsCopy.slice();
        }

        if (cards.length <= 15) {
            selectedCards = cards.slice();
        }
        else {
            selectedCards = cards.slice().splice(0, 15);
        }

        pageNumber = Math.ceil(cards.length / 15);
        currentPage = 1;
        pageArray = [];
        for (let i=0; i<pageNumber; i++) {
            pageArray.push(i+1);
        }
    }

	let selected = 'Canada';
	let options = ["United States", "Canada", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and/or Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecudaor", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France, Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kosovo", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfork Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbarn and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States minor outlying islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Vietnam", "Virigan Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zaire", "Zambia", "Zimbabwe"]

	$: console.log('Changed selected:', selected)
	$: console.log('Updated options:', options)

    const items = [
        { text: 'Home', href: '/' },
        { text: 'Recipes', href: 'recipes' }
    ];

    const rangeArray = ['Low', 'Medium', 'High'];

    // Range Slider setters
    let searchRating = 0;
    function setSearchRating(e) {
        searchRating = e.detail.value;
    }

    let searchPrice = 0;
    function setSearchPrice(e) {
        if (e.detail.value == 1) {
            searchPrice = "low";
        }
        else if (e.detail.value == 2) {
            searchPrice = "medium";
        }
        else if (e.detail.value == 3) {
            searchPrice = "high";
        }
    }

    let searchDifficulty = 0;
    function setSearchDifficulty(e) {
        if (e.detail.value == 1) {
            searchDifficulty = "low";
        }
        else if (e.detail.value == 2) {
            searchDifficulty = "medium";
        }
        else if (e.detail.value == 3) {
            searchDifficulty = "high";
        }
    }
</script>

<NavbarRad></NavbarRad>
<div style="margin-top:110px;"></div>

<svelte:window bind:innerWidth={width} />
	<div style="width: 100%; margin-bottom: 100px;"></div>


	<NavHamburger style="margin-top: 0px; margin-left: 10px; float:left;" on:click={toggleDrawer} btnClass="ml-3 lg:hidden"/>

	
	<Drawer 
	leftOffset="top-18 h-screen left-0"
	transitionType= "fly"
	{backdrop}
	{transitionParams}
	bind:hidden={drawerHidden}
	bind:activateClickOutside
	width="w-100"
	class="overflow-scroll pb-32" id="sidebarrr">

  
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
            bind:tags={tags}
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
            <h5 class="topRangeLabels">Rating</h5>
            <RangeSlider on:stop={(e) => {setSearchRating(e)}} pips id="reverse-pips" first='label' last='label' suffix=" Stars" pipstep={1} step={1} min={1} max={5}/>
        </div>
        <div>
            <h5 class="rangeLabels">Price</h5>
            <RangeSlider on:stop={(e) => {setSearchPrice(e)}} pips id="reverse-pips" first='label' last='label' formatter={v => rangeArray[v-1]} pipstep={1} step={1} min={1} max={3}/>
        </div>
        <div>
            <h5 class="rangeLabels">Difficulty</h5>
            <RangeSlider on:stop={(e) => {setSearchDifficulty(e)}} pips id="reverse-pips" first='label' last='label' formatter={v => rangeArray[v-1]} pipstep={1} step={1} min={1} max={3}/>
        </div>
        <div class="apply">
            <Button color="red" on:click={() => setTags()}>apply filters</Button>
        </div>
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
  </Drawer>

  <div class="flex px-4 mx-auto w-full" style="background-color:aliceblue; padding: 40px; padding-top: 0;">
    <main class="lg:ml-72 w-full mx-auto">
        <Gallery>
            {#each selectedCards as {name, url, keyword, country, difficulty, stars, descr, href}}	
                {#if searchTags === undefined || searchTags.length == 0}
                    <a class="foodBox" href={href}>
                        <div class="show column">
                            <div class="content">
                                <img src={url} alt={name} style="width:100%">
                                <h4>{name}</h4>
                                <h3>{country}</h3>
                                <span class="stars">{star.repeat(stars)}</span>
                            </div>
                        </div>
                    </a>
                {:else}
                    <div class:show={keyword.some(r=>searchTags.includes(r))} class="column">
                        <a class="foodBox" href={href}>
                            <div class="content">
                                <img src={url} alt={name} style="width:100%">
                                <h4>{name}</h4>
                                <h3>{country}</h3>
                                <span class="stars">{star.repeat(stars)}</span>
                            </div>
                        </a>
                    </div>
                {/if}
            {/each}
        </Gallery>
        <div class="pageNumbers">
            {#each pageArray as num, i (num)}
                {#if i == currentPage}
                    <Button class="m-1" pill={true} gradient color="cyanToBlue" size="xs" on:click={() => changePage(i)}>
                        {num}
                    </Button>
                {:else}
                    <Button class="m-1" pill={true} color="red" size="xs" on:click={() => changePage(i)}>
                        {num}
                    </Button>
                {/if}
            {/each}
        </div>
      <slot />
    </main>
  </div>

<style global>

    #reverse-pips .rangePips {
    bottom: auto;
    top: -1em;
    }
    #reverse-pips .pip {
    background: rgb(190, 56, 56);
    top: auto;
    bottom: 0.25em;
    width: 2px;
    transform: translateX(-1px);
    transition-duration: 0.5s;
    opacity: 0.7;
    }
    #reverse-pips .pip:nth-child(5n+1) {
    height: 0.8em;
    opacity: 0.9;
    }
    #reverse-pips .pip:nth-child(5n),
    #reverse-pips .pip:nth-child(5n+2) {
    height: 0.65em;
    }
    #reverse-pips .pip.selected {
    background: rgb(255, 0, 157);
    transition-duration: 0.05s;
    opacity: 1;
    }

    main {
        font-size: 28px; /* Increased text to enable scrolling */
        padding: 0px 10px;
        max-width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    /* 	background-color: red; */
    }

    img {
        height: 100px;
        object-fit: cover;
    }

    .topRangeLabels {
        margin-top: 40px;
        font-size: 1.2rem;
    }

    .rangeLabels {
        margin-top: 80px;
        font-size: 1.2rem;
    }

    h4 {
        font-size: 1.5rem;
        margin: 0;
    }

    h3 {
        font-size: 0.75rem;
    }
        
    p {
        margin: 0 0 .5rem;
        position: relative;
    }

    .stars {
        font-size: 1rem;
        margin: 0;
        position: 'relative';
        top: -15px;
    }

    /* Create three equal columns */
    .column {
        width: auto;
        display: none;
        justify-content: center;
        margin: 20px 8px;
    }

	.foodBox {
		transition: ease 0.1s;
	}

	.foodBox:hover:not(:active) {
		transform: scale(1.07);
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
        box-shadow: 1px 1px 5px rgb(167, 167, 167);
    }

    /* The "show" class is added to the filtered elements */
    .show {
        display: flex;
    }

    .apply {
        padding-top: 40px;
    }

    .pageNumbers {
        margin: 0 auto;
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